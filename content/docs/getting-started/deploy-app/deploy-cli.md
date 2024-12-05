---
title: "With the CLI"
description: "Deploy your app using the Oakestra CLI"
summary: ""
date: 2023-09-07T16:06:50+02:00
lastmod: 2023-09-07T16:06:50+02:00
draft: false
weight: 113
toc: true
sidebar:
  collapsed: false
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
asciinema: true
---

<span class="lead">
Besides using the API directly or clicking through the dashboard UI, you can also interact with Oakestra using the Command Line Interface (`oak-cli`).
</span>

{{< callout context="caution" title="Requirements" icon="outline/alert-triangle">}}
  - You have a running Oakestra setup.
  - You can access the APIs at `<IP_OF_CLUSTER_ORCHESTRATOR>:10000`
{{< /callout >}}


{{< callout context="note" title="Benefits of `oak-cli`" icon="outline/rocket">}} 

- Easy installation via `pip`
- Native interface for the Oakestra APIs
  - Eliminates the need to use external third-party tools
- Accelerated & simpler workflows
  - Removes the need to memorize necessary API endpoints
  - The CLI commands can be chained together and used in custom scripts
  - Automates tedious tasks away (e.g. acquiring login token)
{{< /callout >}}

  


## CLI Setup
You can install the CLI via `pip install oak-cli`. 

{{< callout context="note" title="Helpful tip!" icon="outline/info-circle" >}}
  You may need to setup a Python virtual environment first to avoid conflicts with other Python packages.
  ```bash
  python3 -m venv venv

  source ~/venv/bin/activate
  ```
{{< /callout >}}

Execute `oak` and you will be welcomed into the Oakestra CLI world 🌎

![`oak-cli` Initial Welcome ASCII Art](./cli-images/welcome-message.png)


### Configurating the CLI
The `oak-cli` supports different scenarios based on the concrete Oakestra use case and user preferences.

This CLI initially hides many of its commands to avoid overwhelming new users.
Additionally, not every user needs every available command, and not every command makes sense in every situation or environment.

To configure the set of shown commands run `oak configuration local-machine-purpose`.

{{< callout context="note" title="FYI - Using Command Shortcuts" icon="outline/bolt" >}}
  Most `oak` commands have aliases that enable shorter commands and easier combinations, thus faster workflows.

  E.g. Instead of typing out `oak configuration local-machine-purpose`.
  Simply run `oak c l`.

  The available aliases are shown directly in the `-h` output.
{{< /callout >}}

The CLI will ask you a set of questions about your intended use and your target environment.
Based on your Yes/No responses it will provide you with the matching set of commands.
{{< asciinema key="cli_configuration_demo" poster="0:16" >}}

This configuration is persistently stored on your machine.

Configuring your `oak-cli` is optional yet highly recommended.
You can always revert your configuration to its initial state.

For further information about the CLI configuration see the [CLI Configuration Manuals](/docs/manuals/cli/features/configuration).


## Basic CLI Usage
The root command for the CLI is **oak**

{{< callout context="note" title="Need Help?" icon="outline/info-circle" >}}
  Every `oak` CLI command comes with its own help text to support your understanding.

  Simply add `--help` or `-h` to any command to find out more.
{{< /callout >}}


### Working with Application SLAs
As detailed in the [API Approach]({{< relref "deploy-api.md" >}}) Oakestra apps and services are defined in SLAs.<br>
The `oak-cli` comes with a set of pre-defined default SLAs.<br>
All available SLAs can be inspected via the `oak application sla` command.
{{< asciinema key="cli_sla_inspect" poster="0:16" >}}

All SLAs are stored in your home directory in the `oak_cli` folder.
It gets automatically created when you install the CLI.

```bash {frame="none"}
~/oak_cli
├── ...
└── SLAs
    ├── blank_app_without_services.json
    ├── default_app_with_services.json
    └── mysla.json
```

To modify or add new custom SLAs just modify the content of your `~/oak_cli/SLAs` folder.
E.g. The `mysla.json` is a custom SLA that we added after installing the CLI.


### Managing Applications
Now that you are familiar with the SLAs we can start creating applications based on them.<br>
Run `oak application show` (`oak a s`) to see the currently orchestrated applications.<br>
The `oak application create` (`oak a c`) command asks you what SLA should be used as the blueprint for the new application and creates that app for you.<br>
Delete one or all currently running apps via `oak application delete` (`oak a d`).
{{< asciinema key="cli_create_default_app_demo" poster="0:10" >}}


### Deploying Services
The services of our applications are not yet deployed.<br>
To deploy instances of these services we need to know the service IDs.<br>
The IDs are visible when running `oak service show` (`oak s s`).<br>
Click on your desired Service ID value in the Service ID column and copy it via `Ctrl+C`.<br>
To deploy a new instance run `oak service deploy <YOUR_SERVICE_ID>`.
{{< asciinema key="cli_minimal_service_demo" poster="0:13" >}}

You can undeploy all instances of a service or only specific ones by providing the appropriate command option: <br>
`oak service undeploy --service-id <YOUR_SERVICE_ID> / --instance-id <INSTANCE_ID>`.

{{< callout context="note" title="Combine Create & Deploy" icon="outline/bolt" >}}
  You can create an application and automatically deploy its services by providing the `-d` *(for deploy)* flag to the `oak app create (-d)` command. 
{{< /callout >}}

{{< callout context="note" title="Advanced Observation Features " icon="outline/eye" >}}
  You can display apps and services with different levels of verbosity/detail and automatically refresh the display to stay in the know about the latest changes.
  ![Detailed Service Display](./cli-images/detailed_service_display.png)
  You can even display and automatically follow the latest service logs.
  ![Inspected Service](./cli-images/inspect_service.png)

  For further details and recorded examples see the [CLI Services Manuals](/docs/manuals/cli/features/services).
{{< /callout >}}


## Further Details
This page only highlights a small subset of available `oak-cli` capabilities.

{{< link-card
  title="CLI Manuals"
  description="Explore every available CLI command in detail and more"
  href="/docs/manuals/cli/overview"
  target="_blank"
>}}

{{< callout context="note" title="Maximize Speed & Convenience" icon="outline/bolt" >}}
  The `oak-cli` is powered by [Typer](https://github.com/fastapi/typer) which supports tab autocompletion natively.

  This means that you can press your **tab** key to either automatically complete the command you are currently typing or get a list of matching available commands.
  There is no need to memorize or fully type out the commands.

  ![Command Recommendation via Tab Auto-Completion](./cli-images/autocomplete.png)

  Simply run `oak --install-completion` to enable this feature.
{{< /callout >}}
