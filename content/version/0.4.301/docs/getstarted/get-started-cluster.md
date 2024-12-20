---
title: "Your First Oakestra Cluster"
---

## High-level architecture

![High level architecture picture](/getstarted/highLevelArch.png)

Oakestra lets you deploy your workload on devices of any size. From a small RasperryPi to a cloud instance far away on GCP or AWS. The tree structure enables you to create multiple clusters of resources.

* The **Root Orchestrator** manages different clusters of resources. The root only sees aggregated cluster resources. 
* The **Cluster orchestrator** manages your worker nodes. This component collects the real-time resources and schedules your workloads to the perfect matching device.
* A **Worker** is any device where a component called NodeEngine is installed. Each node can support multiple execution environments such as Containers (containerd runtime), MicroVM (containerd runtime), and Unikernels (mirageOS).

Disclaimer, currently, only containers are supported. Help is still needed for Unikernels and MicroVMs. 


## Create your first Oakestra cluster

Let's start simple with a single node deployment, where all the components are in the same device. Then, we will separate the components and use multiple devices until we're able to create multiple clusters. 

### Requirements:

- Linux (Workers only)
- Docker + Docker compose v2 (Orchestrators only)
- Cluster Orchestrator and Root Orchestrator machines must be mutually reachable. 

### 1-DOC (1 Device, One Cluster) 

In this example, we will use a single device to deploy all the components. This is not recommended for production environments, but it is pretty cool for home environments and development. 

![Deployment example with a single device](/getstarted/SingleNodeExample.png)

**1)**

Let's start the Root, the dashboard, and a cluster orchestrator on your machine. 

```
export OAKESTRA_VERSION=v0.4.301
curl -sfL oakestra.io/getstarted.sh | sh -
```

> You can turn off the cluster using `docker compose -f ~/oakestra/1-DOC.yaml down`

**2)** download, untar and install the node engine and network manager binaries

```Shell
export OAKESTRA_VERSION=v0.4.301
curl -sfL oakestra.io/install-worker.sh | sh - 
```

**3)** Configure the Network Manager by editing `/etc/netmanager/netcfg.json` as follows:

```json
{
  "NodePublicAddress": "<IP ADDRESS OF THIS DEVICE>",
  "NodePublicPort": "<PORT REACHABLE FROM OUTSIDE, use 50103 as default>",
  "ClusterUrl": "<IP Address of cluster orchestrator or 0.0.0.0 if deployed on the same machine>",
  "ClusterMqttPort": "10003"
}
```
**4)** start the NetManager on port 6000

```
sudo NetManager -p 6000 
```


**5)** start the NodeEngine. 
On a different shell, start the NodeEngine with the -n 6000 paramenter to connect to the NetManager. 

```Shell
sudo NodeEngine -n 6000 -p 10100  -a <Cluster Orchestrator IP Address>
```
( you can use `NodeEngine -h` for further details )

If you see the NodeEngine reporting metrics to the Cluster...

🏆 Success!

✨🆕✨ If the worker node machine has KVM installed and it supports nested virtualization, you can add the flag -u=true to the NodeEngine startup command to enable Oakestra Unikernel deployment support for this machine.


### M-DOC (M Devices, One Cluster)

The M-DOC deployment enables you to deploy One cluster with multiple worker nodes. The main difference between this deployment and 1-DOC is that the worker nodes might be external here, and there can be multiple of them. 

![](/getstarted/1ClusterExample.png)

The deployment of this kind of cluster is similar to 1-DOC. We first need to start the root and cluster orchestrator. Afterward, we can attach the worker nodes. 

**1)** On the node you wish to use as a cluster and root orchestrator, execute steps **1-DOC.1**.

**2)** Now, we need to prepare all the worker nodes. On each worker node, execute the following:

2.1) Downlaod and unpack both the NodeEngine and NetManager

```Shell
curl -sfL oakestra.io/install-worker.sh | sh - 
```

2.2) Edit `/etc/netmanager/netcfg.json` accordingly:

```Shell
{
  "NodePublicAddress": "<IP ADDRESS OF THIS DEVICE>",
  "NodePublicPort": "<PORT REACHABLE FROM OUTSIDE, internal port is always 50103>",
  "ClusterUrl": "<IP ADDRESS OF THE CLSUTER ORCHESTRATOR>",
  "ClusterMqttPort": "10003"
}
``` 
2.3) Run the NetManager and the NodeEngine components:

```Shell
sudo NetManager -p 6000 &
sudo NodeEngine -n 6000 -p 10100 -a <IP ADDRESS OF THE CLSUTER ORCHESTRATOR>
```

### MDNC (M Devices, N Clusters)

This represents the most versatile deployment. You can split your resources into multiple clusters within different locations and with different resources. In this deployment, we need to deploy the Root and the Cluster orchestrator on different nodes. Each independent clsuter orchestrator represents a cluster of resources. The worker nodes attached to each cluster are aggregated and seen as a unique big resource from the point of view of the Root. This deployment isolates the resources from the root perspective and delegates the responsibility to the cluster orchestrator. 
![](/getstarted/2ClusterExample.png) 


N.b., the following ports need to be reachable by the respective components:

- Port 80/TCP - Exposed to anyone that needs to reach the Dashboard 
- Port 10000/TCP - Exposed to anyone that needs to reach the Root APIs (It also needs to be accessible from the Cluster Orchestrator)
- Port 50052/TCP - System Manager (Needs to be exposed to the Clusters for cluster registration.)
- Port 10099/TCP - Service Manager (This port can be exposed only to the Clusters)


#### **1)** Startup the Root Orchestrator
In this first step, we need to deploy the RootOrchestrator component on a Node. 
First configure the address used by the dashboard to reach your APIs by running:
 
```Shell
export SYSTEM_MANAGER_URL=<IP ADDRESS OF THE NODE HOSTING THE ROOT ORCHESTRATOR>
```
Then, download setup and startup the root orchestrator simply running:
```
export OAKESTRA_BRANCH=v0.4.301
curl -sfL https://raw.githubusercontent.com/oakestra/oakestra/alpha-v0.4.302/scripts/StartOakestraRoot.sh | sh - 
```

> If you wish to build the Root Orchestrator by yourself from source code, clone the repo and run the following instead of the startup script mentioned above:
> ```bash
> git clone https://github.com/oakestra/oakestra.git && cd oakestra
> sudo -E docker compose -f root_orchestrator/docker-compose.yml up
> ```

>> **(Optional)**: Before running the startup command, you can expose the following variables to setup custom overrides or a custom branch for the repository:
>> - Setup a repository branch e.g., `export OAKESTRA_BRANCH=develop`, default branch is `main`. This branch will be used to download the startup scripts.
>>- Setup comma-separated list of custom override files for docker compose e.g., `export OVERRIDE_FILES=override-alpha-versions.yaml`. The availble overrides are:
>>    - `override-alpha-versions.yaml` - Use this override to deploy the alpha versions of the pre-built components.
>>    - `override-no-dashboard.yml` - Use this override to remove the dashboard component from the deployment.
>>    - `override-ipv6-enablesyml` - Use this override if you need IPv6 support for the control plane components.

#### **2)** Startup the Cluster Orchestrator
For each node that needs to host a cluster orchestrator, you need to:
2.1) Export the ENV variables needed to connect to the cluster orchestrator:

```Shell
## Choose a unique name for your cluster
export CLUSTER_NAME=My_Awesome_Cluster

## Optional: Give a name or geo coordinates to the current location. Default location set to coordinates of your IP
#export CLUSTER_LOCATION=My_Awesome_Apartment

## IP address where this root component can be reached to access the APIs
export SYSTEM_MANAGER_URL=<IP address>
# Note: Use a non-loopback interface IP (e.g. any of your real interfaces that have internet access).
# "0.0.0.0" leads to server issues
```

You can then run the cluster orchestrator using the pre-compiled images:
- Download and start the cluster orchestrator components:
```
export OAKESTRA_BRANCH=v0.4.301
curl -sfL https://raw.githubusercontent.com/oakestra/oakestra/alpha-v0.4.302/scripts/StartOakestraCluster.sh | sh - 
```

>If you wish yo build the cluster orchestrator yourself simply clone the repo and run:
> ```bash
> export CLUSTER_LOCATION=My_Awesome_Apartment #If building the code this is not optional anymore
> git clone https://github.com/oakestra/oakestra.git && cd oakestra
> sudo -E docker compose -f cluster_orchestrator/docker-compose.yml up
> ```

>> **(Optional)**: Before running the startup command, you can expose the following variables to setup custom overrides or a custom branch for the repository:
>> - Setup a repository branch e.g., `export OAKESTRA_BRANCH=develop`, default branch is `main`. This branch will be used to download the startup scripts.
>>- Setup comma-separated list of custom override files for docker compose e.g., `export OVERRIDE_FILES=override-alpha-versions.yaml`. The availble overrides are:
>>    - `override-alpha-versions.yaml` - Use this override to deploy the alpha versions of the pre-built components.
>>    - `override-no-dashboard.yml` - Use this override to remove the dashboard component from the deployment.
>>    - `override-ipv6-enablesyml` - Use this override if you need IPv6 support for the control plane components.


#### **3)** Start and configure each worker as described in M-DOC.2

### Hybrids

You should have got the gist now, but if you want, you can build the infrastructure by composing the components like LEGO blocks.
Do you want to give your Cluster Orchestrator computational capabilities for the deployment? Deploy there the NodeEngine+Netmanager components, and you're done. You don't want to use a separate node for the Root Orchestrator? Simply deploy it all together with a cluster orchestrator.

# 🎯 Troubleshoot
<a name="🎯-troubleshoot"></a>

- #### 1-DOC startup sends a warning regarding missing cluster name or location.
  After exporting the env variables at step 1, if you're using sudo with docker-compose, remember the `-E` parameter.

- #### NetManager bad network received 
  Something is off at the root level. Most likely, the cluster network component is not receiving a subnetwork from the root. Make sure all the root components are running. 

- #### NetManager timeout
  The cluster network components are not reachable. Either they are not running, or the config file `/etc/netmanager/netcfg.json` must be updated.

- #### Deployment Failed: NoResourcesAvailable/NoTargetCluster
  There is no worker node with the specified capacity or no worker node deployed at all. Are you sure the worker node startup was successful?

- #### Wrong Node IP displayed
  The node IP is from the cluster orchestrator perspective so far. If it shows a different IP than expected, it's probably the IP of the interface used to reach the cluster orchestrator. 

- #### Other stuff? Contact us on Discord!
