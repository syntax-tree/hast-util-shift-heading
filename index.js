'use strict'

var visit = require('unist-util-visit')

module.exports = shiftHeading

function shiftHeading(tree, shift) {
  if (
    typeof shift !== 'number' ||
    !shift ||
    !isFinite(shift) ||
    Math.floor(shift) !== shift
  ) {
    throw new Error('Expected a non-null finite integer, not `' + shift + '`')
  }

  visit(tree, visitor)

  return tree

  function visitor(node) {
    var name = node.tagName
    var rank

    if (
      name === 'h1' ||
      name === 'h2' ||
      name === 'h3' ||
      name === 'h4' ||
      name === 'h5' ||
      name === 'h6'
    ) {
      rank = name.charCodeAt(1) - 48 /* `0` */ + shift
      node.tagName = 'h' + (rank > 6 ? 6 : rank < 1 ? 1 : rank)
    }
  }
}
