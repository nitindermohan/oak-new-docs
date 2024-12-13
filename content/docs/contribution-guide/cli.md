---
title: "Command Line Interface (CLI)"
summary: ""
draft: false
weight: 405
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
  description="Explore the source code"
  href="https://github.com/oakestra/oakestra-cli"
  target="_blank"
>}}


## CLI Foundations
The `oak-cli` is built via [Poetry](https://python-poetry.org/) and [Typer](https://typer.tiangolo.com/).
Typer is primarily powered by [Click](https://github.com/pallets/click) and [Rich](https://github.com/Textualize/rich).
We highly recommend using and looking into Rich to ensure a user-friendly and appealing look and feel for the CLI.
Additionally, Typer heavily relies on the proper and consistent use of [Python Type Hints](https://docs.python.org/3/library/typing.html).
Always stick to this convention to ensure smooth CLI and Typer workflows and behavior.

## Linting & Formatting
The CLI repository uses the same Python linting and formatting as the Oakestra repository.

## Philosophy
The `oak-cli` is a gateway to Oakestra and a multifaceted set of tools.
Ensure high cohesion and low coupling by splitting unrelated/different parts into their own files and ["typer apps"](https://typer.tiangolo.com/tutorial/subcommands/add-typer/).
Use the static CLI configuration, local machine purposes, and their filters.
Users should always have access to generic/universal features - specialized features should only be available in fitting conditions/use-cases/environments.

## Local Development
For local development clone the CLI repository and install the CLI.
```bash
pip install -e .
```
Create a new branch and create a Pull Request as usual.
Note that the final/merged CLI changes always require a CLI version increase that has to be followed up by a matching tag.

We configured an automatic CI (GitHub Actions) to build and release these changes.
This CI will be triggered by a new tag.
```bash
git tag -a vX.Y.Z -m "<New Custom Tag Message>"
git push origin vX.Y.Z
```
