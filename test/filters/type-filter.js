import typeFilter from '../../src/filters/type-filter'
import {expect} from 'chai'

describe('typeFilter', () => {

  it('should create a type filter', () => {
    let result = typeFilter('my_type')
    expect(result).to.eql({
      type: {
        value: 'my_type'
      }
    })
  })

})
