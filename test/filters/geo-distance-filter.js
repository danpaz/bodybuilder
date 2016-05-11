import geoDistanceFilter from '../../src/filters/geo-distance-filter'
import {expect} from 'chai'

describe('geoDistanceFilter', () => {

  it('should create a geo distance filter', () => {
    let result = geoDistanceFilter('fieldName', '30m', { lat: 10, lng: 30 })
    expect(result).to.eql({
      geo_distance: {
        distance: '30m',
        fieldName: {
          lat: 10,
          lng: 30
        }
      }
    })
  })

})

