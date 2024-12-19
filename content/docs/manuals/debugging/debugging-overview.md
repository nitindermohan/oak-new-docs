---
title: "How to start debugging?"
summary: "Debugging in Oakestra"
draft: false
weight: 391
toc: true
seo:
  title: "Debugging in Oakestra" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

{{< callout context="tip" title="Suffering from a bug?" icon="outline/settings-question" >}}
Oakestra offers built-in tools and clear workflows to help you identify, diagnose, and resolve issues quickly. Whether you’re facing unexpected application behavior, slow performance, or deployment failures, Oakestra provides a streamlined process for gathering diagnostic information and guiding you toward solutions.
{{< /callout >}}

At this stage, you should be familiar with the steps of configuring and running any application within Oakestra and know the main parts of the operations. If not, please refer to the [Getting Started](/docs/getting-started) section and other relevant sections of this documentation.

## Check orchestration logs

The first debugging step is to identify where the issue is coming from. The Root and Cluster orchestrators are the main components of the Oakestra system. They are responsible for managing the applications and the workers in the cluster.
You have two ways to access operational logs from the components 

### Using Grafana Dashboard

The Grafana dashboards are exposed at `<root_orchestrator_ip>:3000` and `<cluster_orchestrator_ip>:3001`, respectively. 

{{< callout context="caution" title="Caution" icon="outline/alert-triangle" >}}
The cluster Grafana dashboard is not available for single machine deployments. For this setup, all the data is aggregated in the same dashboard.
{{< /callout >}}

![](control-plane-grafanalogs.png)

### Using Docker logs 

Run `docker ps -a` on the orchestrator machine to check all running containers. 

![](control-plane-docker-logs-1.png)

Then simply run `docker logs <container name>` to check its logs. 

![](control-plane-docker-logs-2.png)

The logs are your best friend in identifying the root cause of the issue. Specially check for runtime errors, warnings, and exceptions.

## Run diagnostics commands

You can also run live diagnostics commands to check the status of the components using `oak-cli`. 

{{< link-card
  description="See CLI command descriptions for details"
  href="/docs/manuals/cli/features"
  target="_blank"
>}}

Continue reading to learn more about the debugging specific aspects of the Oakestra ecosystem.