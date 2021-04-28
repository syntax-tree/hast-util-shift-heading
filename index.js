import {headingRank} from 'hast-util-heading-rank'
import {visit} from 'unist-util-visit'

export function shiftHeading(tree, shift) {
  if (
    typeof shift !== 'number' ||
    !shift ||
    !Number.isFinite(shift) ||
    Math.floor(shift) !== shift
  ) {
    throw new Error('Expected a non-null finite integer, not `' + shift + '`')
  }

  visit(tree, 'element', visitor)

  return tree

  function visitor(node) {
    var rank = headingRank(node)

    if (rank) {
      rank += shift
      node.tagName = 'h' + (rank > 6 ? 6 : rank < 1 ? 1 : rank)
    }
  }
}
