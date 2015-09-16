import nestedFilter from '../../src/filters/nested-filter'
import {expect} from 'chai'

describe('nestedFilter', () => {

  it('should create a nested term filter', () => {
    let result = nestedFilter('obj1', 'term', 'color', 'blue')
    expect(result).to.eql({
      nested: {
        path: 'obj1',
        filter: {
          term: {
            'obj1.color': 'blue'
          }
        }
      }
    })
  })

})
