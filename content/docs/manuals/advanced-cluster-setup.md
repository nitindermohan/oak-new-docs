---
title: "Advanced Cluster Setup"
summary: ""
draft: false
weight: 301
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

{{< callout context="caution" title="System Requirements" icon="outline/alert-triangle">}}
**Root and Cluster orchestrators:**
- Docker + Docker Compose v2
- 5GB of Disk
- 500MB of RAM
- ARM64 or AMD64 architecture

**Worker Nodes:**
- Linux-based distro with `iptables` compatibility 
- 50MB of space
- 100MB RAM
- ARM64 or AMD64 architecture
{{< /callout >}}

## Deploy Multiple Clusters

Having one root orchestrator and one cluster orchestrator on one device is a great way to start using Oakestra, but the true power
of the system lies in it's federated architecture.

This guide will walk you through deploying stand-alone components, allowing you to
deploy multiple cluster orchestrators across multiple devices. These clusters will be managed by a single root orchestrator.

### Stand-alone Root Orchestrator

{{<svg "architecture/Arch-Root">}}

First, let's deploy a stand-alone root orchestrator. This component will manage your clusters and provide an interface for users to interact with the Oakestra setup 
by providing an [API](../../getting-started/deploy-app/with-the-api/) and a [dashboard](../../getting-started/deploy-app/with-the-dashboard/).

```bash
curl -sfL oakestra.io/install-root.sh | sh - 
```

This script will download the required files to the directory `~/oakestra/root_orchestrator`. From there it will build the root orchestrator.

{{< callout context="caution" title="Network Configuration" icon="outline/alert-triangle">}}
If you run into a restricted network (e.g., on a cloud VM) you need to configure the firewall rules and the NetManager component accordingly. Please refer to: [Firewall Setup](../firewall-configuration)  
{{< /callout >}}

### Stand-alone Cluster Orchestrator

{{<svg "architecture/Arch-Cluster">}}

Next, we can deploy a stand-alone cluster orchestrator. This component will manage the nodes by delegating applications, creating subnetworks and
facilitating communication. Additionally the cluster orchestrator sends aggregated reports to the root orchestrator.

```bash
curl -sfL oakestra.io/install-cluster.sh | sh - 
```

This script will download the required files to the directory `~/oakestra/cluster_orchestrator`. From there it will walk you through
configuring the cluster. Once the setup is complete, it will build the cluster orchestrator and register with the root orchestrator.

{{< callout context="danger" title="Watch out!" icon="outline/alert-octagon" >}}
The root orchestrator has to be reachable by the cluster orchestrator. When not on the same network the root orchestrator URL has to be a public
address!
{{< /callout >}}

You can register as many cluster orchestrators with the root orchestrator as you would like. Repeat the above commmand on a new device and specify
a unique `Cluster Name` and `Cluster Location`.

{{< link-card
  title="Registering Nodes"
  description="Check out how to register worker nodes with a cluster"
  href="../../getting-started/oak-environment/add-edge-devices-workers-to-your-setup"
  target="_blank"
>}}


## Custom Deployments

Oakestra also allows you to customize your system deployment to best suit your needs. 

{{< callout context="tip" title="Oakestra Addons" icon="outline/rocket" >}}

Check out [addons](../extending-oakestra/creating-addons) for even more customization options!

{{< /callout >}}

### Choose a Different Branch

By default these scripts will compose the services of the `main` oakestra branch, the latest stable release. However this can be changed by setting the environment variable `OAKESTRA_BRANCH` <u>before running the startup script</u>.
This allows you to experiment with some unreleased features.

```bash
export OAKESTRA_BRANCH=develop
```
This will allow you to use the services from the alpha Oakestra release.

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
Oakestra has many features which have not yet been released. You can check out what's in the pipeline by taking a look at some of the active [branches](https://github.com/oakestra/oakestra/branches) here.
{{< /callout >}}

### Compose Overrides

Since Oakestra uses docker-compose to build the components, we can use overrides to fine-tune our build environment.

To use the override files, specify the them in a comma-seperated list by setting the `OVERRIDE_FILES` env variable <u>before running the startup script</u>.
```bash
export OVERRIDE_FILES=override-alpha-versions.yaml
```

{{< details "*Click to see overview of Root Orchestrator overrides*" >}}
* `override-addons.yml`: Eanble the [addons](../extending-oakestra/creating-addons) engine and marketplace
* `override-no-dashboard.yml`: Do not deploy the dashboard
* `override-no-network.yml`: Exclude network components
* `override-ipv6-enabled.yml`: Enable IPv6 for container deployments
* `override-no-observe.yml`: Disable the [observability stack](https://github.com/oakestra/oakestra/blob/7107115a747cf83268aea592df1478cd20933907/root_orchestrator/config/README.md)
{{< /details >}}

{{< details "*Click to see overview of Cluster Orchestrator overrides*" >}}
* `override-ipv6-enabled.yml`: Enable IPv6 for container deployments
* `override-no-observe.yml`: Disable the [observability stack](https://github.com/oakestra/oakestra/blob/7107115a747cf83268aea592df1478cd20933907/root_orchestrator/config/README.md)
* `override-mosquitto-auth.yml`: Enable [MQTT Authentication](../networking-internals/MQTT-Authentication)
{{< /details >}}

