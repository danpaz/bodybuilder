import scriptedMetricAggregation from '../../src/aggregations/scripted-metric-aggregation'
import {expect} from 'chai'

let map_script = {"file": "file_name"}
let init_script = "_agg.transactions = []"

describe('scriptedMetricAggregation', () => {

  it('should create a scripted metric aggregation', () => {
    let result = scriptedMetricAggregation(map_script, 'profit')
    expect(result).to.eql({
      profit: {
        scripted_metric: {
          map_script: map_script
        }
      }
    })
  })

  it('should include additional options', () => {
    let result = scriptedMetricAggregation(map_script, 'profit', {
      init_script: init_script,
    })
    expect(result).to.eql({
      profit: {
        scripted_metric: {
          map_script: map_script,
          init_script: init_script
        }
      }
    })
  })

})
