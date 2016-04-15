import { mergeConcat, boolMerge } from '../src/utils'
import { expect } from 'chai'

describe('Utils', () => {

  describe('mergeConcat', () => {

    it('should concatenate arrays on merge', () => {
      let a = { k: { k: ['a'] } }
      let b = { k: { k: ['b'] } }
      let result = mergeConcat({}, a, b)
      expect(result).to.eql({ k: { k: ['a', 'b'] } })
    })

    it('should merge properties of nested objects', () => {
      let a = { k: { k: { p: 'q' } } }
      let b = { k: { k: { j: 'm' } } }
      let result = mergeConcat({}, a, b)
      expect(result).to.eql({ k: { k: { p: 'q', j: 'm' } } })
    })

    it('should allow prevalecence of attributes on rightmost objects', () => {
      let a = { k: { k: { p: 'x', x: 1 } } }
      let b = { k: { k: { p: 'y', y: 2 } } }
      let c = { k: { k: { p: 'z', z: 3 } } }
      let result = mergeConcat({}, a, b, c)
      expect(result).to.eql({ k: { k: { p: 'z', x: 1, y: 2, z: 3} } })
    })

    it('should return an empty object if there\'s nothing to merge', () => {
      let result = mergeConcat(undefined, null, false, 0)
      expect(result).to.eql({ })
    })

    it('should do nothing on a single object', () => {
      let a = { k: { k: { p: 'x', x: 1 } } }
      let result = mergeConcat(a)
      expect(result).to.eql(a)
    })

  })

  describe('boolMerge', () => {

    it('should do nothing with a single query', () => {
      let q = {somequery: {}}
      let result = boolMerge(q)
      expect(result).to.eql({somequery:{}})
    })

    it('should combine two queries into a bool', () => {
      let q1 = {term: {user: 'you'}}
      let q2 = {term: {user: 'me'}}
      let result = boolMerge(q1, q2)
      expect(result).to.eql({
        bool: {
          must: [
            {term: {user: 'me'}},
            {term: {user: 'you'}}
          ]
        }
      })
    })

    it('should combine two queries accounting for boolType', () => {
      let q1 = {term: {user: 'you'}}
      let q2 = {term: {user: 'me'}}
      let boolType = 'not'
      let result = boolMerge(q1, q2, boolType)
      expect(result).to.eql({
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

    it('should combine existing bool with another query', () => {
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
      expect(result).to.eql({
        bool: {
          must: [
            {term: {user: 'me'}},
            {term: {user: 'you'}},
            {term: {user: 'them'}}
          ]
        }
      })
    })

    it('should combine two bools together', () => {
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
      expect(result).to.eql({
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

  })

})
