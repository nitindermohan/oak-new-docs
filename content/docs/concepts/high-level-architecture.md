---
title: "High-Level Architecture"
summary: ""
draft: false
weight: 201
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

{{< callout context="tip" title="Did you know?" icon="outline/rocket" >}}
Oakestra is composed of *three* key building blocks:
* The [Root Orchestrator](#root-orchestrator): the master orchestrator of the infrastructure. 
* The [Cluster Orchestrator](#cluster-orchestrator): a local orchestrator directly managing the workers. 
* The [Worker Node](#worker-node) machine that executes application microservices.
{{< /callout >}}

## Root Orchestrator

The root orchestrator is the centralized control plane that coordinates the participating clusters.

{{< svg "orchestration/arch-root" >}}

The image above illustrates the components of the root orchestrator. Each component operates as an independent service, integrated and managed using the Docker Compose plugin.

* The **System Manager** serves as the primary interface for users to access the system as an application deployment platform. It provides two sets of APIs:
  1. To receive deployment commands from users via [CLI](../../getting-started/deploy-app/with-the-cli/), [Dashboard](../../getting-started/deploy-app/with-the-dashboard/), or directly via [REST API](../../getting-started/deploy-app/with-the-api/).
  2. To handle child Oakestra Clusters.
   
* The **Scheduler** determines the most suitable cluster for deploying a given application.

* **Mongo** acts as the interface for database access. The root manager stores aggregated information about its child clusters. Oakestra categorizes this data into:
  1. *Static metadata*—such as IP addresses, port numbers, cluster names, and locations.
  2. *Dynamic data*—such as the number of worker nodes per cluster, total CPU cores and memory, disk space, GPU capabilities, etc.

* The **Resource Abstractor** standardizes resource management by abstracting generic resources into a unified interface. Whether managing clusters or workers, this abstraction ensures interoperability of scheduling algorithms between root and child clusters. Additionally, it provides an interface for managing the service lifecycle.

* **Grafana** offers a dashboard with global system alerts, logs, and performance statistics.

* The **Root Network Component** manages Semantic IP and Instance IP addresses for each service and the cluster's subnetworks. Refer to the Networking [concepts](../networking) and [manuals](../../manuals/networking-internals/semantic-addressing/) for more details.


## Cluster Orchestrator

{{< svg "orchestration/arch-cluster" >}}

The cluster orchestrator functions as a logical twin of the root orchestrator but differs in the following ways:

* **Worker Management:** Unlike the root orchestrator, the cluster orchestrator manages worker nodes instead of clusters.

* **Resource Aggregation:** The cluster orchestrator aggregates resources from its worker nodes and abstracts the cluster's internal composition from the root orchestrator. At the root level, a cluster appears as a generic resource with a total capacity equal to the sum of its worker node resources.

* **Intra-Cluster Communication:** MQTT is used as the communication protocol for the intra-cluster control plane.


## Worker Node

The **worker node** is the component responsible for executing workloads requested by developers. 

A worker node is any Linux machine running two essential services:

* **NodeEngine**: Manages the deployment of applications based on the installed runtimes.  
* **NetManager**: Provides the networking components required for seamless inter-application communication.

{{< svg "orchestration/arch-node-engine" >}}

{{< details "The **Node Engine** is a single binary implemented using `Go`. *Click to learn about its modules*." >}}
* **MQTT:** Acts as the communication interface between the worker and the cluster. It handles deployment commands, node status updates, and job updates by transmitting and receiving data.

* **Models:** Define the structure of nodes and jobs:
  * **Node:** Represents the resources reported to the cluster. These are divided into:
    * *Static resources*—transmitted only during startup (e.g., hardware configuration).
    * *Dynamic resources*—periodically updated (e.g., CPU and memory usage).
  * **Service:** Represents the services managed by the worker node, including real-time service usage statistics.

* **Jobs:** Background processes that monitor the health and status of the worker node and its deployed applications.

* **Runtimes:** Supported system runtimes for workload execution. Currently, containers and unikernels are supported.

* **Net API:** A local socket interface used for communication with the Net Manager.
{{< /details >}}

<!-- The **Node Engine** is a single binary implemented using Go and is composed of the following modules:
* **MQTT:** The interface between the worker and the cluster. Deployment commands, node status
updates, and job updates are pushed and received with this component.
* **Models:** Models that describe the nodes and jobs  
    * Node: Describes the resources that are transmitted to the cluster. These are decomposed into static resources, which are only transmitted at startup, and dynamic resources, which are periodically updated, e.g. CPU/memory
    * Service: Describes the services that are managed by this worker node, as well as the real-time
 service usage statistics
* **Jobs:** Background jobs that monitor the status of the worker node and the deployed applications
* **Runtimes:** The supported system runtimes. Currently, containers and Unikernels are supported
* **Net API:** local socket used to interact with the Net Manager. -->

{{< details "The **Net Manager** is responsible for managing service-to-service communication within and across nodes. It handles tasks such as fetching balancing policies for each service, setting up virtual network interfaces, balancing traffic, and tunneling packets across nodes. *Click to learn about its modules*." >}}

* **Environment Manager:** Handles the installation of virtual network interfaces, network namespaces, and iptables rules.

* **Proxy:** Manages traffic balancing and packet tunneling across nodes.

* **Translation Table:** Maintains the mapping of Service IPs to Instance IPs and their associated balancing policies for each service. For more details, refer to the [networking concepts](../networking) documentation.

* **Proxy Table:** Serves as a cache for active proxy translations.

* **MQTT Component:** Acts as the interface between the Net Manager and the Cluster Network Component. It resolves Service IP translation requests and retrieves the node's subnetwork during startup.

{{< /details >}}

<!--The **Net Manager** component manages the service-to-service communication within and across nodes. It fetches the balancing policies for each service, installs the virtual network interfaces, ensures traffic balancing and tunnels the packets across nodes. The Net Manager is composed of the following modules:

* **Environment Manager:** Responsible for the installation of virtual network interfaces, network namespaces, and iptables.
* **Proxy:** The component that manages the traffic balancing and the tunneling of packets across nodes.
* **Translation table:** Table of the Service IP <-> Instance IPs+Balancing Polocy translation for each service. More details in the [networking concepts](../networking) docs.
* **Proxy Table:** Cache for the active proxy translations.
* **MQTT component:** The interface between the Net Manager and the Cluster Network Component. It is used to resolve Service IP translation requests and ask for the node's subnetwork at startup. -->

## Resilience and Failure Recovery

### Root Orchestrator Failure
A centralized control plane introduces a single point of failure. Oakestra mitigates this risk by enabling clusters to autonomously satisfy SLAs for deployed applications. Consequently, a Root Orchestrator failure impacts only the following:

- **Deployment of new applications:** System Manager APIs become unavailable, making it impossible to deploy new workloads.
- **Inter-cluster root discovery:** Pre-existing P2P communication between worker nodes remains unaffected, but new inter-cluster routes cannot be established.
- **Onboarding new clusters:** New clusters cannot join the infrastructure.

{{< callout context="note" icon="outline/info-circle">}}
A potential solution involves implementing leader election among cluster orchestrators to designate a new root, though this feature is not yet available in the current release.
{{< /callout >}}

<!-- The key drawback of a centralized control plane is that it represents a single point of failure. Oakestra mitigates this by ensuring that the clusters are able to satisfy the SLAs for deployed applications autonomously. Therefore, by design, a Root Orchestrator failure only affects the following orchestration aspects:
- Deployment of new applications. The system manager APIs are not available, and therefore, deploying new workloads is not possible.
- Inter-cluster root discovery. Pre-existing P2P worker node communication is not affected. However, new inter-cluster routes cannot be discovered. 
- New clusters cannot join the infrastructure. 

Solutions based on leader election for a new root among cluster orchestrators are a possible solution. However, this feature has not yet been implemented in the current release. -->

### Cluster Orchestrator Failure
<!-- The failure of a cluster orchestrator by design must not affect **(i)** other clusters **(ii)** running workloads on the workers. With the current design, a failure of the cluster orchestrator has the following consequences: 
- The cluster is not able to receive new workloads.
- The cluster is not able to connect new workers.
- The cluster is not able to reschedule failed workloads. 
- Inter-cluster network route discovery is not possible. Only pre-existing connections are maintained. -->

By design, a cluster orchestrator failure does not impact *(i)* other clusters or *(ii)* workloads already running on worker nodes. However, the following limitations arise:

- The cluster cannot accept new workloads.
- The cluster cannot onboard new worker nodes.
- The cluster cannot reschedule failed workloads.
- Inter-cluster route discovery is disabled, though pre-existing connections are preserved.

{{< callout context="note" icon="outline/info-circle">}}
Cluster and Root Orchestrator failures can be mitigated by deploying a high-availability setup for the control plane's microservices.
{{< /callout >}}

### Worker Node Failure
<!-- A worker node failure is common and expected at the edge. The cluster will re-deploy the workload affected by the worker failure. Worker failures are detected via a heartbeat mechanism. If a worker stops responding for more than 5 seconds, the cluster will scale up and re-deploy the workload on another worker. The worker node failure time threshold is a [parameter](https://github.com/oakestra/oakestra/blob/c0f3250ebdf8fbff5d35c1662e59cb1f4a8e899a/cluster_orchestrator/cluster-manager/cluster_manager.py#L52) of the cluster manager. -->


Worker node failures are common and expected in edge environments. The cluster handles such failures as follows:

- Workloads affected by the failure are automatically re-deployed on other worker nodes.
- Failures are detected using a heartbeat mechanism. If a worker node is unresponsive for more than **5 seconds**, the cluster scales up and reallocates the workload.

{{< callout context="note" icon="outline/info-circle">}}
The failure detection threshold is configurable and can be adjusted in the [cluster manager settings](https://github.com/oakestra/oakestra/blob/c0f3250ebdf8fbff5d35c1662e59cb1f4a8e899a/cluster_orchestrator/cluster-manager/cluster_manager.py#L52).
{{< /callout >}}
