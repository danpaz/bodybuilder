import filterAggregation from '../../src/aggregations/filter-aggregation'
import FilterBuilder from '../../src/filters/filter-builder'
import {expect} from 'chai'

describe('filterAggregation', () => {
  it('should call the cb with a FilterBuilder', function () {
    let callCount = 0
    filterAggregation(filters => {
      callCount++
      expect(filters).to.be.an.instanceOf(FilterBuilder)
    })

    expect(callCount).to.eq(1)
  })

  it('should create a filter aggregation', () => {
    const result = filterAggregation(filters => {
      filters.filter('term', 'user', 'John')
    }, 'agg_name')
    expect(result).to.eql({
      agg_name: {
        filter: { term: { user: 'John' } }
      }
    })
  })

})
