/**
 * @typedef {import('unist').Node} UnistNode
 * @typedef {import('hast').Element} HastElement
 * @typedef {import('unist-util-visit').Visitor<HastElement>} VisitElement
 */

import {headingRank} from 'hast-util-heading-rank'
import {visit} from 'unist-util-visit'

/**
 * @template {UnistNode} T
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

  visit(tree, 'element', visitor)

  return tree

  /** @type {VisitElement} */
  function visitor(node) {
    let rank = headingRank(node)

    if (rank) {
      rank += shift
      node.tagName = 'h' + (rank > 6 ? 6 : rank < 1 ? 1 : rank)
    }
  }
}
