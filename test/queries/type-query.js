import termQuery from '../../src/queries/type-query'
import {expect} from 'chai'

describe('typeQuery', () => {

  it('should create a type query', () => {
    let result = termQuery('custom_type')
    expect(result).to.eql({
      type: {
        value: 'custom-type'
      }
    })
  })

})
