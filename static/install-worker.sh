#!/bin/bash

#If version not set, use latest version
if [ -z "$OAKESTRA_VERSION" ]; then
    OAKESTRA_VERSION=$(curl -s https://raw.githubusercontent.com/oakestra/oakestra/main/version.txt)
fi
curl -sfL https://raw.githubusercontent.com/oakestra/oakestra/$OAKESTRA_VERSION/scripts/InstallOakestraWorker.sh | OAKESTRA_VERSION=$OAKESTRA_VERSION sh -