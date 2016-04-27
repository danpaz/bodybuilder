import fuzzyFilter from '../../src/filters/fuzzy-filter'
import {expect} from 'chai'

describe('fuzzyFilter', () => {

  it('should create a fuzzy filter', () => {
    let result = fuzzyFilter('user', 'ki')
    expect(result).to.eql({
      fuzzy: {
        'user': 'ki'
      }
    })
  })

})
