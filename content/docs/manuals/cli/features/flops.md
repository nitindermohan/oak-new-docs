---
title: "FLOps Addon"
summary: ""
draft: false
weight: 346
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

{{< callout context="note" title="Overview" icon="outline/info-circle" >}}
  Oakestra supports addons via its addon marketplace.

  The FLOps addon enables practical application-oriented federated machine learning.
  It automates ML/FL duties for the user by building on top of DevOps and MLOps concepts, including:
  - Handling the setup and configuration of the ML environment by building multi-platform container images.
  - Scheduling and handling FL learners and aggregators - performing the FL training.
  - State-of-the-art observability capabilities via a modern browser-based GUI.
  - Providing the trained model for pulling and automatic deployment as an inference server.
  - Allow users to customize their FL by specifying various aspects ranging from training rounds to their FL strategy.

  Note that FLOps is not yet available in the marketplace.

  The `oak-cli` acts as an interface to the FLOps addon.
{{< /callout >}}

{{< link-card
    title="Want to know more about FL and FLOps?"
    description="Have a look at the dedicated Federated Learning Documentation"
    href="/docs/concepts/flops/overview/"
>}}

{{< include-sphinx-html "/static/automatically_generated_oak_cli_docs/flops.html" >}}
