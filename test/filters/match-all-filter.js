import matchAllFilter from '../../src/filters/match-all-filter'
import {expect} from 'chai'

describe('matchAllFilter', () => {

  it('should create a simple match_all filter', () => {
    let result = matchAllFilter()
    expect(result).to.eql({
      match_all: {}
    })
  })

})
