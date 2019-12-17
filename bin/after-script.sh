#!/bin/bash
set -e
# Bail early if this is a pull request.
if [[ $TRAVIS_PULL_REQUEST != "false" ]]; then
	exit 0
fi
# Only run deploys on VIP environments.
if [[ $TRAVIS_REPO_OWNER != "wpcomvip" ]]; then
	exit 0
fi
# Bail early if the script steps did not execute successfully (if any of the build steps failed).
if [[ $TRAVIS_TEST_RESULT != "0" ]]; then
	exit 1
fi
echo "Deploying the built branch ..."
# Perform the deploy.
bash <(curl -s "https://raw.githubusercontent.com/Automattic/vip-go-build/master/deploy-travis-prepare.sh") &&
bash <(curl -s "https://raw.githubusercontent.com/Automattic/vip-go-build/master/deploy.sh")
