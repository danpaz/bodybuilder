import matchFilter from '../../src/filters/match-filter'
import {expect} from 'chai'

describe('matchFilter', () => {

  it('should create a match filter', () => {
    let result = matchFilter('user', 'kimchy')
    expect(result).to.eql({
      match: {
        user: 'kimchy'
      }
    })
  })

  it('should create a match phrase filter', () => {
    let result = matchFilter('user', 'kimchy', true)
    expect(result).to.eql({
      match: {
        user: {
          query: 'kimchy',
          type: 'phrase'
        }
      }
    })
  })

})
