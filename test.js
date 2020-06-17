'use strict'

var test = require('tape')
var h = require('hastscript')
var shift = require('.')

test('shiftHeading', function (t) {
  t.throws(
    function () {
      shift(h())
    },
    /^Error: Expected a non-null finite integer, not `undefined`$/,
    'should throw when not given a number'
  )

  t.throws(
    function () {
      shift(h(), NaN)
    },
    /^Error: Expected a non-null finite integer, not `NaN`$/,
    'should throw when given not a number'
  )

  t.throws(
    function () {
      shift(h(), 0.1)
    },
    /^Error: Expected a non-null finite integer, not `0.1`$/,
    'should throw when not given an integer'
  )

  t.throws(
    function () {
      shift(h(), Infinity)
    },
    /^Error: Expected a non-null finite integer, not `Infinity`$/,
    'should throw when not given a finite number'
  )

  t.throws(
    function () {
      shift(h(), 0)
    },
    /^Error: Expected a non-null finite integer, not `0`$/,
    'should throw when not given a non-null number'
  )

  t.deepEqual(
    shift(h('h1', 'Alpha'), 1),
    h('h2', 'Alpha'),
    'should shift nodes upwards'
  )

  t.deepEqual(
    shift(h('h2', 'Bravo'), -1),
    h('h1', 'Bravo'),
    'should shift nodes downwards'
  )

  t.deepEqual(
    shift(h('h2', 'Charlie'), -2),
    h('h1', 'Charlie'),
    'should not shift upwards past h1'
  )

  t.deepEqual(
    shift(h('h5', 'Delta'), 2),
    h('h6', 'Delta'),
    'should not shift downwards past h6'
  )

  t.deepEqual(
    shift(h('main', [h('h1', 'Echo'), h('p', 'Foxtrot'), h('h5', 'Golf')]), 2),
    h('main', [h('h3', 'Echo'), h('p', 'Foxtrot'), h('h6', 'Golf')]),
    'should change a tree'
  )

  t.end()
})
