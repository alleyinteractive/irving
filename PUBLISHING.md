# Publishing Irving
These are notes and guidelines for publishing the Irving NPM packages. This will mostly apply to those on the Alley team with NPM credentials.

## Available NPM scripts
* `npm run prerelease:canary` - publish a prerelease to both git and npm. This will use the npm `@canary` tag using the `-beta` prerelease identifier. This command is intende for use on the `develop` branch. You can and should use this command as much as necessary to test out a real `npm install` of the packages you're working on. Don't worry about publishing a broken package on the `@canary` tag.
* `npm run prerelease:rc` - publish a prerelease to both git and npm. This will use the npm `@rc` tag using the `-rc` prerelease identifier. Publishes to the `@rc` tag should be considered stable. This is the last check before publishing a new, stable release. Ideally, multiple folks at Alley should install and try out this code before a stable release.
* `npm run release` - publish a stable release to the npm `@latest` tag. This is the only type of release that can contain code from multiple issues and/or contributors.

## Sample Workflow
1. Clone the irving repo
2. `git checkout master` - check out the NPM package release branch.
3. `git checkout -b feature/issue-17/branch-title` - create a new feature branch based on master. If your branch relates to a specific GitHub issue, reference that issue in your branch name (and all subsequent commits).
4. Work on your branch, using `npm link` where necessary.
5. `git checkout develop` - check out the testing/canary release branch. Merge your code at will to this branch and test using `npm link` or, optionally...
6. `npm run prerelease:canary` - publish a release to the npm `@canary` tag using the `-alpha` prerelease identifier.
7. `cd my-irving-project` - navigate to an project.
8. `npm install @irvingjs/core@canary` - Install your recently-published `@canary` for every Irving package you’re working on.
9. Run your project and test your code!
10. Once you’re satisfied with your code, open up a pull request to both the `preprod` and `master` branches.
11. Get a peer code review on your pull request into `preprod` and, once approved, merge it into `preprod` when ready.
12. `git checkout preprod && git pull origin preprod` - checkout `preprod` and pull down your newly-merged code.
13. `npm run prerelease:rc`- publish a new release to the `@rc` tag in npm.
14. Ideally at this point you would have someone else at alley install and test out your `@rc` release.
15. Call attention to your PR into `master` as a last check in the process before a stable release. This is an opportunity to have a conversation with others about code they want to release or objections they might have to releasing your code. You do not need to do a second peer code review here.
16. Assuming no one takes issue with your code, get someone to slap an approval on it and merge into `master`.
17. `git checkout master && git pull origin master` - checkout `master` and pull down your newly-merged code.
18. `npm run release` - publish a stable release!

## Tips and Gotchas
* Canary releases may become a bit off. If you find this is happening, you can run `git checkout develop && git rebase --onto master develop`, then force push to the remote `develop` branch. This should get canary releases back up to date.
* When you want to test out a newly published package, don't forget the npm tag. For example, for a canary release, run `npm install @irvingjs/core@canary --save-dev`.
