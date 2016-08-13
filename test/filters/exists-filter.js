import existsFilter from '../../src/filters/exists-filter'
import {expect} from 'chai'

describe('existsFilter', () => {

  it('should create a simple exists filter', () => {
    let result = existsFilter('user')
    expect(result).to.eql({
      exists: {
        field: 'user'
      }
    })
  })

})
