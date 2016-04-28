import wildcardFilter from '../../src/filters/wildcard-filter'
import {expect} from 'chai'

describe('wildcardFilter', () => {

  it('should create a wildcard filter', () => {
    let result = wildcardFilter('name.first', 'ki*y')
    expect(result).to.eql({
      wildcard: {
        'name.first': 'ki*y'
      }
    })
  })

})
