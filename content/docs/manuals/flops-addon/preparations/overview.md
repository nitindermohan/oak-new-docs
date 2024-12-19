---
title: "FLOps Preparations Overview"
summary: ""
draft: false
weight: 360
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

### Preparing the Worker Nodes

Most FLOps services can run on any of the orchestrated worker nodes.
Building multi-platform container images and performing ML/FL model training on aggregated data requires extra considerations.
To allow FLOps to work as intended, you have to ensure that at least one of your worker nodes can build images and collect data for training.

{{< link-card
  title="Image Building Preparation"
  description="Prepare a worker node to build (multi-platform) container images"
  href="/docs/manuals/flops-addon/preparations/prepare-image-builder-workers/"
  target="_blank"
>}}

{{< link-card
  title="ML Training Data Preparation"
  description="Prepare a worker node to aggregate data for training" 
  href="/docs/manuals/flops-addon/preparations/prepare-learner-workers/"
  target="_blank"
>}}

### Set up FLOps Management

Clone the [FLOps repository](https://github.com/oakestra/addon-FLOps) onto the same machine where you run your Oakestra root orchestrator.
```bash
git clone git@github.com:oakestra/addon-FLOps.git 
```

Start the management docker-compose:
```bash
docker compose -f <path-to-your-pulled-flops-repo>/docker/flops_management.docker_compose.yml up --build -d
```
Or use this `oak-cli` command:
```bash
oak addon flops re
```

{{< link-card
  title="FLOps CLI commands"
  description="Explore the oak-cli commands that help you to work with FLOps." 
  href="/docs/manuals/cli/features/flops-addon/"
  target="_blank"
>}}

{{< callout context="note" title="Resetting your FLOps Management" icon="outline/info-circle" >}}

  The FLOps management suite contains several different components that store information and data persistently.
  This storage usually helps to avoid duplicate work by reusing, e.g., the stored images instead of building them anew.
  However, for certain experiments or development workflows, a clean, unpopulated management suite is required.

  **When clearing your FLOps management, remove all related running apps and services in your Oakestra deployment.**

  Here are a few different approaches to clearing your FLOps management suite:
  - Restart the docker compose: This will clean everyhing but the image registy. (`oak addon flops re`)
  - `oak addon flops clear-registry`: Only clears the image registry.
  - `oak addon flops redb`: Only clears the FLOps manager DB (all notion of current/last FLOps projects) 

  If you want to make sure that your system is entirely free of any previous stains, ensure to [clear your local containerd images](/docs/manuals/cli/features/worker-node/).
{{< /callout >}}

{{< link-card
  title="Run FLOps Projects"
  description="Now that your system is prepared you can run FLOps Projects"
  href="/docs/manuals/flops-addon/flops-project-workflow/flops-project-overview/"
  target="_blank"
>}}

