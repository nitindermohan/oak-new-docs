---
title: "Create your first Oakestra Orchestrator"
summary: ""
draft: false
weight: 101
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

Let's get you up to speed with the easiest possible setup. You'll be able to run your first Oakestra Orchestrator in a few seconds!

### Startup the Orchestrators in a Single Machine

In this guide, we'll perform a Single Machine Setup. This setup is the easiest way to get started with Oakestra with a single Cluster managed by a single machine. To do so, we'll install the **Root Orchestrator** and the **Cluster Orchestrator** together, as shown in the following figure. 

After the orchestrators are up and running, you can add Edge Devices as workers to your cluster (see: [Add Edge Devices (Workers) to Your Setup](/docs/getting-started/oak-environment/add-edge-devices-workers-to-your-setup/)). 

![Deploy everything on a single machine](deploy-orch.png)

You can install the **Root** and **Cluster Orchestrator** in a single machine using the following command:

```bash
curl -sfL oakestra.io/getstarted.sh | sh - 
```

This command downloads and runs the Oakestra's docker compose files in `~/oakestra` folder. 

{{< callout context="note" title="Did you know?" icon="outline/info-circle" >}}
You can set a multi-cluster infrastructure by installing each **Cluster Orchestrator** on a different machine. 
Check out [Advanced Oakestra Clusters Setup](/docs/manuals/advanced-clusters-setup) section for more details.
{{< /callout >}}

{{< callout context="caution" title="Network Configuration" icon="outline/alert-triangle">}}
If you run into a restricted network (e.g., on a cloud VM) you need to configure the firewall rules and the NetManager component accordingly. Please refer to: [Firewall Setup](../firewall-configuration)  
{{< /callout >}}

If the startup succeeds, **congratulations! 🎉🎉**
You're now ready to add your first worker node to your cluster (see: [Add Edge Devices (Workers) to Your Setup](/docs/getting-started/oak-environment/add-edge-devices-workers-to-your-setup/)).

### Shutdown the Components

To stop your **Root & Cluster** orchestrator components run:

```bash
docker compose -f ~/oakestra/compose-single-machine.yaml down
```
