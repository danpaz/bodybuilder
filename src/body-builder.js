import _ from 'lodash'
import queryBuilder from './query-builder'
import filterBuilder from './filter-builder'
import aggregationBuilder from './aggregation-builder'

export default function bodyBuilder () {
  return Object.assign(
    { /* sort, from, build, etc. go here */ },
    builder(),
    queryBuilder(),
    filterBuilder(),
    aggregationBuilder()
  )
}

function builder () {
  function makeBody(queries, filters, aggregations) {
    let body = {}

    if (!_.isEmpty(filters)) {
      _.set(body, 'query.filtered.filter', filters)

      if (!_.isEmpty(queries)) {
        _.set(body, 'query.filtered.query', queries)
      }

    } else if (!_.isEmpty(queries)) {
      _.set(body, 'query', queries)
    }

    if (!_.isEmpty(aggregations)) {
      _.set(body, 'aggregations', aggregations)
    }
    return body
  }

  return {
    build() {
      const queries = this.getQuery()
      const filters = this.getFilter()
      const aggregations = this.getAggregations()

      return makeBody(queries, filters, aggregations)
    }
  }
}
