#!/bin/bash
set -e

echo "Publishing to NPM ..."

# Set origin to use alle-ci user with a GH token
git remote set-url origin https://alley-ci:$GH_TOKEN@github.com/alleyinteractive/irving.git
# Add NPM token to npmrc
echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc
git checkout main
npm ci
npm run prerelease:canary:ci
# Oh well, do this later: npm run storybook:release