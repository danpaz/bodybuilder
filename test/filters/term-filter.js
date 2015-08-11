import TermFilter from '../../src/filters/term-filter'
import {expect} from 'chai'

describe('TermFilter', () => {

  it('should create a simple term filter', () => {
    let result = new TermFilter('user', 'kimchy')
    expect(result).to.eql({
      term: {
        user: 'kimchy'
      }
    })
  })

})
