---
title: "Firewall Configuration"
summary: ""
draft: false
weight: 302
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---
<span class="lead">
Oakestra components interact with each other over specific ports. These ports need to be open for the components to communicate. Firewall configurations are necessary to ensure that the network traffic is allowed to flow between the components.
</span>

{{< callout context="note" icon="outline/info-square-rounded" >}}
*If* you're running Oakestra on a restricted network, *e.g., on cloud VMs*, you need to configure the firewall rules. 
{{< /callout >}}

### Firewall Configuration

These are the ports that need to be open for the Oakestra components to communicate. 

{{< details "**Root Orchestrator**" open >}}
  - External APIs: port `10000` (APIs used by the CLI and the Web Interface to interact with the Root Orchestrator)
  - Cluster APIs: ports `10099`,`10000` (APIs used by each Cluster Orchestrator)
{{< /details >}}

{{< details "**Cluster Orchestrator**" open >}}
  - Worker's Broker: port `10003` (MQTT Broker port, used by the workers to communicate with the Cluster Orchestrator)
  - Worker's APIs: port `10100` (HTTP APIs used by the workers to perform the initial cluster handshake)
{{< /details >}}

{{< details "**Worker machine**" open >}}
  - P2P tunnel towards other workers: port `50103` (P2P tunnel used by the workers to communicate with each other; this port can be customized for each worker, check [Worker Peer-to-Peer (P2P) Tunnel Configuration](#worker-p2p-tunnel-configuration) for more details)
{{< /details >}}

### Worker P2P Tunnel Configuration

The NetManager component, responsible for the worker nodes' P2P tunnel, must be configured with (i) the IP Address where the other workers can reach the current device and (ii) the port where the tunnel is exposed. 

The P2P tunnel is used to exchange service traffic across nodes. Each worker node must be reachable from the other workers at the specified address and port.

Follow these steps on every **Worker Node** attached to the Oakestra cluster.

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

You should now have a working P2P tunnel between your worker nodes. 🌎




