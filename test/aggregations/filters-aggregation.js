import filtersAggregation from '../../src/aggregations/filters-aggregation'
import FiltersBuilder from '../../src/filters/filters-builder'
import {expect} from 'chai'

describe('filtersAggregation', () => {
  it('should call the cb with a FiltersBuilder', function () {
    let callCount = 0
    filtersAggregation(filters => {
      callCount++
      expect(filters).to.be.an.instanceOf(FiltersBuilder)
    })

    expect(callCount).to.eq(1)
  })

  it('should create a filter aggregation', () => {
    const result = filtersAggregation(filters => {
      filters.filter('users', 'term', 'user', 'John')
      filters.filter('errors', 'term', 'status', 'failure')
    }, 'agg_name')
    expect(result).to.eql({
      agg_name: {
        filters: {
          filters: {
            users: { term: { user: 'John' } },
            errors: { term: { status: 'failure' } }
          }
        }
      }
    })
  })

})
