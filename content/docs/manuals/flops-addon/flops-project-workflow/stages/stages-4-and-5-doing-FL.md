---
title: "Stages 4 & 5: Doing FL"
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

The FLOps manager tries to lookup matching container images for learners and aggregaters.
The manager checks for images in the FLOps image registry (*part of the management suite*) that match the ML repository that was part of the requested project SLA. 

If a match was found there is no need to build redundant images and the project goes straight to stage 4.

## Stage 4: FL-Actors Deployment

In case images for **FL Actors** *(learners & aggregators)* using the requested ML repository are missing the manager creates and deploys a single image-builder service.
This buider service is exclusive to its originating project.

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
  - Deciding if new images need to be build requires querying the remote ML Git repository as well as the FLOps image registry.
  - The image builder service can only run on worker nodes with the `image-builder` addon enabled.
  - Deploying the large image builder service *(pulled size ~3GB)* can take time.
{{< /callout >}}

## Stage 5: FL Training

In stage 3 the deployed image-builder service builds the requested images for the learner and aggregator services.

{{< callout context="danger" title="Critical" icon="outline/alert-octagon" >}}
  Building (multi-platform) images for ML/FL dynamically based on flexible user-provided repositories is a delicate and error prone business.

  Building images can take up a significant part of the entire project duration - especially if training itself is lightweight *(fast / few rounds)*.

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

{{< link-card
  title="Want to know more about the image building process?"
  description="Learn why and how container images are build in FLOps." 
  href="/docs/manuals/flops-addon/internals/image-building-process"
>}}

