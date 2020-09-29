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

# Set origin to use alle-ci user with a GH token
git remote set-url origin https://alley-ci:$GH_TOKEN@github.com/alleyinteractive/irving.git
# Add NPM token to npmrc
echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc
git checkout master
npm run prerelease:canary:ci
npm run storybook:release