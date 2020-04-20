# Contributing to Irving
This document is intended to make contributing to this project easier, more transparent, and more standardized.

## Commitizen
This project uses [Commitizen](https://github.com/commitizen/cz-cli) and [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog) to standardize commit messages and changelogs. This means when you enter `git commit` to commit your code you will see a (maybe) unfamiliar, interactive series of questions. These questions will result in a standardized format for your commit message. If you have any questions about the possible categories, scopes, etc. please create an issue in github and we will do our best to respond.

Note: For merge commits, just use `chore` for the type of change, `merge` for the scope, and `merge commit` for the message. Likely, however, it will not matter what you put into Commitizen as you'll just get a normal merge commit message such as `Merge branch 'my-branch' into canary`.

## Git Workflow and Branches
Specific branches will be used for specific purposes in this repo. Considering this, the lifecycle of a new feature, bugfix, etc. should largely follow the steps below.

### If you are a community contributor:
1. Fork the Irving repo.
2. `git checkout master` - check out the NPM package release branch.
3. `git checkout -b feature/issue-17-branch-title` - create a new feature branch based on master. If your branch relates to a specific github issue, reference that issue in your branch name (and all subsequent commits).
4. `npm run test` and/or `npm run test:watch` - If you've fixed a bug or added a new feature, please write tests! These commands can be used to run tests from within the package you are modifying or at the root of the repo if you want to run all tests for all packages.
5. Work on your branch, using `npm link` where necessary to test out your code.
6. When ready, push your code and create a pull request into the `master` branch. Your code will be reviewed by someone at Alley.
7. Once your code passes review, someone at Alley will merge it into `master`.
8. Your code should be available on npm in the next prerelease in the npm `@beta` tag.
9. Keep an eye on the releases page. When you see your code has been released, _install and test it!_.
10. Assuming neither you nor someone at Alley finds issues with your code, it will also be included in the next `@rc` and, subsequently, `@latest` releases.

### If you are a part of the Alley organization and have publish capabilities for the npm packages:
1. Clone the irving repo
2. `git checkout master` - check out the NPM package release branch.
3. `git checkout -b feature/issue-17-branch-title` - create a new feature branch based on master. If your branch relates to a specific github issue, reference that issue in your branch name (and all subsequent commits).
4. Work on your branch, using `npm link` where necessary.
5. `git checkout canary` - check out the testing/canary release branch. Merge your code at will to this branch and test using `npm link` or, optionally...
6. `npm run prerelease:canary` - publish a release to the npm `@canary` tag using the `-alpha` prerelease identifier.
7. `cd my-irving-project` - navigate to an project.
8. `npm install @irvingjs/core@canary` - Install your recently-published `@canary` for every Irving package you’re working on.
9. Run your project and test your code!
10. Once you’re satisfied with your code, open up a pull request to the `master` branch.
11. Once your code passes review, merge it into `master` when ready.
12. `git checkout mastert && git pull origin master` - checkout `master` and pull down your newly-merged code.
13. `npm run prerelease:beta` - publish a new release to the `@beta` tag in npm.
14. Coordinate with others at Alley to:
* Test out your changes for themselves.
* Determine a release schedule for your changes.
15. Assuming no one finds issues with your code, it will also be included in the next `@rc` and, subsequently, `@latest` releases.

### If an issue is found with your code in a prerelease:
1. If someone at Alley finds an issue with your code, we will ask you to address the issue. Hopefully any issues will be caught before this point, however.
2. If you are unable to address the issue:
* We will attempt to address it ourselves OR
* We will revert your pull request until you are able to address the issues.
