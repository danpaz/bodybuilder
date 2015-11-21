import { mergeConcat, boolMerge } from '../src/utils'
import { expect } from 'chai'

describe('Utils', () => {

  describe('mergeConcat', () => {

    it('should concatenate arrays on merge', () => {
      let a = {
        k: {
          k: ['a']
        }
      }
      let b = {
        k: {
          k: ['b']
        }
      }
      let result = mergeConcat({}, a, b)

      expect(result).to.eql({
        k: {
          k: ['a', 'b']
        }
      })
    })

  })

})
