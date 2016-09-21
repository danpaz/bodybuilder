import avgAggregation from '../../src/aggregations/avg-aggregation'
import {expect} from 'chai'

describe('avgAggregation', () => {

  it('should create a avg aggregation', () => {
    let result = avgAggregation('grade', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        avg: {
          field: 'grade'
        }
      }
    })
  })

  it('should include additional options', () => {
    let result = avgAggregation('grade', {
      missing: 10
    })
    expect(result).to.eql({
      agg_avg_grade: {
        avg: {
          field: 'grade',
          missing: 10
        }
      }
    })
  })

})
