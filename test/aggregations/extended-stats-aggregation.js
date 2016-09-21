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

  it('should include custom options', () => {
    let result = extendedStatsAggregation('grade', {
      size: 10
    })
    expect(result).to.eql({
      agg_extended_stats_grade: {
        extended_stats: {
          field: 'grade',
          size: 10
        }
      }
    })
  })

})
