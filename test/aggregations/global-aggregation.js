import globalAggregation from '../../src/aggregations/global-aggregation'
import { expect } from 'chai'

describe('globalAggregation', () => {

  it('should create a global aggregation', () => {
    let result = globalAggregation('agg_name')
    expect(result).to.eql({
      agg_name: {
        global: {}
      }
    })
  })

  it('should use the default name if the name argument is null', () => {
    let result = globalAggregation(null)
    expect(result).to.eql({
      agg_global: {
        global: {}
      }
    })
  })

})
