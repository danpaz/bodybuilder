import statsAggregation from '../../src/aggregations/stats-aggregation'
import {expect} from 'chai'

describe('statsAggregation', () => {

  it('should create a stats aggregation', () => {
    let result = statsAggregation('grade', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        stats: {
          field: 'grade'
        }
      }
    })
  })

  it('should include additional options', () => {
    let result = statsAggregation('grade', {
      script: {
        inline: '_value * correction',
        params: {
          correction: 1.2
        }
      }
    })
    expect(result).to.eql({
      agg_stats_grade: {
        stats: {
          field: 'grade',
          script: {
            inline: '_value * correction',
            params: {
              correction: 1.2
            }
          }
        }
      }
    })
  })

})
