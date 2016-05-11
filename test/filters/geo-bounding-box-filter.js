import geoBoundingBoxFilter from '../../src/filters/geo-bounding-box-filter'
import {expect} from 'chai'

describe('geoBoundingBoxFilter', () => {

  it('should create a geo bounding box filter', () => {
    let result = geoBoundingBoxFilter('fieldName', {
      top : -74.1,
      left : 40.73,
      bottom : -71.12,
      right : 40.01
    })

    expect(result).to.eql({
      geo_bounding_box: {
        fieldName: {
          top : -74.1,
          left : 40.73,
          bottom : -71.12,
          right : 40.01
        }
      }
    })
  })

})

