import rangeQuery from '../../src/queries/range-query'
import {expect} from 'chai'

describe('rangeQuery', () => {

  it('should create a range query', () => {
    let result = rangeQuery('age', {lte: 10, gte: 20})
    expect(result).to.eql({
      range: {
        age: {
          lte: 10,
          gte: 20
        }
      }
    })
  })

})

