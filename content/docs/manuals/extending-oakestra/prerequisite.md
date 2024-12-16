---
title: "Setting Up"
summary: ""
draft: false
weight: 340
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

The addons system consists of two subsystems that must both be running:
- The addons engine
- The addons marketplace

<!-- Fix links in another issue - once concepts is merged -->
{{< link-card
  title="Addons"
  description="Learn more about addons"
  href="../../../concepts/oakestra-extensions/addons"
  target="_blank"
>}}

## Run the Addons System

Navigate to director `run-a-cluster` in home folder of the project, run this command
```bash
docker compose -f 1-DOC.yaml -f override-addons.yaml up addons_manager addons_monitor marketplace_manager
```

This should spin up 3 docker containers inside the `root-orchestrator`. Notice that it also starts up the addons marketplace locally. 

{{< callout context="tip" title="Global Marketplace" icon="outline/rocket" >}}

Currently there isn't a global marketplace for addons. Keep an eye our for this in future releases!

{{< /callout >}}

