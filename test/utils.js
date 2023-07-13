import test from 'tape'
import { set } from '../src/utils'

test('set | path as string', (t) => {
  t.plan(1)

  var obj = { a: { b: { c: 3 } } }
  var path = 'a.b.c'
  var value = 4

  set(obj, path, value)

  t.deepEqual(obj.a.b.c, value)
})

test('set | path as string with nested array', (t) => {
  t.plan(1)

  var obj = { a: [{ b: [{ c: 3 }, { d: 5 }] }] }
  var path =  'a[0].b[1].d'
  var value = 6

  set(obj, path, value)

  t.deepEqual(obj.a[0].b[1].d, value)
})

test('set | path as array', (t) => {
  t.plan(1)

  var obj = { a: [{ b: { c: 3 } }] }
  var path = ['a', 'b', 'c']
  var value = 4

  set(obj, path, value)

  t.deepEqual(obj.a.b.c, value)
})

test('set | path as array with nested array', (t) => {
  t.plan(1)

  var obj = { a: [{ b: { c: 3 } }] }
  var path = ['a', '0', 'b', 'c']
  var value = 4

  set(obj, path, value)

  t.deepEqual(obj.a[0].b.c, value)
})

