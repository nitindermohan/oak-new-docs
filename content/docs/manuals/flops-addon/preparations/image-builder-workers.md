---
title: "Prepare Image-builder Workers"
summary: ""
draft: false
weight: 370
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

{{< callout context="caution" title="Requirements" icon="outline/alert-triangle">}}
  At least one orchestrated worker node has to be capable of building images for FLOps to work properly.
{{< /callout >}}

{{< callout context="tip" title="Optimize Image Build Times" icon="outline/rocket" >}}
  Building images is a significant part of any FLOps project, including its runtime.
  Select your worker nodes wisely for building images.
  To speed up runtimes, prefer more powerful resource-rich machines.
{{< /callout >}}

On the worker nodes where you wish to do the image building, do the following:
- Ensure the NodeEngine is running
  ```bash
    sudo NodeEngine -a <cluster-address> -d && sudo NodeEngine status
  ```
- Activate the `imageBuilder` addon for the NodeEngine:
  ```bash
    sudo NodeEngine config addon imageBuilder on
  ```
- Restart the NodeEngine
  - Either run `sudo NodeEngine stop` and then start it up again
  - Or run `sudo systemctl restart nodeengine.service` 
- Verify that the addon is active:
  ```bash
    > sudo NodeEngine config addon

    Configured Addons:
         - image-builder: 🟢 Active
  ```

{{< link-card
  title="Curious about the Image Building Process?"
  description="Explore why and how container images are build in FLOps." 
  href="/docs/manuals/flops-addon/internals/image-building-process"
  target="_blank"
>}}
