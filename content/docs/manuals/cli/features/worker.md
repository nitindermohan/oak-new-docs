---
title: "Worker Node"
summary: ""
draft: false
weight: 349
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

{{< callout context="note" title="Overview" icon="outline/info-circle" >}}
  Oakestra services are deployed and executed as [containerd](https://containerd.io/) containers on the worker nodes.
  Containerd uses a different local container/image context/space than, e.g., Docker.

  During service deployments, your local containerd images are checked.
  If the requested image is already present, it will be reused instead of pulled from the image registry.
  The downside here is that if you are developing such images with identical tags, the outdated local images are used instead.

  To ensure that the latest registry images are used, one can clear one’s local containerd images.
  Doing so via the native [ctr](https://github.com/projectatomic/containerd/blob/master/docs/cli.md) tool can be tedious, especially because ctr is very minimal and does not support deleting all images easily at once.

  The `oak-cli` provides a custom ctr command to clear all containerd images on your machine, thus enabling you to quickly regain a clean state to experiment and develop images with Oakestra.
{{< /callout >}}

{{< include-sphinx-html "/static/automatically_generated_oak_cli_docs/worker.html" >}}
