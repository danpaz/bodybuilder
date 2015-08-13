import Filter from '../../src/filters/filter'
import RangeFilter from '../../src/filters/range-filter'
import {expect} from 'chai'

describe('Filter', () => {

  it('should convert to string', () => {
    let result = new RangeFilter('born', {gte: 'now'})
    expect(result.toString()).to.equal('{"range":{"born":{"gte":"now"}}}')
  })

  it('should wrap in an and filter array', () => {
    let result = new RangeFilter('born', {gte: 'now'})
    expect(result.andify()).to.eql({
      and: [
        {
          range: {
            born: {gte: 'now'}
          }
        }
      ]
    })
  })

  it('should wrap in an or filter array', () => {
    let result = new RangeFilter('born', {gte: 'now'})
    expect(result.orify()).to.eql({
      or: [
        {
          range: {
            born: {gte: 'now'}
          }
        }
      ]
    })
  })

  it('should wrap in a not filter object', () => {
    let result = new RangeFilter('born', {gte: 'now'})
    expect(result.notify()).to.eql({
      not: {
        range: {
          born: {gte: 'now'}
        }
      }
    })
  })

})

