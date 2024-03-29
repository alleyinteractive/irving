# Contributing to Irving
This document is intended to make contributing to this project easier, more transparent, and more standardized.

## Preparing your environment for contributing to Irving
### Important Notes before you begin setup
* Before publishing any release manually, you will need to authenticate your machine to use the `alleyops` npm account by running `npm adduser` and following the prompts. Credentials for the account can be found in the Alley Leads 1Password vault.
* If you are publishing a `beta`, `rc`, or stable release, you will also need to have a valid `GH_TOKEN` in your Irving `.env` file. In Github, create your token under [account > Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens). Then create a `.env` file at the root of the cloned Irving repo and assign it to a `GH_TOKEN` environmental variable. It'll look like this:
`GH_TOKEN=asfh8aa3h49oqwh2398yhfiosds89as7df`
**NOTE:** The project in which you are testing your Irving changes must be on at least Irving `3.1.0` for this setup process to work properly.

### Setup Steps
1. Fork or clone the Irving repo.
2. `git checkout main` - Check out the main branch.
3. `npm run develop:prepare` - If you have run this script in the past, you can skip this step. Run this at the root of the Irving repo to prepare the irving repo for development. **IMPORTANT NOTE** this script is memory intensive and may take time, but you should only ever need to run it once. Get up and make yourself some coffee or a cocktail and just let it run! This script will:
  * Run `npm install`.
  * Run `npm link` within all Irving packages to create global symlinks. (see [docs on npm link](https://docs.npmjs.com/cli/link))
  * Clean up `node_modules` within each package
  * Run `lerna bootstrap` to install and hoist dependencies for all packages, then link interdependent Irving packages together.
  * **NOTE:** If you run into an error attempting to run this script, try running `develop:cleanup` first then attempt to run `develop:prepare` again.
4. `npm install && npx irving link-all` - In the project where you'll be testing out your changes, run these commands to symlink all installed Irving packages.
5. A couple troubleshooting tips:
* If you run into errors with linked packages, especially errors related to missing imports, first try `npm run develop:bootstrap` and, if that doesn't work, `npm run develop:setup` in the irving repo root. Your problems should be solved.
* If you'd like to unlink all irving packages, run `npm install` in the root of your project.
* If you'd like to re-link all irving packages, run `npx irving link-all` in the root of your project.

## Commitizen
This project uses [Commitizen](https://github.com/commitizen/cz-cli) and [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog) to standardize commit messages and changelogs. This means when you enter `git commit` to commit your code you will see a (maybe) unfamiliar, interactive series of questions. These questions will result in a standardized format for your commit message. If you have any questions about the possible categories, scopes, etc. please create an issue in GitHub and we will do our best to respond.

Note: For merge commits, just use `chore` for the type of change, `merge` for the scope, and `merge commit` for the message. Likely, however, it will not matter what you put into Commitizen as you'll just get a normal merge commit message such as `Merge branch 'my-branch' into main`.

## Git Workflow
Specific branches will be used for specific purposes in this repo. Considering this, the lifecycle of a new feature, bugfix, etc. should largely follow the steps below.

### Irving Git Workflow
1. If for some reason you need to reset links, run `npm run develop:setup` in the Irving repo root and `npx irving link-all` in your project.
2. `git checkout -b feature/issue-17/branch-title` - create a new feature branch based on main. If your branch relates to a specific GitHub issue, reference that issue in your branch name (and all subsequent commits).
3. `npm run test` and/or `npm run test:watch` - If you've fixed a bug or added a new feature, please write tests! These commands can be used to run tests from within the package you are modifying or at the root of the repo if you want to run all tests for all packages.
4. When ready, push your code and create a pull request into `main` branches.
5. Your code will be reviewed.
6. Once your code passes review, a maintainer will merge your PR into `main` (or you can do so yourself if you are a maintainer).
7. If you are a maintainer, you may now:
  * `git checkout main && git pull origin main` to checkout `main` and pull down your newly-merged code.
  * Travis will automatically create an `alpha` release for your changes.
  * Install and verify the new `alpha` release in your project via `npm install @irvingjs/package-name@alpha`.
  * When you're satisfied, notify the designated release organizer that your feature is ready to move along to `beta`.
8. If you are not a maintainter:
  * Keep an eye on the releases page. When you see your code has been released, _install and test it!_.
  * If you find an issue with your code, notify the release orgainzer that you are still working on it.
  * If the release organizer or someone else at Alley finds an issue with your code, they will notify you.
  * In both of the above cases, try to address any issues in a timely manner (before the scheduled `beta` release of the upcoming version).
  * Otherwise, let the release organizer know your code is ready to go to `beta`, ideally in the GitHub issue your PR is associated with.

### Releasing Irving
* Take stock of all features that will be going into this release and verify with feature developers that those features are ready to move to beta.
* If releaseing a `minor` version, run `npm run release:prepare`. This script will:
  * Create a new release branch for the next `minor` version (e.g. `release/6.9`).
  * Push that branch to the `origin` remote.
  * Release a beta version (e.g. `@irvingjs/core@6.9.0-beta.0`).
* If releasing a `major` version, you will need to run through the above steps yourself.
* Once the `beta` is released, ask feature developers to install beta and test their features, or test them yourself in your environment of choice.
* If releasing a major version, run `npm run prerelease:rc` once you're satisified with beta testing. Test all features a final time.
* Release a stable version from your release branch using `npm run release`.
* Run `npm run release:cleanup` to close out the release process. This script will:
  * Check out the `main` branch.
  * Merge your release branch into `main`.
  * Automatically reconcile changes in `package.json`, `package-lock.json`, `lerna.json`, and package-specific `CHANGELOG.md` files.
  * Ask you to manually merge the root-level `CHANGELOG.md` file, as it often has merge conflicts. Be sure to follow the onscreen prompts and instructions.
  * Print out a roundup of the commits since the last minor version release.
* Finally, leave your release branch open in case we need to patch that version in the future.

### Releasing a patch for an existing stable version
Notes:
* All hotfixes should be `patch` releases in semver terms
* You do not need to wait for a release organizer to release hotfixes, but you may ask them to do so if that's easier.

Steps:
* `git checkout main` - check out the main branch.
* `git checkout -b bug/bug-branch-name` - check out a new branch for your patch or hotfix.
* Work on your branch locally using linked packages.
* Once you’re satisfied with your code, open up a pull request to the `main` branch, get a peer code review, and merge into `main`.
* verify your bugfix works on the resulting `alpha` prerelease.
* `git checkout release/[version]` - checkout the release branch for which this hotfix needs to be released (this can be done on multiple different release branches separately).
* `git cherry-pick [commit hash]` - cherry-pick the commits from your bugfix branch into the release branch, in the order they were committed.
* `npm run prerelease:beta` - release a beta version and test
* `npm run release` - release a `patch` version from this release branch.
* Merge release branch back into `main`. **IMPORTANT**: Only peform a merge back into `main` from one release branch, if you are releasing this hotfix to multiple release branches.

### Tips and Gotchas
* **Important:** After creating a `release` branch, never merge master into that branch again. Release branches should remain stagnant unless a patch needs to be introduced.
* In prior versions of this document (and prior release processes) we made use of a `develop` branch. This branch is no more! Please don't merge into or make releases from `develop`.
* Please read about [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) before publishing. The type of commit you choose will have ramifications on the semver version number you release. For example, a type of `fix` will indicate a `patch` release, a type of `feat` will indicate a `minor` release.
* When you want to test out a newly published package, don't forget the npm tag. For example, for a canary release, run `npm install @irvingjs/core@alpha --save-dev`.
* When commitizen kicks in for a merge, choose `chore` for the type, `merge` for the scope, and `merge` for the commit message. Everything else can be skipped.

## Glossary of NPM scripts
### Development
  * `develop:bootstrap` - Run [`lerna bootstrap`](https://github.com/lerna/lerna/tree/master/commands/bootstrap). If you encounter any issues with local development using linked packages, this should be your first stop in attempting to resolve your issues.
  * `develop:cleanup` - Clean out the `node_modules` directories of each Irving package. Useful for starting from a clean slate with dependencies.
  * `develop:link` - Run `npm link` within each package directory, in parallel. **BEWARE!** This is a memory-intensive operation.
  * `develop:setup` - Run `develop:cleanup` then `dvelop:bootstrap` in succession. You probably won't need to use this script, but if `develop:bootstrap` doesn't solve your issue you might try it.
  * `develop:prepare` "npm install && npm run develop:link && npm run develop:setup", - Run a combination of scripts to prepare your clone of the Irving repo for local development:
    1. `npm install` in the root of the Irving repo
    2. `develop:link`
    3. `develop:setup`

### Publishing
* `npm run prerelease:alpha` - publish a prerelease to npm. This will use the npm `@alpha` tag using the `-alpha` prerelease identifier. Publish to the `@alpha` tag from the `master` branch after doing a CR/PR from your feature branch. Because this is the alpha tag, don't worry about publishing something broken. **NOTE**: Travis will automatically publish `alpha` versions from the `master` branch, so you will rarely (if ever) need to run this command yourself.
* `npm run prerelease:beta` - publish a prerelease to both git and npm. This will use the npm `@beta` tag using the `-beta` prerelease identifier. Publishes to the `@beta` tag don't need to be 100% stable, but should indicate all the major feature development for a release is finished and you're ready to start adding some polish. Beta releases should be made from a `release/*` branch.
* `npm run prerelease:rc` - publish a release candidate to both git and npm. This will use the npm `@rc` tag using the `-rc` prerelease identifier. Publishes to the `@rc` tag should be considered stable. This is the last check before publishing a new, stable release. Ideally, multiple folks at Alley should install and try out this code before a stable release. Release candidates should be made from a `release/*` branch.
* `npm run release` - publish a stable release to the npm `@latest` tag. Stable releases should be made from a `release/*` branch.
