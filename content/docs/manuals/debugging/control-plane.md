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

## How to run the Worker Network manager in Debug mode?

On Net Manager v0.4.203 and above configure the `debug` flag accordingly in `/etc/netmanager/netcfg.json`. E.g.:

```
{
  "NodePublicAddress": "131.159.24.51",
  "NodePublicPort": "50103",
  "ClusterUrl": "131.159.24.51",
  "ClusterMqttPort": "10003",
  "Debug": true
}
```

On Net Manager v0.4.202 and belor just run it using the `-D` flag

## How to access Root Orchestrator DB?

On your root orchestrator run `docker exec -it mongo mongo localhost:10007`

## How to access Cluster Orchestrator DB?

On your cluster orchestrator run `docker exec -it cluster_mongo mongo localhost:10107`

