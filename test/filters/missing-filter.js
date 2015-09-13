import missingFilter from '../../src/filters/missing-filter'
import {expect} from 'chai'

describe('missingFilter', () => {

  it('should create a simple missing filter', () => {
    let result = missingFilter('user', 'kimchy')
    expect(result).to.eql({
      missing: {
        user: 'kimchy'
      }
    })
  })

})
