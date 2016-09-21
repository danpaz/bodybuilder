import minAggregation from '../../src/aggregations/min-aggregation'
import {expect} from 'chai'

describe('minAggregation', () => {

  it('should create a min aggregation', () => {
    let result = minAggregation('user', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        min: {
          field: 'user'
        }
      }
    })
  })

  it('should include additional options', () => {
    let result = minAggregation('grade', {
      missing: 10
    })
    expect(result).to.eql({
      agg_min_grade: {
        min: {
          field: 'grade',
          missing: 10
        }
      }
    })
  })

})
