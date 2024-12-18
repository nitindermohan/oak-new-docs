---
title: "FLOps Projects Overview"
summary: ""
draft: false
weight: 350
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
asciinema: true
---

{{< callout context="note" title="This Guide's Goals" icon="outline/target-arrow" >}}
  - Get you doing FL as quickly as possible
  - Help you understand the basic FLOps project workflow 
    
  This guide uses predefined SLAs and ML Git repositories provided by the [oak-cli](/docs/getting-started/deploy-app/with-the-cli/) to streamline the necessary steps.
  This base case is intended to run on a single machine to make it as easy as possible to follow along.

  To create and use custom SLAs and ML Git repositories, please familiarize yourself with this base case and read the dedicated [FLOps customization documentation](/docs/manuals/flops-addon/customizations/flops-customizations-overview/).


{{< /callout >}}

## What is a FLOps Project?
A FLOps **project** links all necessary FL and ML/DevOps components to power one FL user request.

A project contains information about:
- The user who requested it
- The target platforms that should be supported (e.g., ARM/AMD)
- What steps FLOps should perform after training.
- etc.

Projects are based on the SLA you use - they can vary in:
- ML Training Code (Git Repository)
- Requested Data (data-tags)
- FL Training Configuration
  - Number of training rounds
  - Number of Learners
  - etc.
- FL Strategy (classic or clustered hierarchical)
- etc.

{{< link-card
  title="Configure Your Projects"
  description="Explore how to create customized project SLAs"
  href="/docs/manuals/flops-addon/customizations/flops-customizations-overview/"
>}}

## Running a basic FLOps Project

{{< callout context="caution" title="Requirements" icon="outline/alert-triangle">}}
  - You have a running Oakestra deployment with at least one Worker Node with a registered NetManager.
  - You have [prepared your system to use FLOps](/docs/manuals/flops-addon/preparations/flops-preparations-overview/).
{{< /callout >}}

{{< link-card
  title="Stage 0: Preparations"
  href="/docs/manuals/flops-addon/flops-project-workflow/stages/stage-0-preparation/"
>}}

{{< link-card
  title="Stage 1: Project Start"
  href="/docs/manuals/flops-addon/flops-project-workflow/stages/stage-1-project-start/"
>}}

{{< link-card
  title="Stages 2 & 3: Building FL Actors"
  href="/docs/manuals/flops-addon/flops-project-workflow/stages/stages-2-3-building-fl-actors/"
>}}

{{< link-card
  title="Stages 4 & 5: Doing FL"
  href="/docs/manuals/flops-addon/flops-project-workflow/stages/stages-4-5-doing-fl/"
>}}


