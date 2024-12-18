---
title: "Stage 1: Project Start"
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

To start a project we need to request the FLOps Manager (*which is part of FLOps Management*) to create one.
FLOps projects are based on project SLAs.
We will use one of the predefined ones that the [oak-cli](/docs/getting-started/deploy-app/with-the-cli/) provides.

{{< link-card
  title="Create custom project SLAs"
  href="/docs/manuals/flops-addon/customizations/flops-customizations-overview/"
>}}

```bash
  oak addon flops p --project-sla-file-name mnist_sklearn_small.json
```

This demo shows the start of our base-case project:

{{< asciinema key="flops_base_case_project_start" poster="0:08" idleTimeLimit="2" >}}

After sending out the project request via the CLI, the following happens:
- The FLOps manager swiftly responded, telling us that our request had been successful and that a new project had started running.
  ```bash
    Success: 'Init new FLOps project for SLA '~/oak_cli/addons/flops/projects/mnist_sklearn_small.json'
  ```
- The manager creates two new applications:
  ```bash
  ╭──────────────────┬──────────┬──────────────────────────╮ 
  │ Name             │ Services │ Application ID           │ 
  ├──────────────────┼──────────┼──────────────────────────┤ 
  │ observatory      │ (1)      │ 6761bf5d59461659a24b1196 │ 
  ├──────────────────┼──────────┼──────────────────────────┤ 
  │ projc3fd78f56b75 │ (1)      │ 6761bf5d59461659a24b1197 │ 
  ╰──────────────────┴──────────┴──────────────────────────╯ 
  ```
  - A proj.. app that acts as a wrapper encompassing all current and future services that only belong to our project.
    - We could create several projects at the same time - each would get its own app.
  - A singleton observatory app is created that will be shared only among projects of the same user. 
- The manager creates and deployes a project observer service.
  ```bash
  ╭─────────────────────┬──────────────────────────┬────────────────┬──────────────────┬──────────────────────────╮     
  │ Service Name        │ Service ID               │ Instances      │ App Name         │ App ID                   │     
  ├─────────────────────┼──────────────────────────┼────────────────┼──────────────────┼──────────────────────────┤     
  │                     │                          │                │                  │                          │     
  │ observ8266202cd6db  │ 6761bf5d59461659a24b1198 │  0 RUNNING     │ observatory      │ 6761bf5d59461659a24b1196 │      
  │                     │                          │                │                  │                          │     
  ╰─────────────────────┴──────────────────────────┴────────────────┴──────────────────┴──────────────────────────╯     
  ```

{{< callout context="note" title="Stay up to date" icon="outline/eye" >}}

  Each project gets its own observer service.
  Besides the FLOps manager logs, this is the primary way for you *(and especially common users)* to keep up with your projects' current *(internal)* state.

  The manager and deployed FLOps services can and will send updates or potential error messages to this observer service.

  Think of the observer service as a live log or inbox for all user-relevant events concerning its matching project.

  ```bash
╭───────────────────────────────────────────────────────────────────────╮
│ name: observ8266202cd6db | NODE_SCHEDULED    | app name: observat..   │ 
├───────────────────────────────────────────────────────────────────────┤
│ 0 | RUNNING    | public IP: 192.168.178.44 | cluster ID: 67619d3d..   │ 
├───────────────────────────────────────────────────────────────────────┤
│ Project Observer started                                              │
│ New Builder service created & deployed                                │
│ Start building                                                        │
│ 192.168.178.44:5073/malyuk-a/flops_ml_repo_mnist_sklearn/base:...     │ 
│ (This can take a while)                                               │
│ < Future Events ... >                                                 │
╰───────────────────────────────────────────────────────────────────────╯
  ```
{{< /callout >}}

{{< callout context="tip" title="*JOB'S DONE!*" icon="outline/coffee" >}}
  Sending out the project request was the last manual step a FLOps user had to take.
  From now on, everything is automatically done for you by FLOps.

  Now relax, sit back, and continue reading the following stages to understand what FLOps is doing - and how you can use the trained model/inference server.
{{< /callout >}}
