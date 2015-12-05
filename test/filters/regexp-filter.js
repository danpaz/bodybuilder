import regexpFilter from '../../src/filters/regexp-filter'
import {expect} from 'chai'

describe('regexpFilter', () => {

  it('should create a regexp filter', () => {
    let result = regexpFilter('name.first', 's.*y')
    expect(result).to.eql({
      regexp: {
        'name.first': 's.*y'
      }
    })
  })

})
