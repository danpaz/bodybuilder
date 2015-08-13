import TermsFilter from '../../src/filters/terms-filter'
import {expect} from 'chai'

describe('TermsFilter', () => {

  it('should create a simple terms filter', () => {
    let result = new TermsFilter('user', ['kimchy', 'elasticsearch'])
    expect(result).to.eql({
      term: {
        user: ['kimchy', 'elasticsearch']
      }
    })
  })

})
