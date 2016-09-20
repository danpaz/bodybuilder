import valueCountAggregation from '../../src/aggregations/value-count-aggregation'
import {expect} from 'chai'

describe('valueCountAggregation', () => {

  it('should create a value_count aggregation', () => {
    let result = valueCountAggregation('grade', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        value_count: {
          field: 'grade'
        }
      }
    })
  })

  it('should include additional options', () => {
    let result = valueCountAggregation('grade', {
      script: {
        file: 'my_script',
        params: {
          field: 'grade'
        }
      }
    })
    expect(result).to.eql({
      agg_value_count_grade: {
        value_count: {
          field: 'grade',
          script: {
            file: 'my_script',
            params: {
              field: 'grade'
            }
          }
        }
      }
    })
  })

})
