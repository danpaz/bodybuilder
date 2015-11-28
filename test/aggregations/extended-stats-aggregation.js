import extendedStatsAggregation from '../../src/aggregations/extended-stats-aggregation'
import {expect} from 'chai'

describe('extendedStatsAggregation', () => {

  it('should create a stats aggregation', () => {
    let result = extendedStatsAggregation('grade', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        extended_stats: {
          field: 'grade'
        }
      }
    })
  })

})
