import _ from 'lodash'
import { boolMerge, buildClause } from './utils'
import filterBuilder from './filter-builder'

export default function queryBuilder () {
  let query = {}

  function makeQuery (boolType, queryType, ...args) {
    const nested = {}
    if (_.isFunction(_.last(args))) {
      const nestedCallback = args.pop()
      const nestedResult = nestedCallback(
        Object.assign(
          {},
          queryBuilder(),
          filterBuilder()
        )
      )
      if (nestedResult.hasQuery()) {
        nested.query = nestedResult.getQuery()
      }
      if (nestedResult.hasFilter()) {
        nested.filter = nestedResult.getFilter()
      }
    }

    query = boolMerge(
      {[queryType]: Object.assign(buildClause(...args), nested)},
      query,
      boolType
    )
  }

  return {
    query (...args) {
      makeQuery('and', ...args)
      return this
    },
    andQuery (...args) {
      return this.query(...args)
    },
    addQuery (...args) {
      return this.query(...args)
    },
    orQuery (...args) {
      makeQuery('or', ...args)
      return this
    },
    notQuery (...args) {
      makeQuery('not', ...args)
      return this
    },
    getQuery () {
      return query
    },
    hasQuery () {
      return !!_.size(query)
    }
  }
}
