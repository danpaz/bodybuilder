import boolQuery from '../../src/queries/bool-query'
import {expect} from 'chai'

describe('boolQuery', () => {

  it('should create a bool query', () => {
    let query = {match: {message: 'this is a test'}}
    let result = boolQuery('and', query)
    expect(result).to.eql({
      bool: {
        must: [
          {
            match: {
              message: 'this is a test'
            }
          }
        ]
      }
    })
  })

})
