import test from 'tape'
import { mergeConcat, boolMerge } from '../src/utils'

test('mergeConcat should concatenate arrays on merge', (t) => {
  t.plan(1)

  let a = { k: { k: ['a'] } }
  let b = { k: { k: ['b'] } }
  let result = mergeConcat({}, a, b)
  t.deepEqual(result, { k: { k: ['a', 'b'] } })
})

test('mergeConcat should merge properties of nested objects', (t) => {
  t.plan(1)

  let a = { k: { k: { p: 'q' } } }
  let b = { k: { k: { j: 'm' } } }
  let result = mergeConcat({}, a, b)
  t.deepEqual(result, { k: { k: { p: 'q', j: 'm' } } })
})

test('mergeConcat should allow prevalecence of attributes on rightmost objects', (t) => {
  t.plan(1)

  let a = { k: { k: { p: 'x', x: 1 } } }
  let b = { k: { k: { p: 'y', y: 2 } } }
  let c = { k: { k: { p: 'z', z: 3 } } }
  let result = mergeConcat({}, a, b, c)
  t.deepEqual(result, { k: { k: { p: 'z', x: 1, y: 2, z: 3} } })
})

test('mergeConcat should return an empty object if there\'s nothing to merge', (t) => {
  t.plan(1)

  let result = mergeConcat(undefined, null, false, 0)
  t.deepEqual(result, { })
})

test('mergeConcat should do nothing on a single object', (t) => {
  t.plan(1)

  let a = { k: { k: { p: 'x', x: 1 } } }
  let result = mergeConcat(a)
  t.deepEqual(result, a)
})


test('should do nothing with a single query', (t) => {
  t.plan(1)

  let q = {somequery: {}}
  let result = boolMerge(q)
  t.deepEqual(result, {somequery:{}})
})

test('should combine two queries into a bool', (t) => {
  t.plan(1)

  let q1 = {term: {user: 'you'}}
  let q2 = {term: {user: 'me'}}
  let result = boolMerge(q1, q2)
  t.deepEqual(result, {
    bool: {
      must: [
        {term: {user: 'me'}},
        {term: {user: 'you'}}
      ]
    }
  })
})

test('should combine two queries accounting for boolType', (t) => {
  t.plan(1)

  let q1 = {term: {user: 'you'}}
  let q2 = {term: {user: 'me'}}
  let boolType = 'not'
  let result = boolMerge(q1, q2, boolType)
  t.deepEqual(result, {
    bool: {
      must: [
        {term: {user: 'me'}}
      ],
      must_not: [
        {term: {user: 'you'}}
      ]
    }
  })
})

test('should combine existing bool with another query', (t) => {
  t.plan(1)

  let q1 = {term: {user: 'them'}}
  let q2 = {
    bool: {
      must: [
        {term: {user: 'me'}},
        {term: {user: 'you'}}
      ]
    }
  }
  let result = boolMerge(q1, q2)
  t.deepEqual(result, {
    bool: {
      must: [
        {term: {user: 'me'}},
        {term: {user: 'you'}},
        {term: {user: 'them'}}
      ]
    }
  })
})

test('should combine two bools together', (t) => {
  t.plan(1)

  let q1 = {
    bool: {
      should: [
        {term: {user: 'them'}},
        {term: {user: 'us'}}
      ]
    }
  }
  let q2 = {
    bool: {
      must: [
        {term: {user: 'me'}},
        {term: {user: 'you'}}
      ]
    }
  }
  let result = boolMerge(q1, q2)
  t.deepEqual(result, {
    bool: {
      must: [
        {term: {user: 'me'}},
        {term: {user: 'you'}}
      ],
      should: [
        {term: {user: 'them'}},
        {term: {user: 'us'}}
      ]
    }
  })
})


