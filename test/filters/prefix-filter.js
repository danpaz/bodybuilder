import PrefixFilter from '../../src/filters/prefix-filter'
import {expect} from 'chai'

describe('PrefixFilter', () => {

  it('should create a simple prefix filter', () => {
    let result = new PrefixFilter('user', 'ki')
    expect(result).to.eql({
      prefix: {
        user: 'ki'
      }
    })
  })

})
