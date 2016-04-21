import termsAggregation from '../../src/aggregations/terms-aggregation'
import { expect } from 'chai'

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

  it('should create a terms aggregation with custom options', () => {
    let result = termsAggregation('user', null, {
      order: {
        timestamp: 'asc'
      },
      size: 0
    })
    expect(result).to.eql({
      agg_terms_user: {
        terms: {
          field: 'user',
          order: {
            timestamp: 'asc'
          },
          size: 0
        }
      }
    })
  })

})
