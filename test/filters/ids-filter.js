import idsFilter from '../../src/filters/ids-filter'
import {expect} from 'chai'

describe('idsFilter', () => {

  it('should create an ids filter', () => {
    let result = idsFilter(['1', '4', '100'])
    expect(result).to.eql({
      ids: {
        values: ['1', '4', '100']
      }
    })
  })

})
