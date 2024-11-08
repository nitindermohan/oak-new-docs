---
title: "Advanced Cluster Setup"
summary: ""
draft: false
weight: 300
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Deploy Multiple Clusters

<!--- Insert image here -->

Having one root orchestrator and one cluster orchestrator on one device is a great way to start using Oakestra, but the true power
of the system lies in it's federated architecture.

This guide will walk you through deploying standalone components, allowing you to
deploy multiple cluster orchestrators across multiple devices. These clusters will be managed by a single root orchestrator.

{{< callout context="caution" title="Requirements" icon="outline/alert-triangle">}}
Root and Cluster orchestrators:
- Docker + Docker Compose v2
- 5GB of Disk
- 500MB of RAM
- ARM64 or AMD64 architecture

Worker Nodes:
- Linux-based distro with `iptables` compatibility 
- 50MB of space
- 100MB RAM
- ARM64 or AMD64 architecture
{{< /callout >}}

### Standalone Root Orchestrator

First, let's deploy a standalone root orchestrator. This device will manage the clusters and provide an interface for users to interact with the Oakestra setup 
by providing an [API](../../getting-started/deploy-app/with-the-api/) and a [dashboard](../../getting-started/deploy-app/with-the-dashboard/).

<!-- Script does not work! -->
```bash
curl -sfL https://raw.githubusercontent.com/oakestra/oakestra/develop/scripts/StartOakestraRoot.sh | sh - 
```

This script will download the required files to `~/oakestra` and run the root orchestrator.
Note the IP of the 


### Standalone Cluster Orchestrator

## Custom Deployments







