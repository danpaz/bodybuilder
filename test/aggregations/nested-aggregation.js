import nestedAggregation from '../../src/aggregations/nested-aggregation'
import { expect } from 'chai'

describe('nestedAggregation', () => {

  it('should create a nested aggregation', () => {
    let result = nestedAggregation('subdocuments', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        nested: {
          path: 'subdocuments'
        }
      }
    })
  })

  it('should use the default name if the name argument is null', () => {
    let result = nestedAggregation('subdocuments', null)
    expect(result).to.eql({
      agg_nested_subdocuments: {
        nested: {
          path: 'subdocuments'
        }
      }
    })
  })

})
