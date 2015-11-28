import sumAggregation from '../../src/aggregations/sum-aggregation'
import {expect} from 'chai'

describe('sumAggregation', () => {

  it('should create a sum aggregation', () => {
    let result = sumAggregation('grade', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        sum: {
          field: 'grade'
        }
      }
    })
  })

})
