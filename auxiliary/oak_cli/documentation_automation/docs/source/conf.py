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

# templates_path = ["_templates"]
# html_static_path = ["_static"]
# html_css_files = ["pygments.css", "basic.css", "minimal_theme/static/custom.css"]
# html_css_files = ["pygments.css", "basic.css"]
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


def setup(app):
    app.connect("html-page-context", update_static_paths)


def update_static_paths(app, pagename, templatename, context, doctree):
    if "css_files" in context:
        new_css_files = []
        for css in context["css_files"]:
            if hasattr(css, "filename"):
                # This is a CascadingStyleSheet object
                css_path = css.filename
            else:
                # This is a string
                css_path = css

            # Remove '_static/' from the beginning if it's there
            if css_path.startswith("_static/"):
                css_path = css_path[8:]

            new_path = f"/automatically_generated_oak_cli_docs/_static/{css_path}"
            new_css_files.append(new_path)

        context["css_files"] = new_css_files

    if "script_files" in context:
        new_script_files = []
        for js in context["script_files"]:
            if hasattr(js, "filename"):
                # This is a JavaScript object
                js_path = js.filename
            else:
                # This is a string
                js_path = js

            # Remove '_static/' from the beginning if it's there
            if js_path.startswith("_static/"):
                js_path = js_path[8:]

            new_path = f"/automatically_generated_oak_cli_docs/_static/{js_path}"
            new_script_files.append(new_path)

        context["script_files"] = new_script_files
