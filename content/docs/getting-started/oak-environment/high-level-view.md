---
title: "High Level Setup Overview"
summary: ""
draft: false
weight: 100
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

{{< svg "architecture" >}}

Oakestra lets you deploy your workload on devices of any size, from a small RasperryPi to a cloud instance far away on GCP or AWS. The tree structure enables you to create multiple clusters of resources.

* The **Root Orchestrator** manages different clusters of resources. The root only sees aggregated cluster resources.
* The **Cluster Orchestrator** manages your worker nodes. This component collects real-time resources and schedules your workloads to the perfect matching device.
* A **Worker** is where your workloads are executed. E.g., your containers. 

{{< callout context="note" title="Did you know?" icon="outline/rocket">}} Since the stable Accordion release, Oakestra supports both containers and unikernel virtualization targets. {{< /callout >}}


{{< callout context="caution" title="Minimum System Requirements" icon="outline/alert-triangle">}}
Root and Cluster orchestrator (combined):
- Docker + Docker Compose v2
- 5GB of Disk
- 500MB of RAM
- ARM64 or AMD64 architecture

Worker Node:
- Linux-based distro with `iptables` compatibility 
- 50MB of space
- 100MB RAM
- ARM64 or AMD64 architecture
{{< /callout >}}