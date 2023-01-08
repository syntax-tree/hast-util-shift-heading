import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {shiftHeading} from './index.js'

test('shiftHeading', () => {
  assert.throws(
    () => {
      // @ts-ignore runtime.
      shiftHeading(h(''))
    },
    /^Error: Expected a non-null finite integer, not `undefined`$/,
    'should throw when not given a number'
  )

  assert.throws(
    () => {
      shiftHeading(h(''), Number.NaN)
    },
    /^Error: Expected a non-null finite integer, not `NaN`$/,
    'should throw when given not a number'
  )

  assert.throws(
    () => {
      shiftHeading(h(''), 0.1)
    },
    /^Error: Expected a non-null finite integer, not `0.1`$/,
    'should throw when not given an integer'
  )

  assert.throws(
    () => {
      shiftHeading(h(''), Number.POSITIVE_INFINITY)
    },
    /^Error: Expected a non-null finite integer, not `Infinity`$/,
    'should throw when not given a finite number'
  )

  assert.throws(
    () => {
      shiftHeading(h(''), 0)
    },
    /^Error: Expected a non-null finite integer, not `0`$/,
    'should throw when not given a non-null number'
  )

  assert.deepEqual(
    shiftHeading(h('h1', 'Alpha'), 1),
    h('h2', 'Alpha'),
    'should shift nodes upwards'
  )

  assert.deepEqual(
    shiftHeading(h('h2', 'Bravo'), -1),
    h('h1', 'Bravo'),
    'should shift nodes downwards'
  )

  assert.deepEqual(
    shiftHeading(h('h2', 'Charlie'), -2),
    h('h1', 'Charlie'),
    'should not shift upwards past h1'
  )

  assert.deepEqual(
    shiftHeading(h('h5', 'Delta'), 2),
    h('h6', 'Delta'),
    'should not shift downwards past h6'
  )

  assert.deepEqual(
    shiftHeading(
      h('main', [h('h1', 'Echo'), h('p', 'Foxtrot'), h('h5', 'Golf')]),
      2
    ),
    h('main', [h('h3', 'Echo'), h('p', 'Foxtrot'), h('h6', 'Golf')]),
    'should change a tree'
  )
})
