'use strict'

var visit = require('unist-util-visit')

module.exports = shiftHeading

var floor = Math.floor
var min = 1
var max = 6
var offset = 48 // '0'.charCodeAt(0)

function shiftHeading(tree, shift) {
  if (
    typeof shift !== 'number' ||
    !shift ||
    !isFinite(shift) ||
    floor(shift) !== shift
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
      rank = name.charCodeAt(1) - offset + shift
      node.tagName = 'h' + (rank > max ? max : rank < min ? min : rank)
    }
  }
}
