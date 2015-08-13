import ExistsFilter from '../../src/filters/exists-filter'
import {expect} from 'chai'

describe('ExistsFilter', () => {

  it('should create a simple exists filter', () => {
    let result = new ExistsFilter('user', 'kimchy')
    expect(result).to.eql({
      exists: {
        user: 'kimchy'
      }
    })
  })

})
