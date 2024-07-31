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

### Using docker logs 

Run `docker ps -a` on the orchestrator machine to check all running containers. 

Then simply run `docker logs <container name>` to check its logs. 

## How to access Root Orchestrator DB?

## How to access Cluster Orchestrator DB?

## How to access Worker Node control plane logs?

## How to run the Worker Network manager in Debug mode?

