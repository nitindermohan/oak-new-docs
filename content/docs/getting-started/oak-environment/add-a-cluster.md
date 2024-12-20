---
title: "Add a Cluster"
summary: ""
draft: true
weight: 105
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

### Add a New Cluster to your Infrastructure.

If you want to create new Clusters to attatch to you Oakestra Root, on each Cluster Orchestrator machine you can run:

```bash
curl -sfL oakestra.io/install-cluster.sh | sh -
```

This will start a new **Cluster Orchestrator** component. 
A script will ask you for your 
 - **Cluster name** : A name of your choice for this cluster. 
 - **Location** : Geographical coordinates and competence radius in meters, e.g.:`48.1374,11.5755,1000`
 - **IP address of the Root Orchestrator**


{{< callout context="note" title="Note" icon="outline/info-circle" >}}
All these variables can be set before startup exporting them:
```bash
export CLUSTER_LOCATION=<latitude>,<longitude>,<radius>
export CLUSTER_NAME=my_awesome_cluster
export SYSTEM_MANAGER_URL=<url or ip>
```
{{< /callout >}}
{{< callout context="note" title="Note" icon="outline/info-circle" >}}
Run this export before the cluster startup to deploy the Development version of the Cluster Orchestrator

```bash
export OAKESTRA_BRANCH=develop
```

{{< /callout >}}


You can attatch new worker nodes to this cluster using the same procedure shown in [Setup Your First Cluster](#setup-your-first-cluster)

### Shutdown the Components

To stop your **Root & Cluster** orchestrator components run:

```bash
docker compose -f ~/oakestra/1-DOC.yaml down
```

To stop each one of the additional clusters you configured, run:

```bash
docker compose -f ~/oakestra/cluster-orchestrator.yml down
```

To stop a worker node use:

```bash
sudo NodeEngine stop
```

### Advanced Network Configuration

If you run into a restricted network (e.g., on a cloud VM) you need to configure the firewall rules accordingly

Root: 
  - External APIs: port 10000
  - Cluster APIs: ports 10099,10000

Cluster: 
  - Worker's Broker: port 10003
  - Worker's APIs: port 10100

Worker: 
  - P2P tunnel towards other workers: port 50103 


Additionally, the NetManager component, responsible for the worker nodes P2P tunnel, must be configured. Therefore follow these steps on every **Worker Node**

1) Shutdown your worker node components using 
```bash
sudo NodeEngine stop
````

2) Edit the NetManager configuration file `/etc/netmanager/netcfg.json` as follows:

```json
{
  "NodePublicAddress": "<IP ADDRESS OF THIS DEVICE, must be reachable from the other workers>",
  "NodePublicPort": "<TUNNEL PORT, The PORT must be reachable from the other workers, use 50103 as default>",
  "ClusterUrl": "<IP Address of cluster orchestrator or 0.0.0.0 if deployed on the same machine>",
  "ClusterMqttPort": "10003",
  "Debug": False
}
```

3) Restart the NodeEngine
```bash
sudo NodeEngine -a <IP address of your cluster orchestrator> -d
````




