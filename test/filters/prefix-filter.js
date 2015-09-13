import prefixFilter from '../../src/filters/prefix-filter'
import {expect} from 'chai'

describe('prefixFilter', () => {

  it('should create a simple prefix filter', () => {
    let result = prefixFilter('user', 'ki')
    expect(result).to.eql({
      prefix: {
        user: 'ki'
      }
    })
  })

})
