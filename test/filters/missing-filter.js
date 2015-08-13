import MissingFilter from '../../src/filters/missing-filter'
import {expect} from 'chai'

describe('MissingFilter', () => {

  it('should create a simple missing filter', () => {
    let result = new MissingFilter('user', 'kimchy')
    expect(result).to.eql({
      missing: {
        user: 'kimchy'
      }
    })
  })

})
