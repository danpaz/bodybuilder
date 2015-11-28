import statsAggregation from '../../src/aggregations/stats-aggregation'
import {expect} from 'chai'

describe('statsAggregation', () => {

  it('should create a stats aggregation', () => {
    let result = statsAggregation('grade', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        stats: {
          field: 'grade'
        }
      }
    })
  })

})
