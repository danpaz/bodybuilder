import significantTermsAggregation from '../../src/aggregations/significant-terms-aggregation'
import {expect} from 'chai'

describe('significantTermsAggregation', () => {

  it('should create a significant terms aggregation', () => {
    let result = significantTermsAggregation('user', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        significant_terms: {
          field: 'user'
        }
      }
    })
  })

  it('should include additional options', () => {
    let result = significantTermsAggregation('user', {
      size: 10
    })
    expect(result).to.eql({
      agg_significant_terms_user: {
        significant_terms: {
          field: 'user',
          size: 10
        }
      }
    })
  })

})
