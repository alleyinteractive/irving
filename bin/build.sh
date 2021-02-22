if [[ $BUDDY_EXECUTION_REVISION_MESSAGE == "chore(release): publish" ]]; then
    exit 0
else
    echo "Publishing to NPM ..."

	# Configure git and checkout main branch
	git config user.email "ops+alleyci@alleyinteractive.com"
	git config user.name "alley-ci"
	git remote set-url origin https://alley-ci:$GH_TOKEN@github.com/alleyinteractive/irving.git
	git checkout main

	# Add NPM token to npmrc
	echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc

	# Perform publish
	npm ci
	npm run develop:bootstrap
	npm run prerelease:alpha:ci
fi