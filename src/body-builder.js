import _ from 'lodash'
import queryBuilder from './query-builder'
import filterBuilder from './filter-builder'
import aggregationBuilder from './aggregation-builder'

export default function bodyBuilder () {
  return Object.assign(
    { /* sort, from, build, etc. go here */ },
    queryBuilder(),
    filterBuilder(),
    aggregationBuilder()
  )
}
