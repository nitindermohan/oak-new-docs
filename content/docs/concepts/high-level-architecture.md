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
* The [NodeEngine](#worker-node) composed of **NodeEngine**, and **Net Manager**

## Root Orchestrator

The root orchestrator is the centralized control plane that coordinates the participating clusters.

{{< svg "concepts/orchestration/arch-root" >}}

add grafana.

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
* The **Root Network component** manages the Semanti IP and Instance IP addresses of each service as well as the cluster's subnetworks. Check the Networking concepts and manuals for further details. 
<!--* TODO: Add netwprk links-->

## Cluster Orchestrator

{{< svg "concepts/orchestration/arch-cluster" >}}

The cluster orchestrator is a logical twin of the root, but with the following distinctions:
* The cluster orchestrator manages workers, and not clusters. 
* A cluster orchestrator aggregates the worker node resources and obscures the cluster composition to the root. At root level a cluster is seen as a generic resource with maximum capacity equal to the total of its resources.
* MQTT is used for intra-cluster control-plane communication. 

## Worker Node

A worker node is a machine running the NodeEngine and the NetManager. The former enables the
deployment of applications according to the runtimes installed. The latter provides networking
components to enable inter-application communication.

{{< svg "concepts/orchestration/arch-node-engine" >}}

The NodeEngine is a single binary implemented using Go and is composed of the following modules:
* **MQTT:** The interface between the worker and the cluster. Deployment commands, node status
updates and job updates use this component.
* **Models:** Models that describe the nodes and jobs  
    * Node: Describes the resources that are transmitted to the cluster. These are decomposed into static 
    resources, which are only transmitted at startup, and dynamic resources, which are periodically
    updated, e.g. CPU/memory
    * Service: Describes the services that are managed by this worker node, as well as the real-time
    service usage statistics
* **Jobs:** Background jobs that monitor the the status of the worker node and the deployed applications
* **Runtimes:** The supported system runtimes. Currently containers and Unikernels are supported

## Considerations on Failure and scalability

The key drawback of a centralized control plane is that is creates a single point of failure. Oakestra mitigates this by ensuring
that the clusters are able to satisfy the SLAs for deployed applications, the only affected functionalities are the deployment of
new services and intra-cluster migrations.
<!--Todo: To avoid failure and increase resiliency, an idea is to make the component able to scale by introducing a load balancer in front of the replicated components. However, this feature is not implemented yet-->