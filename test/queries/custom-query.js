import customQuery from '../../src/queries/custom-query'
import {expect} from 'chai'

describe('customQuery', () => {

  it('should create a custom query', () => {
    let result = customQuery('match_phrase', 'message', 'this is a test')
    expect(result).to.eql({
      match_phrase: {
        message: 'this is a test'
      }
    })
  })


})
