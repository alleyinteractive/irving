#!/bin/bash
set -e

# Bail early if this is a pull request.
if [[ $TRAVIS_PULL_REQUEST != "false" ]]; then
	exit 0
fi

# Bail early if the script steps did not execute successfully (if any of the build steps failed).
if [[ $TRAVIS_TEST_RESULT != "0" ]]; then
	exit 1
fi

echo "Publishing to NPM ..."

git config --global user.email "ops+alleyci@alleyinteractive.com"
git config --global user.name "Alley CI"

git checkout master
npm ci
npm run prerelease:canary