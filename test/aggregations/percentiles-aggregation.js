import percentilesAggregation from '../../src/aggregations/percentiles-aggregation'
import {expect} from 'chai'

describe('percentilesAggregation', () => {

  it('should create a percentiles aggregation', () => {
    let result = percentilesAggregation('load_time')
    expect(result).to.eql({
      agg_percentiles_load_time: {
        percentiles: {
          field: 'load_time'
        }
      }
    })
  })

  it('should include additional options', () => {
    let result = percentilesAggregation('load_time', {
      percents: [95, 99, 99.9],
      compression: 200
    })
    expect(result).to.eql({
      agg_percentiles_load_time: {
        percentiles: {
          field: 'load_time',
          percents: [95, 99, 99.9],
          compression: 200
        }
      }
    })
  })

})
