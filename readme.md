# hast-util-shift-heading

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[hast][] utility to change ranks (also knows as depth or level) of headings.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`shiftHeading(tree, shift)`](#shiftheadingtree-shift)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a small utility that rewrites heading ranks relative to a
number.

## When should I use this?

You can use this package when you have some content, say an article that starts
with an `h1`, but want to display it on a page that uses for example an `h1`
already as the website name (logo?).

You can use the package [`hast-util-heading-rank`][hast-util-heading-rank]
to get the rank of an element.

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+ and 16.0+), install with [npm][]:

```sh
npm install hast-util-shift-heading
```

In Deno with [`esm.sh`][esmsh]:

```js
import {shiftHeading} from 'https://esm.sh/hast-util-shift-heading@3'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {shiftHeading} from 'https://esm.sh/hast-util-shift-heading@3?bundle'
</script>
```

## Use

```js
import {h} from 'hastscript'
import {shiftHeading} from 'hast-util-shift-heading'

const tree = h('main', [
  h('h1', 'Alpha'),
  h('p', 'Bravo'),
  h('h2', 'Charlie'),
  h('p', 'Delta'),
  h('h5', 'Echo'),
  h('p', 'Foxtrot'),
  h('h6', 'Golf')
])

shiftHeading(tree, -1)

console.log(tree)
```

Yields:

```js
{ type: 'element',
  tagName: 'main',
  properties: {},
  children:
   [ { type: 'element',
       tagName: 'h1',
       properties: {},
       children: [Array] },
     { type: 'element',
       tagName: 'p',
       properties: {},
       children: [Array] },
     { type: 'element',
       tagName: 'h1',
       properties: {},
       children: [Array] },
     { type: 'element',
       tagName: 'p',
       properties: {},
       children: [Array] },
     { type: 'element',
       tagName: 'h4',
       properties: {},
       children: [Array] },
     { type: 'element',
       tagName: 'p',
       properties: {},
       children: [Array] },
     { type: 'element',
       tagName: 'h5',
       properties: {},
       children: [Array] } ] }
```

## API

This package exports the identifier [`shiftHeading`][shiftheading].
There is no default export.

### `shiftHeading(tree, shift)`

Change the rank of all headings (`h1` to `h6`) in `tree`.

Mutates the tree.
Caps the rank so that shifting would not create invalid headings (so no `h0` or
`h7`).

###### Parameters

*   `tree` ([`Node`][node]) — tree to change
*   `shift` (`number`) — non-null finite integer to use to shift ranks

###### Returns

Given, modified, tree ([`Node`][node]).

###### Throws

When `shift` is not a valid non-null finite integer.

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

`hast-util-shift-heading` changes the syntax tree but can only generated
headings from `h1` through `h6`.
There are no openings for [cross-site scripting (XSS)][xss] attacks.

## Related

*   [`hast-util-heading`](https://github.com/syntax-tree/hast-util-heading)
    — check if a node is heading content
*   [`hast-util-heading-rank`](https://github.com/syntax-tree/hast-util-heading-rank)
    — get the rank (or depth, level) of headings

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://github.com/syntax-tree/hast-util-shift-heading/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/hast-util-shift-heading/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-shift-heading.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-shift-heading

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-shift-heading.svg

[downloads]: https://www.npmjs.com/package/hast-util-shift-heading

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-shift-heading.svg

[size]: https://bundlephobia.com/result?p=hast-util-shift-heading

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[hast]: https://github.com/syntax-tree/hast

[node]: https://github.com/syntax-tree/hast#nodes

[hast-util-heading-rank]: https://github.com/syntax-tree/hast-util-heading-rank

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[shiftheading]: #shiftheadingtree-shift
