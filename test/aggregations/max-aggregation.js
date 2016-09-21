import maxAggregation from '../../src/aggregations/max-aggregation'
import {expect} from 'chai'

describe('maxAggregation', () => {

  it('should create a max aggregation', () => {
    let result = maxAggregation('user', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        max: {
          field: 'user'
        }
      }
    })
  })

  it('should include additional options', () => {
    let result = maxAggregation('grade', {
      missing: 10
    })
    expect(result).to.eql({
      agg_max_grade: {
        max: {
          field: 'grade',
          missing: 10
        }
      }
    })
  })

})
