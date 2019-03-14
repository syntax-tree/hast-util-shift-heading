# hast-util-shift-heading [![Build][build-badge]][build] [![Coverage][coverage-badge]][coverage] [![Chat][chat-badge]][chat]

Change heading rank (or depth, level) in **[hast][]**.

## Installation

[npm][]:

```bash
npm install hast-util-shift-heading
```

## Usage

```javascript
var h = require('hastscript')
var shift = require('hast-util-shift-heading')

var tree = h('main', [
  h('h1', 'Alpha'),
  h('p', 'Bravo'),
  h('h2', 'Charlie'),
  h('p', 'Delta'),
  h('h5', 'Echo'),
  h('p', 'Foxtrot'),
  h('h6', 'Golf')
])

shift(tree, -1)

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

### `shiftHeading(tree, shift)`

Change the rank of all headings (`h1` to `h6`) in `tree`.
Mutates the tree.
Caps the rank so that shifting would not create invalid headings (such as `h0`
or `h7`).

###### Parameters

*   `tree` ([`Node`][node]) — Tree to walk
*   `shift` (`number`) — Non-null finite integer to use to shift ranks

###### Returns

`tree` ([`Node`][node]) — The given, mutated, tree.

###### Throws

`Error` — When `shift` is not a valid non-null finite integer.

## Contribute

See [`contributing.md` in `syntax-tree/hast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/syntax-tree/hast-util-shift-heading.svg

[build]: https://travis-ci.org/syntax-tree/hast-util-shift-heading

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-shift-heading.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-shift-heading

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[node]: https://github.com/syntax-tree/unist#node

[contributing]: https://github.com/syntax-tree/hast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/hast/blob/master/code-of-conduct.md
