---
title: "Control Plane Monitoring"
summary: ""
draft: false
weight: 342
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## How can I access Root and Cluster orchestrator logs?

You have two ways, **(A)** Grafana Dashboard or **(B)** docker logs.

### Using Grafana Dashboard

The grafana dashboards are exposed at <root_orchestrator_ip>:3000 and <cluster_orchestrator_ip>:3001 respectively. 

- ⚠️ The cluster grafana dashboard is not available with 1-DOC deployments. For 1-DOC all the data is aggregated in the same dashboard. 

![](control-plane-grafanalogs.png)

### Using docker logs 

Run `docker ps -a` on the orchestrator machine to check all running containers. 

![](control-plane-docker-logs-1.png)

Then simply run `docker logs <container name>` to check its logs. 

![](control-plane-docker-logs-2.png)

## How to access Worker Node control plane logs?


### Node Engine 
On Node Engine v0.4.203 and above you can use 

```
NodeEngine logs
```

or you can manually access the logs in 

```
/var/log/oakestra/nodeengine.log
```

### Net Manager

On Net Manager v0.4.203 and above you can access the logs at 

```
/var/log/oakestra/netmanager.log
```

## How do I activate Debug Mode in NetManager? 

In NetManager v0.4.302 or above add the debug `true` flag in your `netcfg.json` file as follows:

`/etc/netmanager/netcfg.json`
```json
{
  "NodePublicAddress": "0.0.0.0",
  "NodePublicPort": "50103",
  "ClusterUrl": "0.0.0.0",
  "ClusterMqttPort": "10003",
  "Debug": true
}
```

> For NetManager **v0.4.301 and previous releases**, just start the NetManager using the `-D` flag.
> E.g., `NetManager -p 6000 -D`

## Where do I find Worker NetManager logs? 

From `v0.4.302` NetManager logs are available in `/var/log/oakestra/netmanager.log`

## How to access Root Orchestrator DB?

On your root orchestrator run `docker exec -it mongo mongo localhost:10007`

## How to access Cluster Orchestrator DB?

On your cluster orchestrator run `docker exec -it cluster_mongo mongo localhost:10107`

