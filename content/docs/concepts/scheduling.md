---
title: "Scheduling"
summary: ""
draft: false
weight: 203
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## How does the scheduling work in Oakestra?

Oakestra's architecture consists of a two-tier design where resources are organized into clusters. Each cluster represents an aggregation of all its resources. When a job is submitted, it is first scheduled to a cluster. The cluster's scheduler then determines the target worker node to execute the job.  

{{< svg "scheduling/cluster-worker-selection" >}}

The **scheduler component** is implemented as a lightweight Celery worker. It receives a job description and returns an allocation target. Scheduling in Oakestra operates at two levels:

1. **Root Scheduler:** Determines a suitable cluster for the job.
2. **Cluster Scheduler:** Selects the appropriate worker node within the chosen cluster.

To abstract the target resource, Oakestra employs a **Resource Abstractor**. This service transforms clusters and worker nodes into generic resources with defined capabilities. This abstraction ensures compatibility between cluster and worker selection algorithms.

{{< callout context="caution" icon="outline/alert-triangle">}}
The Resource Abstractor component is currently experimental and deployed exclusively at the root level. As of the current version, the Cluster Scheduler still interacts directly with cluster resources. Future releases will integrate the Resource Abstractor into the Cluster Scheduler to enhance interoperability and ensure consistent functionality across scheduling algorithms.  
{{< /callout >}}

## Scheduling Algorithm

Scheduling algorithms can be categorized as:

- *Generic:* Algorithms that work equally well for both cluster and worker selection without requiring resource-specific details.
- *Specific:* Algorithms that leverage resource-specific attributes, such as cluster-specific details (e.g., location) or worker-specific features (e.g., available sensors), to make scheduling decisions.


{{< svg-small "scheduling/scheduler" >}}
At each layer, the scheduling decision involves two key steps:

1. **Filtering Process:** Generates a `candidate_list` of clusters (or workers) by narrowing down the search space based on job requirements and resource capabilities.
2. **Selection:** Chooses the "best" candidate from the filtered list using a scheduling algorithm.

This two-step approach optimizes the scheduling process by focusing the algorithm on the most suitable candidates, improving efficiency and decision quality.  

{{< svg-small "scheduling/scheduling-algo" >}}

The `schedule_policy` algorithm is implemented in the `calculation.py` file of each scheduler.  

{{< callout context="tip" icon="outline/bell-exclamation" >}}
The current release supports two calculation strategies: *best fit* and *first fit*. However, future major release will include several other scheduler variants, e.g. *Latency and Distance Aware algorithm (LDP)* which allows you to specify geographical constraints as described in this [publication](https://www.usenix.org/conference/atc23/presentation/bartolomeo). Stay tuned for updates! 

{{< /callout >}}

## Job Constraints

The **Job Deployment Descriptor** enables developers to define three types of constraints.

1. *Node Resources:* Specify required resources like CPU, memory, or GPU capabilities.
2. *Geographical Positioning:* Indicate preferred or required locations for the job execution.
3. *Direct Mapping:* Map the job to a specific node or set of nodes.

{{< callout context="note" icon="outline/info-circle" >}}
For more details on deployment descriptor keywords and enforcing these constraints, refer to the [SLA Description](../../reference/application-sla-description).
{{< /callout >}}

### Resources

The **Job Resource Requirements** are used to immediately exclude unsuitable candidates from the candidate list. These requirements define the bare minimum resources necessary for the job to function correctly. Below is a table of the supported resources and their development status.


|Resource type|Status|Comments|
|---|---|---|
|Virtualization|🟢|Fully functional containers and unikernel support. |
|CPU|🟢|Only number of CPU cores   
|Memory|🟢|Memory requirements in MB
|Architecture|🟢| It's possible to use the Architecture selector to specify a target hardware. 
|Cluster|🟢| It's possible to use the Cluster selector to limit a deployment to a pre-defined cluster.
|Node|🟢| It's possible to use the Node selector in combination with a Cluster selector to limit a deployment to a pre-defined node of a cluster.
|Geo|🟠| Under development, the possibility to filter resources based on geographical coordinates.
|Bandwidth|🟠| Under development, the possibility to filter resources based on data rate limitations.
|Storage|🟠|It is possible to specify it, but it is not **yet** taken into account by the scheduler 
|GPU|🟠|Possibility of specifying the GPU cores. But not yet the available GPU drivers. Right now, the support is only for CUDA.
|TPU|🔴|Not yet under development


### Direct mapping positioning

The **direct mapping** constraint allows developers to explicitly define a list of target clusters and nodes in the deployment description. The scheduling algorithm will then operate only on the active clusters or nodes specified in the list.

For example, the following constraint:

```json
"constraints":[
            {
              "type":"direct",
              "node":"xavier1",
              "cluster":"cluster1"
            }
          ]
```
limits the deployment to the node `xavier1` of the cluster `cluster1`. While the following constraint:

```json
"constraints":[
            {
              "type":"direct",
              "cluster":"gpu"
            }
          ]
```
limits the deployment to all worker nodes within the cluster `gpu`.







