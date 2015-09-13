import termFilter from '../../src/filters/term-filter'
import {expect} from 'chai'

describe('termFilter', () => {

  it('should create a simple term filter', () => {
    let result = termFilter('user', 'kimchy')
    expect(result).to.eql({
      term: {
        user: 'kimchy'
      }
    })
  })

})
