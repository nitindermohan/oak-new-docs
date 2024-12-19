---
title: "Commit Hooks"
summary: ""
draft: false
weight: 403
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

<span class="lead">
Git hooks are scripts that run automatically at various points in the Git workflow (e.g., before committing or pushing changes). They help maintain code quality by performing tasks like linting, formatting, and testing before changes land in the repository. 
</span>

{{< callout context="tip" icon="outline/book" >}}
Learn more about Git hooks [here](https://git-scm.com/docs/githooks).
{{< /callout >}}

## Why Use Git Hooks?

Without automated checks, simple issues like linting errors can slip into the codebase, causing pipeline failures and unnecessary “fix-up” commits. By enforcing checks at commit or push time, we keep the commit history cleaner and ensure code quality from the start.

## Why Pre-commit?

By default, Git hooks live only on the local machine and aren’t shared with others. This means each developer would need to set them up manually. **Pre-commit** solves this problem by allowing you to define hook configurations in a shared `.pre-commit-config.yaml` file. Once committed to the repository, these configurations ensure every contributor runs the same hooks.

{{< callout context="note" icon="outline/info-circle" >}}
Despite the name, *pre-commit* can manage multiple hook types (such as `pre-push`). [Learn more about pre-commit](https://pre-commit.com/).
{{< /callout >}}

### Setting Up

1. **Install pre-commit**  
   
   ```bash
   pip install pre-commit
   # or
   brew install pre-commit  #if you are using macOS
   ```

2. **Install the hooks**  
   The Oakestra repository includes a `.pre-commit-config.yaml` file. To set up hooks that run before pushing changes, run:
   ```bash
   pre-commit install --hook-type pre-push
   ```

We chose pre-push to give developers flexibility. They can commit freely, fix linting issues before pushing, and avoid messy commit histories.

For more configuration details, visit the [official pre-commit documentation](https://pre-commit.com/).

## Contributing Code
When you’re ready to push your changes:

- Perform `git push` as usual.
- The configured `pre-push` hooks will run automatically, checking your code.
- If issues are found, the push will be aborted so you can fix them before retrying.

By integrating pre-commit hooks into our workflow we ensure consistent code quality and a cleaner commit history.







