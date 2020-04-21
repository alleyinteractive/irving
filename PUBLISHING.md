# Publishing Irving
These are notes and guidelines for publishing the Irving NPM packages. This will mostly apply to those on the Alley team with NPM credentials.

## Available NPM scripts
* `npm run prerelease:canary` - publish a prerelease to both git and npm. This will use the npm `@canary` tag using the `-alpha` prerelease identifier. This command is intende for use on the `canary` branch. You can and should use this command as much as necessary to test out a real `npm install` of the packages you're working on. Don't worry about publishing a broken package on the `@canary` tag.
* `npm run prerelease:beta` - publish a prerelease to both git and npm. This will use the npm `@beta` tag using the `-beta` prerelease identifier. Code published to this tag should be code you consider in a state where you're ready for someone to review it. Generally beta releases should be made from the `rc` branch after a peer code review.
* `npm run prerelease:rc` - publish a prerelease to both git and npm. This will use the npm `@rc` tag using the `-rc` prerelease identifier. Publishes to the `@rc` tag should be considered stable. This is the last check before publishing a new, stable release. Ideally, multiple folks at Alley should install and try out this code before a stable release.
* `npm run release` - publish a stable release to the npm `@latest` tag. This is the only type of release that can contain code from multiple issues and/or contributors.

## Sample Workflow
1. Clone the irving repo
2. `git checkout master` - check out the NPM package release branch.
3. `git checkout -b feature/issue-17/branch-title` - create a new feature branch based on master. If your branch relates to a specific GitHub issue, reference that issue in your branch name (and all subsequent commits).
4. Work on your branch, using `npm link` where necessary.
5. `git checkout canary` - check out the testing/canary release branch. Merge your code at will to this branch and test using `npm link` or, optionally...
6. `npm run prerelease:canary` - publish a release to the npm `@canary` tag using the `-alpha` prerelease identifier.
7. `cd my-irving-project` - navigate to an project.
8. `npm install @irvingjs/core@canary` - Install your recently-published `@canary` for every Irving package you’re working on.
9. Run your project and test your code!
10. Once you’re satisfied with your code, open up a pull request to the `rc` branch.
11. Once your code passes review, merge it into `rc` when ready.
12. `git checkout rc && git pull origin rc` - checkout `rc` and pull down your newly-merged code.
13. `npm run prerelease:beta` or `npm run prerelease:rc`- publish a new release to the `@beta` or `@rc` tag in npm. In some circumstances (like if you're in a hurry to get some code out for a client) you can skip a beta release.
14. Ideally at this point you would have someone else at alley install and test out your `@rc` release.
15. Open up a pull request into `master` for your code. You don't need to do another code review here. However, do call attention to your PR as a last check in the process before a stable release. This is an opportunity to have a conversation with others about code they want to release or objections they might have to releasing your code.
16. Assuming no one finds issues with your code, get someone to slap an approval on it. Again, no full code review necessary.
17. `git checkout master && git pull origin master` - checkout `master` and pull down your newly-merged code.
18. `npm run release` - publish a stable release!
