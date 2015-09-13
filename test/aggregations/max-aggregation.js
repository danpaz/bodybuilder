import maxAggregation from '../../src/aggregations/max-aggregation'
import {expect} from 'chai'

describe('maxAggregation', () => {

  it('should create a max aggregation', () => {
    let result = maxAggregation('user', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        max: {
          field: 'user'
        }
      }
    })
  })

})
