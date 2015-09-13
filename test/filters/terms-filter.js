import termsFilter from '../../src/filters/terms-filter'
import {expect} from 'chai'

describe('termsFilter', () => {

  it('should create a simple terms filter', () => {
    let result = termsFilter('user', ['kimchy', 'elasticsearch'])
    expect(result).to.eql({
      terms: {
        user: ['kimchy', 'elasticsearch']
      }
    })
  })

})
