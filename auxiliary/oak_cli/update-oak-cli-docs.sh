#!/bin/bash

# NOTE: This is a shortcut cmd that is defined in package.json
# It can be run like this: 'npm run update-oak-cli-docs'

SCRIPT_PATH="${BASH_SOURCE[0]}"
AUTO_DOC_PATH="$(dirname "${SCRIPT_PATH}")/documentation_automation"
AUTO_DOCS_DIR_NAME="automatically_generated_oak_cli_docs"
ARCHIVE_NAME="oak_docs_html_files.tar.gz"

cd "${AUTO_DOC_PATH}"
docker build -t oak-cli-documentation-automator .
docker run -d --name oak-cli-docs-automator oak-cli-documentation-automator sleep infinity
# NOTE:
# It seems to be the case that it is necessary to set the local-machine-purpose to everything to unlock all commands.
# Only then the docs-generator can generate the API for every command.
# Might need rework.
docker exec oak-cli-docs-automator bash -c "
    pip install --upgrade oak-cli &&
    oak v --no-show-logo &&
    oak c l --purpose everything &&
    sphinx-build -M html docs/source docs/build &&
    . reformat_html.sh &&
    cd docs/build/html &&
    tar -czvf '/tmp/${ARCHIVE_NAME}' .
"

cd "../../../static/${AUTO_DOCS_DIR_NAME}"
current_dir_name=$(basename "$PWD")
[ "${current_dir_name}" == "${AUTO_DOCS_DIR_NAME}" ] && rm -fr *
docker cp "oak-cli-docs-automator:/tmp/${ARCHIVE_NAME}" .
docker rm -f oak-cli-docs-automator
tar -xzvf "${ARCHIVE_NAME}"
rm -f "${ARCHIVE_NAME}"
# Ensure only the necessary files remain.
rm -rf _sources
find . -type f \
    -not \( -path '*/_static/*' -o -name '*.html' -o -name '*.js' \) \
    -delete
