# Publish to npm

This is primarily a reference for how to publish a new version of this package
to npm. Currently, @danpaz is the only one doing this.

1. Ensure master branch is up to date `git checkout master && git pull && git status`.
1. Ensure logged in as the expected npm user `npm whoami`.
1. Bump the npm version `npm version major|minor|patch`. This will also:
  - Run tests and style checks locally.
  - Generate built files.
  - Commit built files to master branch.
  - Generate a tagged version commit.
  - Push to GitHub and trigger a Travis build.
  - Travis CI should automatically publish to npm.
