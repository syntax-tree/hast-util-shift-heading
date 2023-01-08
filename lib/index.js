/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Content} Content
 */

/**
 * @typedef {Content | Root} Node
 */

import {headingRank} from 'hast-util-heading-rank'
import {visit} from 'unist-util-visit'

// To do next major: don’t return node.
/**
 * Change the rank of all headings (`h1` to `h6`) in `tree`.
 *
 * Mutates the tree.
 * Caps the rank so that shifting would not create invalid headings (so no `h0` or
 * `h7`).
 *
 * @template {Node} T
 *   Node type.
 * @param {T} tree
 *   Tree to change.
 * @param {number} shift
 *   Non-null finite integer to use to shift ranks.
 * @returns {T}
 *   Given, modified, tree.
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