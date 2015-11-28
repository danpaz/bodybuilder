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
      let result = boolMerge(q1, q2, 'not')
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
