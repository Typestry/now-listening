#!/usr/bin/env bash
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
echo $PACKAGE_VERSION