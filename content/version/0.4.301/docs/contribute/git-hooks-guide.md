---
title: "Contributor Git Hooks Guide"
draft: false
---

# Integrating Pre-commit into Our Development Workflow

## Overview

Git hooks are scripts that Git executes before or after events such as: pre-commit, pre-push. These hooks are a powerful part of the Git ecosystem, enabling custom actions based on the current repository state or the changes being committed. They are used for a variety of tasks such as syntax checking, testing, linting, and auto-formatting code before it is committed or pushed. More information on git hooks is found [here](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

### Why Git hooks

Git pipelines often fail because of linting issues, which then requires another commit to fix it, leaving the history of commits just filled with "liniting fix".

## Why `pre-commit`

Git hooks are not shared across the repo, and it's only available locally. This means every developer will need to implement their own hooks. Hence we use a tool called `pre-commit`. Through this tool, developers define a configuration file that is commited to the repository, ensuring that all contributors have access to the same hook configurations.

*Note that the tool name, `pre-commit`, is misleading as it implies it only provides pre-commit hooks, however it also provides other stages/hooks such as `pre-push`.*
More information on the tool can be found [here](https://pre-commit.com/)


## Setting Up:

1. First, ensure that you have pre-commit installed. It can be installed via pip or Homebrew (for macOS users):

```sh
pip install pre-commit
# or
brew install pre-commit
```

2. **Install the git hooks scripts**:
In the Oakestra repo, there is a file called `.pre-commit-config.yaml` containing git hooks. They can be installed by running:
```sh
pre-commit install --hook-type pre-push
```
Note: `--hook-type` specifies the the type of hook. In our case we want to do the checks before pushing to remote repo. Our team felt that git hook type `pre-push` offers a good compromise, where developers just want to commit anyways but not yet push and just fix the linting issues later. With `pre-push` hook users avoid force pushing and can just squash their changes locally and do a normal push.

For more information on how to configure this file visit the [official website](https://pre-commit.com/) of the tool.


## Contributing Code

When you're ready to contribute code, simply add your changes and push as you normally would. The pre-push hooks will automatically run, checking your code against the configured linters. If any issues are found, the push will be aborted, and you will need to fix the issues before retrying the push.