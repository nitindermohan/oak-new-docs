---
title: "CLI Overview"
summary: ""
draft: false
weight: 341
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

{{< callout context="caution" title="Requirements" icon="outline/alert-triangle">}}
  - You have carefully read [the application deployment with the `oak-cli`](/docs/getting-started/deploy-app/with-the-cli).
  - You are familiar with the basic setup, configuration, and usage of the CLI.
{{< /callout >}}

## The Root CLI Commands
These are the root **`oak-cli`** commands shown in the main `--help` output.
{{< include-sphinx-html "/static/automatically_generated_oak_cli_docs/index.html" >}}
Most root commands have their own set of subcommands.

### Setup 
{{< card-grid >}}

  {{< link-card
    title="Installer"
    href="/docs/manuals/cli/features/installer/"
    description="Set up necessary requirements the easy way."
  >}}

  {{< link-card
    title="Configuration"
    href="/docs/manuals/cli/features/configuration/"
    description="Configure the CLI to your liking."
  >}}

{{< /card-grid >}}

### Workload Components

{{< card-grid >}}

  {{< link-card
    title="Applications"
    href="/docs/manuals/cli/features/applications/"
    description="Interact with apps."
  >}}

  {{< link-card
    title="Services"
    href="/docs/manuals/cli/features/services/"
    description="Interact with services."
  >}}

{{< /card-grid >}}

### Addons

{{< card-grid >}}

  {{< link-card
    title="FLOps"
    href="/docs/manuals/cli/features/flops-addon/"
    description="Interact with the FLOps addon to perform practical federated machine learning."
  >}}

{{< /card-grid >}}


### Developing Oakestra

{{< card-grid >}}

  {{< link-card
    title="Development"
    href="/docs/manuals/cli/features/development/"
    description="Accelerate local docker based Oakestra development."
  >}}

  {{< link-card
    title="Worker Node"
    href="/docs/manuals/cli/features/worker-node/"
    description="Manage your local worker node."
  >}}

{{< /card-grid >}}


---

{{< link-card
    title="The CLI in action"
    description="Use the CLI to deploy your first Oakestra app."
    href="/docs/getting-started/deploy-app/with-the-cli/"
>}}
