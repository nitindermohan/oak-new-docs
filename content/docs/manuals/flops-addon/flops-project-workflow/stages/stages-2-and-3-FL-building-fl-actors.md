---
title: "Stages 2 & 3: Building FL Actors"
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

The FLOps manager tries to look up matching container images for learners and aggregators.
The manager checks for images in the FLOps image registry (*part of the management suite*) that match the ML repository that was part of the requested project SLA. 

If a match is found, there is no need to build redundant images, and the project goes straight to [stage 4](/docs/manuals/flops-addon/flops-project-workflow/stages/stages-4-5-doing-fl/).

## Stage 2: FL-Actor Image-Builder Deployment

If images for **FL Actors** *(learners & aggregators)* using the requested ML repository are missing, the manager will create and deploy a single image-builder service.
This builder service is exclusive to its originating project.

```bash
  ╭─────────────────────┬──────────────────────────┬────────────────┬──────────────────┬──────────────────────────╮     
  │ Service Name        │ Service ID               │ Instances      │ App Name         │ App ID                   │     
  ├─────────────────────┼──────────────────────────┼────────────────┼──────────────────┼──────────────────────────┤     
  │                     │                          │                │                  │                          │     
  │ builder8266202cd6db │ 6761bf5e59461659a24b1199 │  0 RUNNING     │ projc3fd78f56b75 │ 6761bf5d59461659a24b1197 │      
  │                     │                          │                │                  │                          │     
  ╰─────────────────────┴──────────────────────────┴────────────────┴──────────────────┴──────────────────────────╯     
```

{{< callout context="tip" title="*To build or not to build?*" icon="outline/hammer" >}}
  Stage 2 is a distinct because:
  - Deciding if new images need to be built requires querying the remote ML Git repository and the FLOps image registry.
  - The image-builder service can only run on worker nodes with the `image-builder` addon enabled.
  - Deploying the large image builder service *(pulled size ~3GB)* can take time.
{{< /callout >}}

## Stage 3: FL-Actors Image Build

In stage 3, the deployed image-builder service builds the requested images for the learner and aggregator services.

{{< callout context="danger" title="Critical" icon="outline/alert-octagon" >}}
  Building (multi-platform) images for ML/FL dynamically based on flexible user-provided repositories is a delicate and error-prone business.

  Building images can take up a significant part of the entire project duration - especially if the training configuration is lightweight *(fast / few rounds)*.

  ---

  The only current way for FLOps to let you know that something went wrong during building is to send an error message to your project observer.

  Watch out for these observer logs - especially when working with new ML repositories for the first time. 
{{< /callout >}}

The image-builder service does the following:
- Clones the requested ML Git repository
- Checks the cloned repository if it satisfies the mandatory structural requirements 
- Checks for potential dependency issues and tries to resolve them if possible
- Builds the FL-Actor images
- Pushes the build images to the FLOps image registry
- Notifies the project observer and the FLOps manager about its success or possible errors

The FLOps manager undeploys and removes the image builder service.

### Showcase

This demo shows this build process from the perspective of a priviledged CLI user.

{{< callout context="note" title="*Time Lapse*" icon="outline/coffee" >}}
  Building images can easily take 5-30+ minutes.

  This depends on:
  - Underlying worker node resources
  - Complexity of the provided ML repo dependencies
  - Number and kind of target platforms that should be supported

  This demo cuts out long waiting periods for your viewing pleasure. 
{{< /callout >}}


{{< asciinema key="flops_base_case_fl_actors_build" poster="0:08" idleTimeLimit="1.5" >}}
<br>
{{< link-card
  title="Want to know more about the image building process?"
  description="Learn why and how container images are build in FLOps." 
  href="/docs/manuals/flops-addon/internals/image-building-process"
>}}
