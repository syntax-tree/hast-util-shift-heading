import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {shiftHeading} from './index.js'

test('shiftHeading', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'shiftHeading'
    ])
  })

  await t.test('should throw when not given a number', async function () {
    assert.throws(function () {
      // @ts-ignore: check how a missing `shift` is handled.
      shiftHeading(h(''))
    }, /^Error: Expected a non-null finite integer, not `undefined`$/)
  })

  await t.test('should throw when given not a number', async function () {
    assert.throws(function () {
      shiftHeading(h(''), Number.NaN)
    }, /^Error: Expected a non-null finite integer, not `NaN`$/)
  })

  await t.test('should throw when not given an integer', async function () {
    assert.throws(function () {
      shiftHeading(h(''), 0.1)
    }, /^Error: Expected a non-null finite integer, not `0.1`$/)
  })

  await t.test(
    'should throw when not given a finite number',
    async function () {
      assert.throws(function () {
        shiftHeading(h(''), Number.POSITIVE_INFINITY)
      }, /^Error: Expected a non-null finite integer, not `Infinity`$/)
    }
  )

  await t.test(
    'should throw when not given a non-null number',
    async function () {
      assert.throws(function () {
        shiftHeading(h(''), 0)
      }, /^Error: Expected a non-null finite integer, not `0`$/)
    }
  )

  await t.test('should shift nodes upwards', async function () {
    assert.deepEqual(shiftHeading(h('h1', 'Alpha'), 1), h('h2', 'Alpha'))
  })

  await t.test('should shift nodes downwards', async function () {
    assert.deepEqual(shiftHeading(h('h2', 'Bravo'), -1), h('h1', 'Bravo'))
  })

  await t.test('should not shift upwards past h1', async function () {
    assert.deepEqual(shiftHeading(h('h2', 'Charlie'), -2), h('h1', 'Charlie'))
  })

  await t.test('should not shift downwards past h6', async function () {
    assert.deepEqual(shiftHeading(h('h5', 'Delta'), 2), h('h6', 'Delta'))
  })

  await t.test('should change a tree', async function () {
    assert.deepEqual(
      shiftHeading(
        h('main', [h('h1', 'Echo'), h('p', 'Foxtrot'), h('h5', 'Golf')]),
        2
      ),
      h('main', [h('h3', 'Echo'), h('p', 'Foxtrot'), h('h6', 'Golf')])
    )
  })
})
