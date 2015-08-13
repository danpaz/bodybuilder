import MatchAllFilter from '../../src/filters/match-all-filter'
import {expect} from 'chai'

describe('MatchAllFilter', () => {

  it('should create a simple match_all filter', () => {
    let result = new MatchAllFilter()
    expect(result).to.eql({
      match_all: {}
    })
  })

})
