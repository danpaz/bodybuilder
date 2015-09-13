import boolFilter from '../../src/filters/bool-filter'
import {expect} from 'chai'

describe('boolFilter', () => {

  it('should create a bool filter', () => {
    let filter = {exists: {user: 'kimchy'}}
    let result = boolFilter('and', filter)
    expect(result).to.eql({
      bool: {
        must: [
          {
            exists: {
              user: 'kimchy'
            }
          }
        ]
      }
    })
  })

})
