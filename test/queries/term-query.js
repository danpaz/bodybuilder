import termQuery from '../../src/queries/term-query'
import {expect} from 'chai'

describe('termQuery', () => {

  it('should create a term query', () => {
    let result = termQuery('user', 'Kimchy')
    expect(result).to.eql({
      term: {
        user: 'Kimchy'
      }
    })
  })

})
