---
title: "Prepare Learner Workers"
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
  For FLOps to work properly, at least one orchestrated worker node has to be capable of learning (performing machine learning).
{{< /callout >}}

{{< callout context="tip" title="Optimize Learning" icon="outline/rocket" >}}
  Training is the centerpiece of FLOps, not only conceptually but also computationally and runtime-wise.
  Select your learner nodes wisely.
  Prefer more powerful, resource-rich machines to speed up training times.
{{< /callout >}}

On the worker nodes where you wish to perform ML model training, do the following:
- Ensure the NodeEngine is running
  ```bash
    sudo NodeEngine -a <cluster-address> -d && sudo NodeEngine status
  ```
- Activate the `FLOps-learner` addon for the NodeEngine:
  ```bash
    sudo NodeEngine config addon FLOps-learner on
  ```
- Restart the NodeEngine
  - Either run `sudo NodeEngine stop` and then start it up again
  - Or run `sudo systemctl restart nodeengine.service` 
- Verify that the addon is active:
  ```bash
    > sudo NodeEngine config addon

    Configured Addons:
         - FLOps-learner: 🟢 Active
  ```

{{< link-card
  title="Curious about how learners handle and store data for training?"
  description="Explore how FLOps manages ML data for local training"
  href="/docs/manuals/flops-addon/internals/ml-data-management/"
  target="_blank"
>}}
