import geohashAggregation from '../../src/aggregations/geohash-aggregation'
import {expect} from 'chai'

describe('geohashAggregation', () => {

  it('should create a geohash_grid aggregation', () => {
    let result = geohashAggregation('location')
    expect(result).to.eql({
      agg_geohash_grid_location: {
        geohash_grid: {
          field: 'location'
        }
      }
    })
  })

  it('should include additional options', () => {
    let result = geohashAggregation('location', {
      precision: 5
    })
    expect(result).to.eql({
      agg_geohash_grid_location: {
        geohash_grid: {
          field: 'location',
          precision: 5
        }
      }
    })
  })

})
