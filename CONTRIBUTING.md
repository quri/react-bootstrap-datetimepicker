Thanks for contributing, you rock!

If you use our code, it is now *our* code.

- [Think You Found a Bug?](#bug)
- [Proposing New or Changed API?](#api)
- [Issue Not Getting Attention?](#attention)
- [Making a Pull Request?](#pr)
- [Development](#development)
- [Hacking](#hacking)

<a name="bug"/>
## Think You Found a Bug?

Please provide a test case of some sort. Best is a pull request with a failing test. Next is a link to CodePen/JS Bin or repository that illustrates the bug. Finally, some copy/pastable code is acceptable.

<a name="api"/>
## Proposing New or Changed API?

Please provide thoughtful comments and some sample code. Proposals without substance will be closed.

<a name="attention"/>
## Issue Not Getting Attention?

If you need a bug fixed and nobody is fixing it, it is your responsibility to fix it. Issues with no activity for 30 days may be closed.

<a name="pr"/>
## Making a Pull Request?

Do not include the results of `npm run build` / `npm run build-npm` / `npm run build-min`. This is done at the release cycle by the maintainer when publishing a new version.

### Tests

All commits that fix bugs or add features need a test.

`<blink>`Do not merge code without tests.`</blink>`

### Changelog

All commits that change or add to the API must be done in a pull request that also:

- Adds an entry to `CHANGES.md` with clear steps for updating code for changed or removed API
- Updates examples
- Updates the docs

## Development

- `npm test` starts a karma test runner and watch for changes
- `npm run examples` starts a webpack dev server that will watch for changes and build the examples

## Hacking

The best way to hack on the router is to run examples.

This guidelines are inspired by [reactjs/react-router](https://github.com/reactjs/react-router/blob/master/CONTRIBUTING.md)
