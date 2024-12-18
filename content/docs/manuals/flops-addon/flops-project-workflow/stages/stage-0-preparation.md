---
title: "Stage 0: Preparation"
summary: ""
draft: false
weight: 370
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
asciinema: true
---

## ML Git Repository

The heart of a FLOps project is the ML Git repository, which contains the ML training code that will be run by FLOps learner services.
For FLOps to use this repository correctly, it must follow some simple structural requirements.

For the base-case project we will use one of the prepared repositories provided by the [oak-cli](/docs/getting-started/deploy-app/with-the-cli/).

{{< link-card
  title="Create your own ML Git Repository for FLOps"
  href="/docs/manuals/flops-addon/customizations/ml-git-repository/"
>}}


## Training Data

In addition to preparing your system for FLOps we need data to perform FL *(training on the learner nodes)* before creating our base-case project.
To save time, we will ‘mock’ real edge devices by using a [Mock Data Provider](/docs/manuals/flops-addon/internals/mock-data-providers/) (**MDP**).
In short, an MDP is a service deployed by FLOps on a learner node to populate it with data for training.

{{< callout context="caution" title="MDP Requirements" icon="outline/alert-triangle">}}
  - You must deploy your MDP service on the same worker node where you previously activated the `FLOps-learner` addon.
  - If you want to work with multiple learner nodes, ensure you deploy an MDP for each one.
{{< /callout >}}

Deploy the base-case MDP:
```bash
  oak addon flops m --mock-sla-file-name mnist_multi.json
```

This demo shows you the base-case MDP in action:

{{< asciinema key="flops_base_case_mdk" poster="0:32" idleTimeLimit="2" >}}

Once the MDP service's state is `COMPLETED ✅` you can undeploy it (`oak a d -y`).

You can verify that the data has been populated on the learner by running the following on that node:

- Find the ml-data-server docker container ID 
```bash
  docker ps | grep oakestra/addon-flops/ml-data-server
```
Output: `0ce8c5d46372   ghcr.io/oakestra/addon-flops/ml-data-server:latest ...`

Check that data was added:
```bash
  docker exec 0ce8c5d46372 ls /ml_data_server_volume  
```
Output:
```
  mnist.b99ca6cc4d2cf67d268c0201bd72beec.parquet
  mnist.bcd496924c1bb507838e493c088f2e23.parquet
  mnist.d7f78c168fd86758155f7365ae28205b.parquet
```

{{< link-card
  title="Curious about ML data management?"
  description="Explore how FLOps manages ML data for local training"
  href="/docs/manuals/flops-addon/internals/ml-data-management/"
>}}
