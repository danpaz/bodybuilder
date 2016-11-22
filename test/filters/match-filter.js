import matchFilter from '../../src/filters/match-filter'
import {expect} from 'chai'

describe('matchFilter', () => {

  it('should create a match filter', () => {
    let result = matchFilter('user', 'ki')
    expect(result).to.eql({
      match: {
        'user': 'ki'
      }
    })
  })

})
