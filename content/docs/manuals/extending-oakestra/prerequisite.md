---
title: "Setting Up"
summary: ""
draft: false
weight: 351
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

To use the addons engine and the marketplace, you need to enable them before starting up your Oakestra root orchestrator. To enable these components at cluster startup, you need to export the following *override file* before using the startup command:
```bash
 export OVERRIDE_FILES=override-addons.yaml
```
To start a single machine root and cluster orchestrator with the addons engine and the marketplace enabled, you can use:
 ```bash
  export OVERRIDE_FILES=override-addons.yaml
  curl -sfL oakestra.io/getstarted.sh | sh - 
  ```
**Or** for a standalone root orchestrator with the addons engine and marketplace enabled, you can use:
 ```bash
 export OVERRIDE_FILES=override-addons.yaml
 curl -sfL oakestra.io/install-root.sh | sh - 
```
{{< callout context="tip" title="Did you know?" icon="outline/rocket" >}}
The environment variable `OVERRIDE_FILES` is used at Oakestra startup to customize the services composing the control plane. These files are simple docker compose files integrated into Oakestra via the  [override](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/) functionality.
{{< /callout >}}

This should spin up 3 docker containers inside the `root-orchestrator`. Notice that it also starts up the addons marketplace locally. 
