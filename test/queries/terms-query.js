import termsQuery from '../../src/queries/terms-query'
import {expect} from 'chai'

describe('termsQuery', () => {

  it('should create a terms query', () => {
    let result = termsQuery('tags', ['blue', 'pill'])
    expect(result).to.eql({
      terms: {
        tags: ['blue', 'pill']
      }
    })
  })

})
