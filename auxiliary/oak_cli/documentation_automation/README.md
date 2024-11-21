# Motivation
We want to provide a detailed overview of available commands.<br>
Keeping up documentation with rapidely changing software like CLIs can be challenging.<br>
To streamline this process we automatically generate the command (help) documentation via sphinx and embed the generated html files directly in markdown.<br>
For this simply run `npm run update-oak-cli-docs`.

## General Advice
If you want to adjust the look/feel of the generated bits modify the `minimal_theme` content.

## Sphinx commands for local testing and debugging
- `sphinx-build -M html docs/source docs/build`
- `sphinx-autobuild docs/source docs/build/html`
