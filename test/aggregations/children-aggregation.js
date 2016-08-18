import childrenAggregation from '../../src/aggregations/children-aggregation'
import {expect} from 'chai'

describe('childrenAggregation', () => {

  it('should create a children aggregation', () => {
    let result = childrenAggregation('mychild')
    expect(result).to.eql({
      agg_children_mychild: {
        children: {
          type: 'mychild'
        }
      }
    })
  })

})
