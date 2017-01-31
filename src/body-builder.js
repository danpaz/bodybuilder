import _ from 'lodash'
import queryBuilder from './query-builder'
import filterBuilder from './filter-builder'
import aggregationBuilder from './aggregation-builder'
import { sortMerge } from './utils'

export default function bodyBuilder () {
  let body = {}

  return Object.assign(
    {
      /**
       * Set a sort direction on a given field.
       *
       * @param  {String} field             Field name.
       * @param  {String} [direction='asc'] A valid direction: 'asc' or 'desc'.
       * @returns {Bodybuilder} Builder class.
       */
      sort(field, direction = 'asc') {
        body.sort = body.sort || []

        if (_.isArray(field)) {

            if(_.isPlainObject(body.sort)) {
                body.sort = [body.sort]
            }

            if(_.isArray(body.sort)) {
                _.each(field, (sorts) => {
                    _.each(sorts, (value, key) => {
                        sortMerge(body.sort, key, value)
                    })
                })
            }
        } else {
          sortMerge(body.sort, field, direction)
        }
        return this
      },

      /**
       * Set a *from* offset value, for paginating a query.
       *
       * @param  {Number} quantity The offset from the first result you want to
       *                           fetch.
       * @returns {Bodybuilder} Builder class.
       */
      from(quantity) {
        body.from = quantity
        return this
      },

      /**
       * Set a *size* value for maximum results to return.
       *
       * @param  {Number} quantity Maximum number of results to return.
       * @returns {Bodybuilder} Builder class.
       */
      size(quantity) {
        body.size = quantity
        return this
      },

      /**
       * Set any key-value on the elasticsearch body.
       *
       * @param  {String} k Key.
       * @param  {String} v Value.
       * @returns {Bodybuilder} Builder class.
       */
      rawOption(k, v) {
        body[k] = v
        return this
      },

      build(version) {
        const queries = this.getQuery()
        const filters = this.getFilter()
        const aggregations = this.getAggregations()

        if (version === 'v2') {
          return _buildV2(body, queries, filters, aggregations)
        }

        return _buildV1(body, queries, filters, aggregations)
      }

    },
    queryBuilder(),
    filterBuilder(),
    aggregationBuilder()
  )
}

function _buildV1(body, queries, filters, aggregations) {
  let clonedBody = _.cloneDeep(body)

  if (!_.isEmpty(filters)) {
    _.set(clonedBody, 'query.filtered.filter', filters)

    if (!_.isEmpty(queries)) {
      _.set(clonedBody, 'query.filtered.query', queries)
    }

  } else if (!_.isEmpty(queries)) {
    _.set(clonedBody, 'query', queries)
  }

  if (!_.isEmpty(aggregations)) {
    _.set(clonedBody, 'aggregations', aggregations)
  }
  return clonedBody
}

function _buildV2(body, queries, filters, aggregations) {
  let clonedBody = _.cloneDeep(body)

  if (!_.isEmpty(filters)) {
    let filterBody = {}
    let queryBody = {}
    _.set(filterBody, 'query.bool.filter', filters)
    if (!_.isEmpty(queries.bool)) {
      _.set(queryBody, 'query.bool', queries.bool)
    } else if (!_.isEmpty(queries)) {
      _.set(queryBody, 'query.bool.must', queries)
    }
    _.merge(clonedBody, filterBody, queryBody)
  } else if (!_.isEmpty(queries)) {
    _.set(clonedBody, 'query', queries)
  }

  if (!_.isEmpty(aggregations)) {
    _.set(clonedBody, 'aggs', aggregations)
  }

  return clonedBody
}
