# Contributing to Irving
This document is intended to make contributing to this project easier, more transparent, and more standardized.

## Commitizen
This project uses [Commitizen](https://github.com/commitizen/cz-cli) and [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog) to standardize commit messages and changelogs. This means when you enter `git commit` to commit your code you will see a (maybe) unfamiliar, interactive series of questions. These questions will result in a standardized format for your commit message. If you have any questions about the possible categories, scopes, etc. please create an issue in github and we will do our best to respond.

Note: For merge commits, just use `chore` for the type of change, `merge` for the scope, and `merge commit` for the message. Likely, however, it will not matter what you put into Commitizen as you'll just get a normal merge commit message such as `Merge branch 'my-branch' into canary`.

## Git Workflow and Branches
Specific branches will be used for specific purposes in this repo. Considering this, the lifecycle of a new feature, bugfix, etc. should largely follow the steps below.

### If you are a community contributor:
1. Fork the Irving repo.
2. Create a new branch based on `master`. If your branch relates to a specific github issue, reference that issue in your branch name. Example: `feature/issue-17-branch-title` where `branch-title` should correspond rougly to the topic of the issue you're addressing.
3. If you've fixed a bug or added a new feature, please write tests! Ensure the tests pass using `npm run test` and/or `npm run test:watch` (for running tests on change). These commands can be run from within the package you are modifying or at the root of the repo if you want to run all tests for all packages.
4. Work on your branch, using `npm link` where necessary to test out your code.
5. When ready, push up your branch and create a pull request into `master`. Your code will be reviewed by someone at Alley.
6. Assuming your branch passes review, someone at Alley will merge it.
7. Your code should be available on npm in the next prerelease.
8. Keep an eye on the releases page. When you see your code has been release, _install and test it!_.
9. Assuming neither you nor someone at Alley finds issues with your code, it will also be included in the next production release.

### If you are a part of the Alley organization and have publish capabilities for the npm packages:
1. Clone the irving repo
2. Create a new branch based on `master`. If your branch relates to a specific github issue, reference that issue in your branch name (and all subsequent commits).
* Example: `feature/issue-17/branch-title` where `branch-title` should correspond roughly to the topic of the issue you're addressing.
* Defer to using the issue number over a Jira ticket number to keep pull requests and commits consistent.
3. Work on your branch, using `npm link` where necessary.
4. Merge at will into the `canary` branch and test using `npm link` and/or `npm run release:canary` to release on the `@canary` tag.
5. After testing to your heart's content, push your branch and create a pull request into master for a code review.
6. Once your code passes review, merge it into `master` when ready.
6. Your code should be availabile on npm in the next prerelease.
7. Keep an eye on the releases page. When you see your code has been release, _install and test it!_.
8. Assuming no one finds issues with your code, it will also be included in the next production release.

### If an issue is found with your code in a prerelease:
1. If someone at Alley finds an issue with your code, we will ask you to address the issue. Hopefully any issues will be caught before this point, however.
2. If you are unable to address the issue:
* We will attempt to address it ourselves OR
* We will revert your pull request until you are able to address the issues.
