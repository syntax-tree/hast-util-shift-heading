import test from 'tape'
import {h} from 'hastscript'
import {shiftHeading} from './index.js'

test('shiftHeading', function (t) {
  t.throws(
    function () {
      shiftHeading(h(''))
    },
    /^Error: Expected a non-null finite integer, not `undefined`$/,
    'should throw when not given a number'
  )

  t.throws(
    function () {
      shiftHeading(h(''), Number.NaN)
    },
    /^Error: Expected a non-null finite integer, not `NaN`$/,
    'should throw when given not a number'
  )

  t.throws(
    function () {
      shiftHeading(h(''), 0.1)
    },
    /^Error: Expected a non-null finite integer, not `0.1`$/,
    'should throw when not given an integer'
  )

  t.throws(
    function () {
      shiftHeading(h(''), Number.POSITIVE_INFINITY)
    },
    /^Error: Expected a non-null finite integer, not `Infinity`$/,
    'should throw when not given a finite number'
  )

  t.throws(
    function () {
      shiftHeading(h(''), 0)
    },
    /^Error: Expected a non-null finite integer, not `0`$/,
    'should throw when not given a non-null number'
  )

  t.deepEqual(
    shiftHeading(h('h1', 'Alpha'), 1),
    h('h2', 'Alpha'),
    'should shift nodes upwards'
  )

  t.deepEqual(
    shiftHeading(h('h2', 'Bravo'), -1),
    h('h1', 'Bravo'),
    'should shift nodes downwards'
  )

  t.deepEqual(
    shiftHeading(h('h2', 'Charlie'), -2),
    h('h1', 'Charlie'),
    'should not shift upwards past h1'
  )

  t.deepEqual(
    shiftHeading(h('h5', 'Delta'), 2),
    h('h6', 'Delta'),
    'should not shift downwards past h6'
  )

  t.deepEqual(
    shiftHeading(
      h('main', [h('h1', 'Echo'), h('p', 'Foxtrot'), h('h5', 'Golf')]),
      2
    ),
    h('main', [h('h3', 'Echo'), h('p', 'Foxtrot'), h('h6', 'Golf')]),
    'should change a tree'
  )

  t.end()
})
