# Publishing Irving
These are notes and guidelines for publishing the Irving NPM packages. This will mostly apply to those on the Alley team with NPM credentials.

**IMPORTANT NOTES**:
In order to publish you will need to:
* Create GitHub authentication token (under Settings > Developer settings > Personal access tokens). Once you have your token token, create a `.env` file at the root of the cloned Irving repo and assign it to a `GH_TOKEN` environmental variable.
* Log in to Alley's npm account via `npm adduser` to gain publish permissions. If you are unsure of how to do this, ask Owen.

## Available NPM scripts
* `npm run prerelease:canary` - publish a prerelease to npm. This will use the npm `@canary` tag using the `-alpha` prerelease identifier. This command is intended for use on the `develop` branch, specifically for commit-level releases. You can and should use this command as much as necessary to test out a real `npm install` of the packages you're working on. Don't worry about publishing a broken package on the `@canary` tag.
* `npm run prerelease:beta` - publish a prerelease to both git and npm. This will use the npm `@beta` tag using the `-beta` prerelease identifier. Publishes to the `@beta` tag don't need to be 100% stable, but shuld inidcate you're finished with the work on your branch and ready for it to be reviewed and tested. Beta releases should be made from the `master` branch.
* `npm run prerelease:rc` - publish a prerelease (a release candidate) to both git and npm. This will use the npm `@rc` tag using the `-rc` prerelease identifier. Publishes to the `@rc` tag should be considered stable. This is the last check before publishing a new, stable release. Ideally, multiple folks at Alley should install and try out this code before a stable release. Release Candidates should be made from the `master` branch.
* `npm run release` - publish a stable release to the npm `@latest` tag. This is the only type of release that can contain code from multiple issues and/or contributors.

## Sample Workflow
1. Clone the irving repo
2. `git checkout master` - check out the NPM package release branch.
3. `git checkout -b feature/issue-17/branch-title` - create a new feature branch based on master. If your branch relates to a specific GitHub issue, reference that issue in your branch name (and all subsequent commits).
4. Work on your branch, using `npm link` where necessary.
5. As you develop, feel free to:
  * `git checkout develop` - check out the testing/canary release branch. Merge your code at will.
  * `npm run prerelease:canary` - publish a release to the npm `@canary` tag using the `-alpha` prerelease identifier.
  * `cd my-irving-project` - navigate to an project.
  * `npm install @irvingjs/core@canary` - Install your recently-published `@canary` for every Irving package you’re working on.
  * Run your project and test your code!
6. Once you’re satisfied with your code, open up a pull request to both the `master` branch.
7. Get a peer code review on your pull request into `master` and, once approved, merge it into `master` when ready.
8. `git checkout master && git pull origin master` - checkout `master` and pull down your newly-merged code.
9. When you're ready to do a final test:
  * `npm run prerelease:beta` - publish a release to the npm `@beta` tag using the `-beta` prerelease identifier.
  * Install and test your code a one more time.
10. (optional) if you're releasing some serious changes (usually something other than a `patch`), make a release candidate:
  * `npm run prerelease:rc`- publish a new release to the `@rc` tag in npm.
  * Ideally at this point you would have someone else at alley install and test out your `@rc` release.
11. When ready, call attention to your upcoming release. This is an opportunity to have a conversation with others about code they might also want to release or objections they might have to releasing your code.
12. Assuming no one takes issue with your code, get someone to slap an approval on it and merge into `master`.
13. `git checkout master && git pull origin master` - checkout `master` and pull down your newly-merged code.
14. `npm run release` - publish a stable release!
15. `git checkout develop` - check out the develop branch
16. `git merge master && npm run reconcile` - update `develop` with `master` and reconcile the differences in version numbers.

## Tips and Gotchas
* Please read about [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) before publishing. The type of commit you choose will have ramifications on the semver version number you release. For example, a type of `fix` will indicate a `patch` release, a type of `feat` will indicate a `minor` release.
* Canary releases may become a bit off. If you find this is happening, you can run `git checkout develop && git rebase --onto master develop`, then force push to the remote `develop` branch. This should get canary releases back up to date.
* When you want to test out a newly published package, don't forget the npm tag. For example, for a canary release, run `npm install @irvingjs/core@canary --save-dev`.
* If lerna hangs on `Creating Releases...` or `Skipping Releases...` just use `ctrl + C` to get it to continue with the release.
