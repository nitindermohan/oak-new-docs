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
Oakestra is composed of 3 key building blocks:
* The [Root Orchestrator](#root-orchestrator): an orchestrator for clusters. 
* The [Cluster Orchestrator](#cluster-orchestrator): an orchestrator for workers. 
* The [Worker Node](#worker-node) composed of **NodeEngine**, and **Net Manager**, manages the workloads.
{{< /callout >}}

## Root Orchestrator

The root orchestrator is the centralized control plane that coordinates the participating clusters.

{{< svg "orchestration/arch-root" >}}

The above image describes the components of the root orchestrator. Each component is deployed as a separate service
and docker compose plugin is used to integrate and run them.

* The **System Manager** is the interface by which users access the system as an application deployment platform.
It exposes 2 sets of APIs:
 1. To receive deployment commands from users via [CLI](../../getting-started/deploy-app/with-the-cli/), [Dashboard](../../getting-started/deploy-app/with-the-dashboard/) or directly via [ REST API](../../getting-started/deploy-app/with-the-api/).
 2. To handle child Oakestra Clusters
* The **Scheduler** calculates a suitable cluster for a given application
* **Mongo** is the interface used to access the database. The root manager stores aggregated information on its
child clusters. Oakestra differentiates between
 1. *Static metadata* such as the IP address, port number, name, and location of each cluster
 2. *Dynamic data* such as worker nodes per cluster, total CPU cores and memory, total disk space, GPU capabilities, etc...
* The **Resource Abstractor**, as the name suggests, abstracts generic resources to a common interface. Weather we're managing a cluster or a worker, these resources are standardized in a common interface, making scheduling algorithms interoperable between root and clusters. This component also exposes an interface that interacts with the service lifecycle.
* **Grafana** exposes a dashboard with global system alerts, logs, and statistics.
<!--* TODO: Add link to hooks-->
* The **Root Network Component** manages the Semantic IP and Instance IP addresses of each service as well as the cluster's subnetworks. Check the Networking [concepts](../networking) and [manuals](../../manuals/networking-internals/semantic-addressing/) for further details. 


## Cluster Orchestrator

{{< svg "orchestration/arch-cluster" >}}

The cluster orchestrator is a logical twin of the root but with the following distinctions:
* The cluster orchestrator manages workers and not clusters. 
* A cluster orchestrator aggregates the worker node resources and obscures the cluster composition to the root. At the root level, a cluster is seen as a generic resource with a maximum capacity equal to the total of its resources.
* MQTT is used for intra-cluster control-plane communication. 

## Worker Node

The worker node is the component responsible for running the workloads requested by the developers. A worker node is any Linux machine running the NodeEngine and the NetManager. The former enables the
deployment of applications according to the runtimes installed. The latter provides networking
components to enable inter-application communication.

{{< svg "orchestration/arch-node-engine" >}}

The **Node Engine** is a single binary implemented using Go and is composed of the following modules:
* **MQTT:** The interface between the worker and the cluster. Deployment commands, node status
updates, and job updates are pushed and received with this component.
* **Models:** Models that describe the nodes and jobs  
    * Node: Describes the resources that are transmitted to the cluster. These are decomposed into static resources, which are only transmitted at startup, and dynamic resources, which are periodically updated, e.g. CPU/memory
    * Service: Describes the services that are managed by this worker node, as well as the real-time
 service usage statistics
* **Jobs:** Background jobs that monitor the status of the worker node and the deployed applications
* **Runtimes:** The supported system runtimes. Currently, containers and Unikernels are supported
* **Net API:** local socket used to interact with the Net Manager.

The **Net Manager** component manages the service-to-service communication within and across nodes. It fetches the balancing policies for each service, installs the virtual network interfaces, ensures traffic balancing and tunnels the packets across nodes. The Net Manager is composed of the following modules:

* **Environment Manager:** Responsible for the installation of virtual network interfaces, network namespaces, and iptables.
* **Proxy:** The component that manages the traffic balancing and the tunneling of packets across nodes.
* **Translation table:** Table of the Service IP <--> Instance IPs+Balancing Polocy translation for each service. More details in the [networking concepts](../networking) docs. <!-- add link -->
* **Proxy Table:** Cache for the active proxy translations.
* **MQTT component:** The interface between the Net Manager and the Cluster Network Component. It is used to resolve Service IP translation requests and ask for the node's subnetwork at startup.

## Considerations on Failure and scalability

### Root Orchestrator Failure
The key drawback of a centralized control plane is that it represents a single point of failure. Oakestra mitigates this by ensuring that the clusters are able to satisfy the SLAs for deployed applications autonomously. Therefore, by design, a Root Orchestrator failure only affects the following orchestration aspects:
- Deployment of new applications. The system manager APIs are not available, and therefore, deploying new workloads is not possible.
- Inter-cluster root discovery. Pre-existing P2P worker node communication is not affected. However, new inter-cluster routes cannot be discovered. 
- New clusters cannot join the infrastructure. 

Solutions based on leader election for a new root among cluster orchestrators are a possible solution. However, this feature has not yet been implemented in the current release.

### Cluster Orchestrator Failure
The failure of a cluster orchestrator by design must not affect **(i)** other clusters **(ii)** running workloads on the workers. With the current design, a failure of the cluster orchestrator has the following consequences: 
- The cluster is not able to receive new workloads.
- The cluster is not able to connect new workers.
- The cluster is not able to reschedule failed workloads. 
- Inter-cluster network route discovery is not possible. Only pre-existing connections are maintained.

{{< callout context="note" title="Did you know?" icon="outline/info">}}
Cluster and Root orchestrator failure can be mitigated by setting up a high availability setup for the microservices composing the control plane. 
{{< /callout >}}

### Worker Node Failure
A worker node failure is common and expected at the edge. The cluster will re-deploy the workload affected by the worker failure. Worker failures are detected via a heartbeat mechanism. If a worker stops responding for more than 5 seconds, the cluster will scale up and re-deploy the workload on another worker. The worker node failure time threshold is a [parameter](https://github.com/oakestra/oakestra/blob/c0f3250ebdf8fbff5d35c1662e59cb1f4a8e899a/cluster_orchestrator/cluster-manager/cluster_manager.py#L52) of the cluster manager.

