
import geoShapeFilter from '../../src/filters/geo-shape-filter'
import {expect} from 'chai'

describe('geoShapeFilter', () => {

  it('should create a geo shape filter', () => {
    let geoJSON = {
      "type":"Feature",
      "geometry":{
        "type":"Polygon",
        "coordinates":[
          [
            [28.7457275390625,41.04621681452063],
            [29.042358398437496,41.11557271185201],
            [29.27032470703125,41.001666266518185],
            [29.097290039062496,40.88444793903562],
            [28.78555297851562,40.94671366508002],
            [28.7457275390625,41.04621681452063]
          ]
        ]
      }
    }
    let result = geoShapeFilter('fieldName', geoJSON)

    expect(result).to.eql({
      geo_shape: {
        fieldName: {
          shape: geoJSON
        }
      }
    })
  })

})
