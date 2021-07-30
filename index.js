/**
 * @typedef {import('hast').Root} Root
 * @typedef {Root['children'][number]|Root} Node
 */

import {headingRank} from 'hast-util-heading-rank'
import {visit} from 'unist-util-visit'

/**
 * @template {Node} T
 * @param {T} tree
 * @param {number} shift
 * @returns {T}
 */
export function shiftHeading(tree, shift) {
  if (
    typeof shift !== 'number' ||
    !shift ||
    !Number.isFinite(shift) ||
    Math.floor(shift) !== shift
  ) {
    throw new Error('Expected a non-null finite integer, not `' + shift + '`')
  }

  visit(tree, 'element', (node) => {
    let rank = headingRank(node)

    if (rank) {
      rank += shift
      node.tagName = 'h' + (rank > 6 ? 6 : rank < 1 ? 1 : rank)
    }
  })

  return tree
}
