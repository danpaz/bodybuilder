# Publish to npm

This is primarily a reference for how to publish a new version of this package
to npm. Currently, @danpaz is the only one doing this.

1. Ensure master branch is up to date `git checkout master && git pull && git status`.
1. Ensure logged in as the expected npm user `npm whoami`.
1. Run tests and style checks locally `npm run check`.
1. Generate built files `npm run build`. Commit these to master branch.
1. Bump the npm version `npm version major|minor|patch`.
1. Push updates to github `git push && git push --tags`.
1. Finally, publish to npm `npm publish`.
