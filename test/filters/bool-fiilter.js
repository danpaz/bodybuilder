import BoolFilter from '../../src/filters/bool-filter'
import {expect} from 'chai'

describe('BoolFilter', () => {

  it('should create a bool filter', () => {
    let filter = {exists: {user: 'kimchy'}}
    let result = new BoolFilter().and(filter)
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
