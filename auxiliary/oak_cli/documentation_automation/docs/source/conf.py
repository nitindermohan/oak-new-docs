# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = "OAK-CLI"
copyright = "2024, Alexander Malyuk"
author = "Alexander Malyuk"
release = "v0.4.4"

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.napoleon",
    "sphinx_click",
    "sphinxcontrib.typer",
]

templates_path = ["_templates"]
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "minimal_theme"
html_theme_path = ["."]

html_theme_options = {
    "nosidebar": True,
}

html_sidebars = {}


# Deactivate all unecessary sphinx bits - we only want the CLI docs.
html_use_index = False
html_use_modindex = False
html_use_smartypants = False
html_search_language = None
html_add_permalinks = False
html_split_index = False
html_sidebars = {}
html_show_copyright = False
