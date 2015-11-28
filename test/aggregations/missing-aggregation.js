import missingAggregation from '../../src/aggregations/missing-aggregation'
import {expect} from 'chai'

describe('missingAggregation', () => {

  it('should create a min aggregation', () => {
    let result = missingAggregation('user', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        missing: {
          field: 'user'
        }
      }
    })
  })

})
