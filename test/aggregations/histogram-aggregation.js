import histogramAggregation from '../../src/aggregations/histogram-aggregation'
import {expect} from 'chai'

describe('histogramAggregation', () => {

  it('should create a histogram aggregation', () => {
    let result = histogramAggregation('price')
    expect(result).to.eql({
      agg_histogram_price: {
        histogram: {
          field: 'price'
        }
      }
    })
  })

  it('should include additional options', () => {
    let result = histogramAggregation('price', {
      interval: 50
    })
    expect(result).to.eql({
      agg_histogram_price: {
        histogram: {
          field: 'price',
          interval: 50
        }
      }
    })
  })

})
