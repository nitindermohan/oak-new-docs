import sys
from pathlib import Path

# sys.path.append(str(Path(__file__).parent.parent))
sys.path.append(str(Path(__file__).parent.parent))
sys.path.append(str(Path(__file__).parent.parent.parent))
# sys.path.append(str(Path("/home/alex/oakestra-cli/docs/minimal_theme")))
# sys.path.append(str(Path("/home/alex/oakestra-cli")))


# sys.path.insert(0, str(Path(__file__).parent.parent / "oak_cli/main.py"))
# sys.path.insert(0, str(Path(__file__).parent.parent / "examples/example.py"))
# sys.path.insert(0, str(Path(__file__).parent.parent / "examples"))
# sys.path.insert(0, str(Path(__file__).parent / "examples" / "example.py"))
# from examples.example import app

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

extensions = ["sphinx.ext.autodoc", "sphinx.ext.napoleon", "sphinx_click", "sphinxcontrib.typer"]

templates_path = ["_templates"]
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

# html_theme = "alabaster"
# html_theme = "basic"
# html_theme = "sphinx_rtd_theme"
# html_theme = "tt"
# html_theme_path = [tibas.tt.get_path(), alabaster.get_path()]

# html_static_path = ["_static"]

html_theme = "minimal_theme"
html_theme_path = ["."]
# html_theme_path = ["/home/alex/oakestra-cli/docs/minimal_theme"]
# html_theme_path = ["/home/alex/oakestra-cli/docs/minimal_theme/theme.toml"]


html_theme_options = {
    "nosidebar": True,
}

html_sidebars = {}


# def setup(app):
#     import shutil
#     from pathlib import Path

#     if Path(app.doctreedir).exists():
#         shutil.rmtree(app.doctreedir)

# Deactivate all unecessary sphinx bits - we only want the CLI docs.

html_use_index = False
html_use_modindex = False
html_use_smartypants = False
html_search_language = None
html_add_permalinks = False
html_split_index = False
html_sidebars = {}
html_show_copyright = False

# html_theme_options = {
#     "search_bar_position": "navbar",
#     "show_nav_level": 0,
#     "navigation_depth": 0,
#     "collapse_navigation": True,
# }
# html_sidebars = {
#     "**": []
# }

# https://sphinx-rtd-theme.readthedocs.io/en/latest/configuring.html
# html_theme_options = {
#     "analytics_id": "G-XXXXXXXXXX",  #  Provided by Google in your dashboard
#     "analytics_anonymize_ip": False,
#     "prev_next_buttons_location": None,
#     "style_external_links": False,
#     "vcs_pageview_mode": "",
#     "style_nav_header_background": "white",
#     "flyout_display": "hidden",
#     "version_selector": False,
#     "language_selector": False,
#     # Toc options
#     "collapse_navigation": True,
#     "sticky_navigation": False,
#     "navigation_depth": 0,
#     "includehidden": False,
#     "titles_only": True,
#     "display_version": False,
#     "logo_only": True,
# }
