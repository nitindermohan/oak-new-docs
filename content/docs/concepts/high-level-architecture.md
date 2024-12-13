---
title: "High Level Architecture"
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

Oakestra is composed of 3 key building blocks:
* The [Root Orchestrator](#root-orchestrator)
* The [Cluster Orchestrator](#cluster-orchestrator)
* The [Worker Node](#worker-node) composed of **NodeEngine**, and **Net Manager**

## Root Orchestrator

The root orchestrator is the centralized control plane that coordinates the participating clusters.

{{< svg "concepts/orchestration/arch-root" >}}

The above image describes the components of the root orchestrator. Each component is deployed as a separate service
and docker-compose is used to integrate and run them.

* The **System Manager** is the interface by which users access the the system as an application deployment platform.
It exposes 2 sets of APIs:
    1. To receive deployment commands from users via [CLI](../../getting-started/deploy-app/with-the-cli/), [Dashboard](../../getting-started/deploy-app/with-the-dashboard/) or directly via [ REST API](../../getting-started/deploy-app/with-the-api/).
    2. To handle child Oakestra Clusters
* The **Scheduler** calculates a suitable cluster for a given application
* **Mongo** is the interface used to access the database. The root manager stores aggregated information on it's
child clusters. Oakestra differentiates between
    1. *Static metadata* such as the IP-address, port number, name and location of each cluster
    2. *Dynamic data* such as worker nodes per cluster, total CPU cores and memory, total disk space, GPU capabilities, etc...
* The **Resource Abstractor**, as the name suggests, abstracts a generic resources to a common interface. Weather we're managing a cluster or a worker, these resources are standardized in a common interface, making scheduling algorithms interoperable between root and clusters. This component is also exposing an interface to interact with the service lifecycle.
* **Grafana** exposes a dashboard with the global system alerts, log and statistics.
<!--* TODO: Add link to hooks-->
* The **Root Network component** manages the Semanti IP and Instance IP addresses of each service as well as the cluster's subnetworks. Check the Networking [concepts](../networking) and [manuals](../../manuals/networking-internals/semantic-addressing/) for further details. 


## Cluster Orchestrator

{{< svg "concepts/orchestration/arch-cluster" >}}

The cluster orchestrator is a logical twin of the root, but with the following distinctions:
* The cluster orchestrator manages workers, and not clusters. 
* A cluster orchestrator aggregates the worker node resources and obscures the cluster composition to the root. At root level a cluster is seen as a generic resource with maximum capacity equal to the total of its resources.
* MQTT is used for intra-cluster control-plane communication. 

## Worker Node

The worker node is the component responisble for running the workloads requested by the developers. A worker node is any Linux machine running the NodeEngine and the NetManager. The former enables the
deployment of applications according to the runtimes installed. The latter provides networking
components to enable inter-application communication.

{{< svg "concepts/orchestration/arch-node-engine" >}}

The **Node Engin**e** is a single binary implemented using Go and is composed of the following modules:
* **MQTT:** The interface between the worker and the cluster. Deployment commands, node status
updates and job updates use this component.
* **Models:** Models that describe the nodes and jobs  
    * Node: Describes the resources that are transmitted to the cluster. These are decomposed into static resources, which are only transmitted at startup, and dynamic resources, which are periodically updated, e.g. CPU/memory
    * Service: Describes the services that are managed by this worker node, as well as the real-time
    service usage statistics
* **Jobs:** Background jobs that monitor the the status of the worker node and the deployed applications
* **Runtimes:** The supported system runtimes. Currently containers and Unikernels are supported
* **Net API** local socket used to interact with the Net Manager.

The **Net Manager** component manages the service to service communcation within the node and across nodes. It fetches the balancing policies for each service, installs the virtual network interfaces, ensures traffic balancing and tunnels the packets across nodes. The Net Manager is composed of the following modules:

* **Environment Manager** Responsible for the installation of virtual network interfaces, network namespaces and iptables.
* **Proxy** The component that manages the traffic balancing and the tunneling of packets across nodes.
* **Translation table** Table of the Service IP <--> Instance IPs+Balancing Polocy translation for each service. More details in the [networking concepts](../networking) docs. <!-- add link -->
* **Proxy Table** Cache for the active proxy translations.
* **MQTT component** The interface between the Net Manager and the Cluster Network Component. It is used to resolve Service IP transaltion requests as well as asking for the node's subnetwork at startup.

## Considerations on Failure and scalability

### Root Orchestrator Failure
The key drawback of a centralized control plane is that it represents a single point of failure. Oakestra mitigates this by ensuring that the clusters are able to satisfy the SLAs for deployed applications autonomously. Therefore, by design, a total Root Orchestrator failure affects:
- the deployment of new applications. The system manager APIs are not available.
- Inter-cluster root discovery. Pre-existing P2P worker node communication is not affected. But new inter-cluster routes cannot be discovered. 
- New clusters cannot join the infrastructure. 

Solutions based on leader election for a new root among cluster orchestrators are a possible solution. However, this feature is not implemented out of the box yet.

### Cluster Orchestrator Failure
Cluster failure by design must not affect (i) other clsuters (ii) running workloads on the workers. With the current design a total failure of the cluster orchestator has the following consequences: 
- The cluster is not able to receive new workloads.
- The cluster is not able to receive new workers.
- The cluster is not able to reschedule failed workloads. 
- Inter-cluster network routes discovery is not possible. Only pre-existing connections are maintained.

{{< callout context="note" title="Did you know?" icon="outline/info">}}
Cluster and Root orchestrator failure can be mitigated by setting up a high availability setup for the microservices composing the control plane. 
{{< /callout >}}

### Worker Node Failure
A worker node failure is common and expected at the edge. The cluster will re-dploy the workload affected by the worker failure. Worker failures are detected via a heartbeat mechanism. If a worker stops responding for more than 5 seconds, the cluster will scale-up and re-deploy the workload on another worker. The worker node failure time threshold is configurable.
