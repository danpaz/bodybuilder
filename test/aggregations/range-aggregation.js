import rangeAggregation from '../../src/aggregations/range-aggregation'
import { expect } from 'chai'

describe('rangeAggregation', () => {

  it('should create a range aggregation', () => {
    let result = rangeAggregation('user', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        range: {
          field: 'user'
        }
      }
    })
  })

  it('should create a range aggregation with custom options', () => {
    let result = rangeAggregation('user', null, {
      order: {
        timestamp: 'asc'
      },
      size: 0,
      ranges: [
        {to: 50},
        {from: 50, to: 100},
        {from: 100}
      ]
    })
    expect(result).to.eql({
      agg_range_user: {
        range: {
          field: 'user',
          order: {
            timestamp: 'asc'
          },
          size: 0,
          ranges: [
            {to: 50},
            {from: 50, to: 100},
            {from: 100}
          ]
        }
      }
    })
  })

})
