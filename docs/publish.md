# Publish to npm

This is primarily a reference for how to publish a new version of this package
to npm. Currently, @danpaz is the only one doing this.

1. Ensure master branch is up to date `git checkout master && git pull && git status`.
1. Ensure logged in as the expected npm user `npm whoami`.
1. Bump the npm version `npm version major|minor|patch`. This will also:
  - Run tests and style checks locally.
  - Generate built files `npm run build`.
1. Commit changes to master branch.
1. Push updates to github, including the new npm version tag `git push --tags`.
  - Travis CI will automatically publish to npm.
