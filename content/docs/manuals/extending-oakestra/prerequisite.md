---
title: "Setup Addons System"
summary: ""
draft: false
weight: 1
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

In order to utilize addons for your orchestrator, do the following:

## Run the Addons System

The addons system consists of two sub-systems:
- Addons Engine
- Addons Marketplace

<!-- Fix links in another issue - once concepts is merged -->
You can find more details [here](../../concepts/addons) 

Navigate to director `run-a-cluster` in home folder of the project, run this command
```bash
docker compose -f 1-DOC.yaml -f override-addons.yaml up addons_manager addons_monitor marketplace_manager
```

This should spin up 3 docker containers inside the `root-orchestrator`. Notice that also it will run the addons marketplace locally. Currently there isn't a global `Marketplace` for addons. However, in the future there should be one, in which case there wouldn't be a need to run it locally.

{{< callout context="tip" title="Can Addons Engine Run inside a cluster orchestrator too" icon="outline/rocket" >}}

Although not tested, technically, the `Addons Engine` can run inside the `Cluster Orchestrator` as well.

{{< /callout >}}

