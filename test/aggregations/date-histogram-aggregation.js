import dateHistogramAggregation from '../../src/aggregations/date-histogram-aggregation'
import {expect} from 'chai'

describe('dateHistogramAggregation', () => {

  it('should create a date_histogram aggregation', () => {
    let result = dateHistogramAggregation('date')
    expect(result).to.eql({
      agg_date_histogram_date: {
        date_histogram: {
          field: 'date'
        }
      }
    })
  })

  it('should include additional options', () => {
    let result = dateHistogramAggregation('date', {
      interval: 'month'
    })
    expect(result).to.eql({
      agg_date_histogram_date: {
        date_histogram: {
          field: 'date',
          interval: 'month'
        }
      }
    })
  })

})
