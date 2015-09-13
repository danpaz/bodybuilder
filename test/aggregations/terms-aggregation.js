import termsAggregation from '../../src/aggregations/terms-aggregation'
import {expect} from 'chai'

describe('termsAggregation', () => {

  it('should create a terms aggregation', () => {
    let result = termsAggregation('user', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        terms: {
          field: 'user'
        }
      }
    })
  })

})
