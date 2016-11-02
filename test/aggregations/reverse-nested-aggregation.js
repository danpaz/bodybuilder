import reverseNestedAggregation from '../../src/aggregations/reverse-nested-aggregation'
import { expect } from 'chai'

describe('reverseNestedAggregation', () => {

  it('should create a reverse nested aggregation', () => {
    let result = reverseNestedAggregation('agg_name')
    expect(result).to.eql({
      agg_name: {
        reverse_nested: {}
      }
    })
  })

  it('should create a terms aggregation with custom options', () => {
    let result = reverseNestedAggregation(null, { path: 'supernesteddocuments' })
    expect(result).to.eql({
      agg_reverse_nested: {
        reverse_nested: {
          path: 'supernesteddocuments'
        }
      }
    })
  })

  it('should allow name argument to be optional', () => {
    let result = reverseNestedAggregation({ path: 'supernesteddocuments' })
    expect(result).to.eql({
      agg_reverse_nested: {
        reverse_nested: {
          path: 'supernesteddocuments'
        }
      }
    })
  })

})
