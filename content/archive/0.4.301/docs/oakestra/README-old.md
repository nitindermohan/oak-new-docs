---
title: "Old Docs"
draft: true
hidden: true
---

# edgeIO Documentation

  - [Architecture Overview](#architecture-overview)
  - [Root Orchestrator](#root-orchestrator)
  - [Cluster Orchestrator](#cluster-orchestrator)
  - Worker Node detailed information



## Architecture Overview

EdgeIO consists of a centralized Root Orchestrator, distributed clusters, and heterogeneous worker nodes.

![Alt text](./res/edgeIO_arch.svg)


## Root Orchestrator

The Root Orchestrator is a centralized controlplane that is aware of the participating clusters.
Figure 3.2 shows the software stack of the Root orchestrator. It consists of a System Manager
which can be contacted by users, developers, or operators to use the system as an application
deployment platform. Other components are a scheduler which has the task to calculate a
placement for a given application, and a database to store information about the participating
clusters within the system. For the Root Orchestrator, the participating clusters are like worker
26nodes that can receive scheduling decisions and deploy tasks. However, each cluster contains
again a scheduler which can take decisions whether to deploy tasks or not. For designing
and implementing a prototype system, it is assumed that all machines have a Linux operating
system, however, any other OS can be used as well - as long the code is able to run successfully
on the target machine. In our case, the Python-based implementation can run on all the
popular operating systems.


The System Manager is the principal contact for users of the platform. It is a central server
and provides APIs to receive deployment commands from users (application management). It
communicates with the other components of the Root Orchestrator, essentially, it interacts with
the Cloud Scheduler, stores job request information of users in the database, and handles user
requests. The System Manager also provides APIs to handle Cluster Orchestrators which is
the second essential job of the System Manager. Cluster Orchestrators send their information
regularly, and the System Manager is aware of those clusters (infrastructure management).
The database of the Root Orchestrator stores aggregated information about the participating
clusters. Those data are transported through the information channel from the Cluster Manager
of each Cluster Orchestrator. Data can be static metadata and dynamic data. The first one covers
the IP address, port number, name, and location of each cluster. The latter can be data that is
changing regularly, such as the number of worker nodes per cluster, total amount of CPU cores
and memory size, total amount of disk space, GPU capabilities, etc. The more knowledge the
Root Orchestrator has about the clusters and the available worker nodes in each cluster, the
more it is able to calculate more precise deployment and migration requests. Indeed, there is a
tradeoff between sending zero information and all available information about each cluster.
Limitations of the centralized controlplane are a bottleneck between the user and the system
and between the Root Orchestrator and the participating clusters. However, this just arises if a
very large amount of users are using the system, simultaneously. To tackle this challenge, the
controlplane could be replicated so that all user requests can be handled without breaking
the system. Another issue of the centralized controlplane is its single-point-of-failure which is
the nature of centralized design choices. However, the Root Orchestrator is designed to be
run on a powerful machine in a datacenter. Moreover, the single components within the Root
Orchestrator can run on different devices or virtual machines in a datacenter so that downtime
of single components and thus the whole Root Orchestrator can be kept low. However, both
limitations can be solved by replicating the Root Orchestratorto increase its availability. The
Root Orchestrator can be scaled up, depending on how reliable and available the requirement
is, to a desired amount of replicas. A load balancer can be placed in front of the replicated
Root Orchestrators to handle the requests and to distribute the load evenly on the different
instances.


To reduce the workload of the Root Orchestrator though, there is a built-in design possibility
in edgeIO. There are many particpating clusters, and users may deploy just on a specific
cluster. In this case, the Root Orchestrator just forwards the user request to the target cluster
without parsing or calculating the deployment request. Thereby, the workload of the Root
Orchestrator is reduced since it just sends an HTTP Redirect to the target cluster without
parsing the deployment file or asking the Cloud Scheduler for a placement decision. (Both
the System Manager and the Cluster Manager provide REST APIs. Thus, HTTP Redirects are
possible.) The Root Orchestrator just acts as a communication proxy that forwards deployment
requests coming from the user to a target cluster. This would lead to reduced workload for the Root Orchestrator on the one hand, and flexibility for the user on the other hand. This can be
applied by users who are aware of the clusters. However, this is just a possible way to deploy.
However, this feature is not implemented yet. Of course, the built-in parsing and scheduling
steps can still be used if users are not aware of the underlying clusters.

## Cluster Orchestrator

The design of the Cluster
Orchestrator is similar to the design of the Root Orchestrator, however, it does not contain a
System Manager, instead a Cluster Manager which is responsible for the management of a
group of worker nodes. The Cluster Manager provides APIs that can be used by worker nodes
to join or leave the system (infrastructure management). The Cluster Orchestrator contains
a scheduler that calculates task placements, and a database to store information about the
participating worker nodes. After the Root Orchestrator made the decision to chose a cluster
for a specific job, the Cluster Orchestrator is responsible to actually select one of the physical
machines to run the job. A job can be a Unikernel, or a container (application management).
In addition, each Cluster Orchestrator consists of a message broker which is used as a proxy
between Cluster Manager and the underlying worker nodes. The message broker is used by
worker nodes as well as by the Cluster Manager to subscribe and publish valuable information
to each other. Worker nodes regularly publish dynamic data such as CPU and memory values.
And the Cluster Manager subscribes to those topics to store the status update of each worker
node in the database of the corresponding cluster. On the other hand, the message broker is
used by a Cluster Manager to send control commands to worker nodes. Control commands
can be DEPLOY or TERMINATE an application. Both the control commands and the status
updates go via the message broker (proxy) in independent channels. The message broker is
responsible for application management, i.e. DEPLOY or TERMINATE a task, and application
monitoring, i.e. application status updates.
The clusters, in particular the cluster orchestrators of each cluster, send data about themselves and the entire cluster to the Root Orchestrator, especially what kind of worker capabilities it
contains. If a Cluster Orchestrator does not have any registered worker node or the worker
nodes cannot start any new jobs, it will not receive any deployment requests by the Root
Orchestrator. Even if the Root Orchestrator decides to choose a given cluster for a new
deployment, the Cluster Orchestrator could reject if the workload capability is not enough
in the meantime. Furthermore, the amount and the frequency of sending status updates
from cluster to Root Orchestrator is an important topic. Each cluster could send nothing or
all available data about the worker nodes. There is indeed a tradeoff between pushing all
existing data and pushing no data to the Root Orchestrator. All existing data would be too
much overhead, and the separation of the two schedulers would be rather unnecessary. Zero
data would lead to the inability of the Root Orchestrator to calculate placements. Sending
aggregated information from each cluster to the Root Orchestrator is the design choice in
edgeIO since it is enough for rough placement decisions at the root level and the overhead
remains low.

## Worker Node

Each cluster contains one or more worker nodes. A required assumption is that each worker
node has an operating system, computation power, memory, storage, network capability,
and application runtime. A worker machine and its components are shown in Figure 3.4.
Application runtimes can be the Docker engine, containerd, Container Runtime Interface (CRI),
Unikernel runtimes, or arbitrary other runtimes. No runtime would also work, then jobs can be
native applications for the target operating system of the compute node. The worker node of a
cluster has an initialization process with its Cluster Orchestrator, in particular with the Cluster
Manager. During the initialization phase, several data are delivered from worker to Cluster
Manager, e.g. hostname, IP address, hardware capabilities such as CPU architecture, amount
of CPU cores, memory size, disk size, attached sensors, attached accelerators, GPUs, VPUs,
if existing, and which virtualization technologies are supported. After receipt, the Cluster
Manager sends back a unique ID and the IP address and port number of the message broker
where the worker can send their current CPU and memory usage, regularly. This phase is part
of the infrastructure management which means that edgeIO is aware of a new compute node
within the entire deployment and orchestration infrastructure. Upon successful initialization,
application management is able to work in edgeIO which means that deployments can be
placed on the worker node. Sending regular information to the message broker of its Cluster
Orchestrator is important for monitoring the worker node 3.1 and is part of the infrastructure
management.

Any device with an operating system and the running Node Engine software on it can join
an edgeIO cluster and be part of the system. As Figure 3.4 shows, further requirements are
application runtimes on compute nodes. The Node Engine software currently checks if Docker
is installed on the device. Docker provides an API to start, delete, pause, or restart a container.
There are SDKs available for various programming languages. The Node Engine software uses
the Docker SDK for Python to control Docker containers on compute nodes. Additionally,
Node Engine also checks if MirageOS is installed. However, there is no full and stable control
for MirageOS Unikernels. In the same way, other virtualization technologies can be checked in
Node Engine as well. All of them are sent to the Cluster Manager which again reports to the
Root Orchestrator so that users are aware of supported application technologies.

Furthermore, Node Engine is written in a way that does not require an open port on the
worker machine. It is not needed to be reachable by a Cluster Manager to join the system. The
worker nodes use the publish/subscribe pattern to pull control commands from their Cluster
Orchestrator as well as to push status updates to them. This increases the flexibility for edge
devices and their connectivity restrictions. In this way, safety concerns are solved by design.
Operators do not need to open ports on edge devices and concerns that e.g. internal company
networks may be attacked via the open port, do not arise because it is no need for an open
port at all. Worker nodes can be located behind Firewalls, proxies, behind NAT-based Routers,
and still share their computation capability. Compute nodes at the edge can be exploited well
via this way and computation can happen close to the user - a key point in the edge computing
paradigm. Joining the edgeIO infrastructure and getting deployment commands is always
initiated by the compute nodes themselves and is voluntary. This design allows that worker
nodes cannot be harmed by attackers caused by open ports or public IP addresses. Joining
flexibility seems to be a key point in edge computing which is fulfilled in the proposed system.
