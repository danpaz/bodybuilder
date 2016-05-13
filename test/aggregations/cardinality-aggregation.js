import cardinalityAggregation from '../../src/aggregations/cardinality-aggregation'
import {expect} from 'chai'

describe('cardinalityAggregation', () => {

  it('should create a cardinality aggregation', () => {
    let result = cardinalityAggregation('grade')
    expect(result).to.eql({
      agg_cardinality_grade: {
        cardinality: {
          field: 'grade'
        }
      }
    })
  })

  it('should include additional options', () => {
    let result = cardinalityAggregation('grade', {
      precision_threshold: 100
    })
    expect(result).to.eql({
      agg_cardinality_grade: {
        cardinality: {
          field: 'grade',
          precision_threshold: 100
        }
      }
    })
  })

})
