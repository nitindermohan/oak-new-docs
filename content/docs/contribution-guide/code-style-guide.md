---
title: "Code Style Guide and Tools"
summary: "Oakestra code style guide and tools for maintaining high-quality, readable code"
draft: false
weight: 402
toc: true
seo:
  title: "Oakestra code style guide" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## High-Quality Code: A Shared Understanding

Spending additional time to write high-quality, readable code is crucial for success in software engineering. Clear and easily comprehensible code not only saves time during development but also simplifies onboarding and collaboration.

In case you are interested, we recommend the following reads for improving your code quality.
- [You Spend Much More Time Reading Code Than Writing Code](https://bayrhammer-klaus.medium.com/you-spend-much-more-time-reading-code-than-writing-code-bc953376fe19)
- [Google Python Style Guide: Block and Inline Comments](https://google.github.io/styleguide/pyguide.html#385-block-and-inline-comments)
- [Google Python Style Guide: Punctuation, Spelling, and Grammar](https://google.github.io/styleguide/pyguide.html#386-punctuation-spelling-and-grammar)

## Why Follow a Code Style Guide?

A shared code style ensures:
- Uniform and high-quality code that is easier to understand and maintain.
- Simplified onboarding for new team members.
- Fewer errors caused by inconsistencies.

To align with industry standards and avoid reinventing the wheel, we adhere to **PEP 8** ([Python Enhancement Proposal 8](https://peps.python.org/pep-0008/)).

## Tools for Code Style Enforcement

To make following these guidelines easier, we use the following established, production-grade tools.

{{< card-grid >}}
{{< link-card title="Black" description="Code formatter for syntax." href="https://github.com/psf/black" >}}
{{< link-card title="Flake8" description="Linter for semantics." href="https://flake8.pycqa.org/en/latest/" >}}
{{< link-card title="isort" description="Import sorter." href="https://github.com/PyCQA/isort" >}}
{{< /card-grid >}}

We’ll demonstrate how to install, use, and automate these tools in your terminal and IDE.

### Black

Black is a Python code formatter that enforces a consistent style by automatically adjusting your code to match its uncompromising formatting rules. It ensures uniformity and saves time by eliminating manual formatting efforts.

#### Installation
```bash
pip install black
```

#### Terminal Usage

Run Black on files or directories:
```bash
black --line-length 100 .
```

To preview changes without modifying files:
```bash
black --line-length 100 --check --diff --color .
```

{{< callout context="note" icon="outline/info-circle" >}}
We recommend setting the line length to 100 for better readability.
{{< /callout >}}

Now you can integrate Black into your favorite IDE. We will show you how to do this in VSCode and PyCharm.

{{< tabs "integrate-ide" >}}
{{< tab "VSCode" >}}

1. Install the [**Black Formatter**](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter) extension from Microsoft.
2. Open **Settings**.
3. Enable **Editor: Format On Save**.
4. Set **Black Formatter** as the default formatter.

{{< /tab >}}
{{< tab "PyCharm" >}}

1. Install the [**BlackConnect**](https://plugins.jetbrains.com/plugin/14321-blackconnect) plugin.
2. Install `blackd` via pip.
3. Run `blackd` to start the Black server.
4. Configure PyCharm to use `blackd` for formatting and enable auto-formatting on file save.
   
   a) Run Black on file save and refactor.
   ![PyCharm BlackConnect](blackd_save.png)

   ![PyCharm BlackConnect](blackd_settings.png)

   b) If you want the plugin to start the `blackd` connection on IDE startup, make sure to provide the path to your local blackd installation.
   ![PyCharm BlackConnect](blackd_settings_plus.png)

You can then trigger the black formatting by pressing  `Alt + Shift + B`.
{{< /tab >}}
{{< /tabs >}}

### Flake8

Flake8 is a Python linting tool that analyzes code for style guide enforcement, logical errors, and potential bugs. It provides detailed error codes to help maintain code quality and adherence to standards like PEP8.

#### Installation
```bash
pip install flake8
```

#### Terminal Usage
Using Flake8 is very similar to using Black. Unlike Black however, Flake8 cannot fix its found issues on its own because semantics are a lot more complex than syntax.
```bash
flake8 --max-line-length=100 .
```
Now you can integrate Flake8 into your IDE. 

{{< tabs "integrate-ide" >}}
{{< tab "VSCode" >}}

1. Install the [**Flake8**](https://marketplace.visualstudio.com/items?itemName=ms-python.flake8) extension from Microsoft.
2. Flake8 will highlight errors in the code and display error codes when you hover over them.
![flake8](flake8_vscode_example.png)

{{< /tab >}}
{{< tab "PyCharm" >}}
While PyCharm lacks native support for Flake8, the following resources may help integrate it.

- [Flake8 for PyCharm](https://pypi.org/project/flake8-for-pycharm/)
- [GitHub Gist: Flake8 in PyCharm](https://gist.github.com/tossmilestone/23139d870841a3d5cba2aea28da1a895)

{{< /tab >}}
{{< /tabs >}}

### isort

`isort` is a Python utility that automatically sorts and organizes imports in your code according to defined standards. It improves code readability and maintains consistency by grouping and ordering imports logically.

#### Installation
```bash
pip install isort
```

#### Terminal Usage
`isort` behaves very similar to Black. It can automatically perform adjustments or run in “check-only” mode. To adjust imports automatically, run the following command.
```bash
isort .
```

To check for changes without modifying files:
```bash
isort --check-only --diff --color .
```
Integrate `isort` into your IDE workflow as follows.

{{< tabs "integrate-ide" >}}
{{< tab "VSCode" >}}

Install the [**isort**](https://marketplace.visualstudio.com/items?itemName=ms-python.isort) extension from Microsoft to automatically sort imports on file save.

{{< /tab >}}
{{< tab "PyCharm" >}}
While PyCharm doesn’t natively support `isort`, you can manually configure import settings to align with isort’s behavior.
![isort](isort_import_settings.png)

{{< /tab >}}
{{< /tabs >}}
