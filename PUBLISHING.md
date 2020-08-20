# Publishing Irving
These are notes and guidelines for publishing the Irving NPM packages. This will mostly apply to those on the Alley team with NPM credentials.

**IMPORTANT NOTES**:
In order to publish you will need to:
* Create GitHub authentication token (under Settings > Developer settings > Personal access tokens). Once you have your token token, create a `.env` file at the root of the cloned Irving repo and assign it to a `GH_TOKEN` environmental variable.
* Log in to Alley's npm account via `npm adduser` to gain publish permissions. If you are unsure of how to do this, ask Owen.

## Available NPM scripts
* `npm run prerelease:canary` - publish a prerelease to npm. This will use the npm `@canary` tag using the `-alpha` prerelease identifier. Publish to the `@canary` tag from the `master` branch after doing a CR/PR from your feature branch. Because this is the alpha tag, don't worry about publishing something broken.
* `npm run prerelease:beta` - publish a prerelease to both git and npm. This will use the npm `@beta` tag using the `-beta` prerelease identifier. Publishes to the `@beta` tag don't need to be 100% stable, but should indicate all the major feature development for a release is finished and you're ready to start adding some polish. Beta releases should be made from a `release/*` branch.
* `npm run prerelease:rc` - publish a release candidate to both git and npm. This will use the npm `@rc` tag using the `-rc` prerelease identifier. Publishes to the `@rc` tag should be considered stable. This is the last check before publishing a new, stable release. Ideally, multiple folks at Alley should install and try out this code before a stable release. Release candidates should be made from a `release/*` branch.
* `npm run release` - publish a stable release to the npm `@latest` tag. Stable releases should be made from a `release/*` branch.

## Sample Workflow for developing features
* `git checkout -b feature/issue-17/branch-title` - create a new feature branch based on `master`. If your branch relates to a specific GitHub issue, reference that issue in your branch name (and all subsequent commits).
* Work on your branch locally using linked packages. If you haven't already, use the [set up process](CONTRIBUTING.md#set-up-process) in the contributing documentation to prepare your local environment.
* Once you’re satisfied with your code, open up a pull request to the `master` branch.
* Get a peer code review on your pull request into `master` and, once approved, merge it into `master` when ready.
* `git checkout master && git pull origin master` - checkout `master` and pull down your newly-merged code.
* `npm run prerelease:canary` - draft an alpha release, then install and verify it in your project, being sure to unlink any linked packages.
* When you're satisfied, notify the designated release organizer that your feature is ready to move to beta.

## If you need to release a patch or hotfix
* `git checkout release/[version]` - check out the release branch for which you need to make a patch.
* `git checkout -b bug/bug-description` - check out a new branch for your patch or hotfix.
* Work on your branch locally using linked packages. If you haven't already, use the [set up process](CONTRIBUTING.md#set-up-process) in the contributing documentation to prepare your local environment.
* Once you’re satisfied with your code, open up a pull request to the `release/[version]` branch.
* Get a peer code review on your pull request into the `release/[version]` and, once approved, merge it into `release/[version]` when ready.
* `npm run prerelease:beta` - create a new beta release from the `release/[version]` branch and test it locally.
* `npm run release` - when ready, release your patch on the `release/[version]` branch.
* `git checkout master && git merge bug/bug-description && git push origin master` - update master with your patch code, or ask the designated release organizer to do so for you.

## If you're the current release organizer
* Take stock of all features that will be going into this release. Verify with feature developers that those features are ready to move to beta. The schedule for when this happens may vary—coordinate with the team.
* When ready, break off a new branch for the release using the format `release/[version]`. Example: `release/3.2.0`
* `npm run prerelease:beta` - Create a beta from the release branch immediately for testing. Ask feature developers to install beta and test their feature (and do tests yourself as well).
* `npm run prerelease:rc`- Close to release deadline, publish a new release to the `@rc` tag in npm from the release branch. Test again.
* When ready, call attention to your upcoming release. This is an opportunity to have a conversation with others about code they might also want to release or objections they might have to releasing your code.
* `npm run release` - Create a stable release from your release branch.
* `git checkout master && git merge release/[version] && git push origin master` - update master with your release code.
* Leave your release branch open in case we need to patch that version in the future.

## Tips and Gotchas
* **Important:** After creating a `release` branch, never merge master into that branch again. Release branches should remain stagnant unless a patch needs to be introduced.
* In prior versions of this document (and prior release processes) we made use of a `develop` branch. This branch is no more! Please don't merge into or make releases from `develop`.
* Please read about [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) before publishing. The type of commit you choose will have ramifications on the semver version number you release. For example, a type of `fix` will indicate a `patch` release, a type of `feat` will indicate a `minor` release.
* Canary releases may become a bit off. If you find this is happening, you can run `git checkout develop && git rebase --onto master develop`, then force push to the remote `develop` branch. This should get canary releases back up to date.
* When you want to test out a newly published package, don't forget the npm tag. For example, for a canary release, run `npm install @irvingjs/core@canary --save-dev`.
* If lerna hangs on `Creating Releases...` or `Skipping Releases...` just use `ctrl + C` to get it to continue with the release.
* When commitizen kicks in for a merge, choose `chore` for the type, `merge` for the scope, and `merge` for the commit message. Everything else can be skipped.
