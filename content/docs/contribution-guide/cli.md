---
title: "CLI"
summary: ""
draft: false
weight: 401
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Report a Bug or Request a Feature

Go to the CLI Repository and create a new Issue.

{{< link-card
  title="CLI Repository"
  description="Explore the Source Code"
  href="https://github.com/oakestra/oakestra-cli"
  target="_blank"
>}}


## CLI Foundations
The `oak-cli` is built via [Poetry](https://python-poetry.org/) and [Typer](https://typer.tiangolo.com/).<br>
Typer is primarily powered by [Click](https://github.com/pallets/click) and [Rich](https://github.com/Textualize/rich).<br>
We highly recommend using and looking into Rich to ensure a user-friendly and appealing look and feel for the CLI.
Additionally, Typer heavily relies on the good and consistent use of [Python Type Hints](https://docs.python.org/3/library/typing.html).
Always stick to this convention to ensure smooth CLI and Typer workflows and behavior.

## Linting & Formatting
The CLI repository uses the same Python linting and formatting as the Oakestra repository.

## Philosophy
The `oak-cli` is a gateway to Oakestra and a multifaceted set of tools.<br>
Ensure high cohesion and low coupling by splitting unrelated/different parts into their own files and ["typer apps"](https://typer.tiangolo.com/tutorial/subcommands/add-typer/).
Use the static CLI configuration, local machine purposes, and their filters.
Users should always have access to generic/universal features - specialized features should only be available in fitting conditions/use-cases/environments.

## Local Development
For local development clone the CLI repository and install the CLI.
```bash {title="Example Command"}
pip install -e .
```
Create a new branch and create a Pull Request as usual.<br>
Note that the final/merged CLI changes always require a CLI version increase that has to be followed up by a matching tag.<br>

We configured an automatic CI (GitHub Actions) to build and release these changes.<br>
This CI will be triggered by a new tag.<br>
```bash {title="Example Commands"}
git tag -a vX.Y.Z -m "<New Custom Tag Message>"
git push origin vX.Y.Z
```
---

{{< callout context="tip" title="Did you know?" icon="outline/seeding" >}}
An initial Oakestra CLI was developed by Daniel Mair in his 2021 Bachelor's Thesis [Designing Robust Interaction Frontend for Decentralized Edge Infrastructures](https://www.nitindermohan.com/documents/student-thesis/Daniel_Mair_BT.pdf).
He extended this CLI slightly during his Interdisciplinary Project [Enhancement of the Oakestra User Interface](https://balancer.bbb.rbg.tum.de/playback/presentation/2.3/7b059d2730236bd8ec85443c4fd8bd0faa6f029d-1689771548724).
The current and first public version of the Oakestra CLI has been reimplemented from scratch by Alexander Malyuk during his 2024 Master's Thesis [FLOps: Practical Federated Learning via Automated Orchestration (on the Edge)](https://www.nitindermohan.com/documents/student-thesis/AlexanderMalyuk_MT.pdf).
{{< /callout >}}
