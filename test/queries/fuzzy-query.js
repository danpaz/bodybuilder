import fuzzyQuery from '../../src/queries/fuzzy-query'
import {expect} from 'chai'

describe('fuzzyQuery', () => {

  it('should create a fuzzy query', () => {
    let result = fuzzyQuery('user', 'ki')
    expect(result).to.eql({
      fuzzy: {
        user: 'ki'
      }
    })
  })

  it('should allow advanced settings', () => {
    let result = fuzzyQuery('user', {
      value: 'ki',
      boost: 1.0,
      fuzziness: 2,
      prefix_length: 0,
      max_expansions: 100
    })
    expect(result).to.eql({
      fuzzy: {
        user: {
          value: 'ki',
          boost: 1.0,
          fuzziness: 2,
          prefix_length: 0,
          max_expansions: 100
        }
      }
    })
  })

})
