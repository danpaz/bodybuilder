import valueCountAggregation from '../../src/aggregations/value-count-aggregation'
import {expect} from 'chai'

describe('valueCountAggregation', () => {

  it('should create a value_count aggregation', () => {
    let result = valueCountAggregation('grade', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        value_count: {
          field: 'grade'
        }
      }
    })
  })

})
