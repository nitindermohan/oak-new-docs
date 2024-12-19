---
title: "Development"
summary: ""
draft: false
weight: 345
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

{{< callout context="note" title="Overview" icon="outline/info-circle" >}}
  Oakestra is split into several docker compose files, each containing multiple containers.
  When developing, only a couple of components/containers are usually changed at a given time.
  We noticed that many developers were wasting precious time by restarting/rebuilding entire docker-compose suites or even the entire cluster to see their changes take effect.

  To speed up this process, `oak-cli` provides a set of commands to easily restart and rebuild individual containers.
  To ensure every change is considered, use the rebuild command with the `--cache-less` flag.
{{< /callout >}}

{{< callout context="tip" title="Did you know?" icon="outline/rocket" >}}
  You can chain multiple `oak-cli` commands together and run them ad-hoc in the terminal or via scripts to build your own custom automated workflows.

  E.g.
  You are developing the system manager in the root orchestrator. You can use the following to see your changes take effect quicker.

  ```bash
    # Delete all current apps and services.
    oak a d -y &&\
    # Rebuild and restart the system manager.
    oak d ro rebuild --cache-less system_manager &&\
    # Sometimes chained commands are too quick for Oakestra.
    # Simply add sleep commands to give it time to catch up.
    # sleep 2 &&\
    #
    # Create and deploy the default app with services.
    oak a c -d --sla-file-name default_app_with_services.json
  ```
{{< /callout >}}

{{< include-sphinx-html "/static/automatically_generated_oak_cli_docs/development.html" >}}
