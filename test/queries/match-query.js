import matchQuery from '../../src/queries/match-query'
import {expect} from 'chai'

describe('matchQuery', () => {

  it('should create a match query', () => {
    let result = matchQuery('message', 'this is a test')
    expect(result).to.eql({
      match: {
        message: 'this is a test'
      }
    })
  })

})
