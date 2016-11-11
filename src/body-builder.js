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
  function _buildV1(queries, filters, aggregations) {
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

  function _buildV2(queries, filters, aggregations) {
    let body = {}

    if (!_.isEmpty(filters)) {
      let filterBody = {}
      let queryBody = {}
      _.set(filterBody, 'query.bool.filter', filters)
      if (!_.isEmpty(queries.bool)) {
        _.set(queryBody, 'query.bool', queries.bool)
      } else if (!_.isEmpty(queries)) {
        _.set(queryBody, 'query.bool.must', queries)
      }
      _.merge(body, filterBody, queryBody)
    } else if (!_.isEmpty(queries)) {
      _.set(body, 'query', queries)
    }

    if (!_.isEmpty(aggregations)) {
      _.set(body, 'aggs', aggregations)
    }

    return body
  }

  return {
    build(version) {
      const queries = this.getQuery()
      const filters = this.getFilter()
      const aggregations = this.getAggregations()

      if (version === 'v2') return _buildV2(queries, filters, aggregations)
      return _buildV1(queries, filters, aggregations)
    }
  }
}
