---
title: "With the CLI"
description: "Deploy your app using the Oakestra CLI"
summary: ""
date: 2023-09-07T16:06:50+02:00
lastmod: 2023-09-07T16:06:50+02:00
draft: false
weight: 113
toc: false
sidebar:
  collapsed: false
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
asciinema: true
---

Besides using the API directly or clicking through the dashboard UI you can also use the Oakestra Command Line Interface to interact with Oakestra.

{{< callout context="caution" title="Requirements" icon="outline/alert-triangle">}}
- You have a running Root Orchestrator.
- You can access the APIs at `<IP_OF_CLUSTER_ORCHESTRATOR>:10000`
- You have read and familiarized yourself with the [API]({{< relref "deploy-api.md" >}}) and [Dashboard]({{< relref "deploy-api.md" >}}) approaches.
{{< /callout >}}

## The OAK CLI

The benefits of using this CLI are:
- Easy installation via pip
- Native Interface for the Oakestra APIs
  - Eliviates the need to use external thrid-party tools
- Accelerated & Simpler Workflows
  - Removes the need to memorize necessary API endpoints
  - Automates tedious tasks away
    - E.g. Aquiring the Login Token
  - The CLI commands can be chained together and used in custom scripts



## CLI Setup

You can install the CLI via `pip install oak-cli`.

When you run the CLI for the first time it will welcome you.

![OAK CLI Initial Welcome ASCII Art](./cli-images/welcome-message.png)

### Configurating the CLI

The OAK CLI supports a growing array of different scenarios based on the concrete Oakestra use case and user preferences.

This CLI initially hides many of its commands to avoid overwhelming new users.
Additionally, not every user is in need of every available command nor does every command make sense in all situation or environment.

To configure the set of shown commands run `oak configuration local-machine-purpose`.
The CLI will ask you a set of questions about your intended use and your target environment.
Based on your Yes/No responses it will provide you with the matching set of commands.

{{< asciinema key="cli_configuration_demo" poster="0:16" >}}

{{< callout context="note" title="FYI - Using Command Shortcuts" icon="outline/bolt" >}}
Most `oak` commands have shorter aliases that enable shorter commands and easier combinations, thus faster workflows.

E.g. Instead of typing out `oak configuration local-machine-purpose`. Simply run `oak c l`.

These shorter alias are shown directly in the `-h` output.
{{< /callout >}}



{{< callout context="note" title="Initial Configuration" icon="outline/info-circle" >}}
Configuring your OAK-CLI is recommended yet optional.

The 
{{< /callout >}}


## Basic CLI Usage

The root command for the CLi is `oak`.

{{< callout context="note" title="Need Help?" icon="outline/info-circle" >}}
Every `oak` CLI command comes with its own help text to support your understanding.

Simply add `--help` or `-h` to any command to find out more.
{{< /callout >}}


