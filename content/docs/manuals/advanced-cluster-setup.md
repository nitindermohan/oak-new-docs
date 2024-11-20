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

This guide will walk you through deploying stand-alone components, allowing you to
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

### Stand-alone Root Orchestrator

First, let's deploy a stand-alone root orchestrator. This component will manage your clusters and provide an interface for users to interact with the Oakestra setup 
by providing an [API](../../getting-started/deploy-app/with-the-api/) and a [dashboard](../../getting-started/deploy-app/with-the-dashboard/).

```bash
curl -sfL https://raw.githubusercontent.com/oakestra/oakestra/develop/scripts/StartOakestraRoot.sh | sh - 
```

This script will download the required files to a directory called root_orchestrator. From there it will build the root orchestrator.

### Stand-alone Cluster Orchestrator

Next, we can deploy a stand-alone cluster orchestrator. This component will manage the nodes by delegating applications, creating subnetworks and
facilitating communication. Additionally the cluster orchestrator sends aggregated reports to the root orchestrator.

```bash
curl -sfL https://raw.githubusercontent.com/oakestra/oakestra/develop/scripts/StartOakestraCluster.sh | sh - 
```

This script will download the required files to a directory called cluster_orchestrator. From there it will walk you through
configuring the cluster. One the setup is complete it will build the cluster orchestrator and register with the root orchestrator.

{{< callout context="danger" title="Note" icon="outline/alert-octagon" >}}
The root orchestrator has to be reachable by the cluster orchestrator. When not on the same network the root orchestrator URL has to be a public
address!
{{< /callout >}}

You can register as many cluster orchestrators with the root orchestrator as you would like. Repeat the above commmand on a new device and specify
a unique `Cluster Name` and `Cluster Location`.

## Custom Deployments

### Choose a Different Branch

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
Oakestra has many features which have not yet been released. You can check out what's in the pipeline by taking a look at some of the active [branches](https://github.com/oakestra/oakestra/branches) here.
{{< /callout >}}

By default these scripts will build from the `main` oakestra branch. However this can be changed by setting the environment variable `OAKESTRA_BRANCH`.
This allows you to experiment with some unreleased features.

```bash
export OAKESTRA_BRANCH=develop
```
This will allow you to build the newest Oakestra version.

### Compose Overrides

Since Oakestra uses docker-compose to build the components, we can use overrides to fine-tune our build environment.

To use the override files, specify the them in a comma-seperated list:
```bash
export OVERRIDE_FILES=override-alpha-versions.yaml
```

**Overview of Root Orchestrator Overrides:**
* `override-no-dashboard.yml`: Do not deploy the dashboard
* `override-no-network.yml`: Exclude network components
* `override-ipv6-enabled.yml`: Enable IPv6 for container deployments
* `override-no-observe.yml`: Disable the [observability stack](https://github.com/oakestra/oakestra/blob/7107115a747cf83268aea592df1478cd20933907/root_orchestrator/config/README.md)

**Overview of Cluster Orchestrator Overrides:**
* `override-ipv6-enabled.yml`: Enable IPv6 for container deployments
* `override-no-observe.yml`: Disable the [observability stack](https://github.com/oakestra/oakestra/blob/7107115a747cf83268aea592df1478cd20933907/root_orchestrator/config/README.md)
* `override-mosquitto-auth.yml`: Enable [MQTT Authentication](../networking-internals/MQTT-Authentication)

\
{{< link-card
  title="Registering Nodes"
  description="Check out how to register worker nodes with a cluster"
  href="../../getting-started/oak-environment/add-edge-devices-workers-to-your-setup"
  target="_blank"
>}}

