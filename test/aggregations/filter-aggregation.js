import filterAggregation from '../../src/aggregations/filter-aggregation'
import {expect} from 'chai'

describe('filterAggregation', () => {

  it('should create a filter aggregation', () => {
    let result = filterAggregation("allConvFilter", "allConversions", ">=", 2427)
    expect(result).to.eql({
      allConvFilter:{
        bucket_selector:{
          buckets_path:{
            allConvFilter: "allConversions"
          },
          script: "allConvFilter >= 2427"
        }

      }
    })
  })

})
