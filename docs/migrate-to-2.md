# Migrating to bodybuilder 2

The next version of bodybuilder comes with several improvements and fixes.

**Why upgrade?**

- Significantly smaller code base: minified bundle size reduced by 32%.
- More consistency in the api, for example: `query(<queryType>, <fieldName>, <fieldValue>, <optionsHash>, <nestingFunction>)` is consistent for all queries.
- Full flexibility in writing arbitrary queries. ALL queries, filters, aggregation clauses are supported.
- Nesting sub-queries, sub-filters, and sub-aggregations is fully supported.

## Breaking changes

### Node >= 4

Bodybuilder will no longer support node versions 0.10, 0.12, or below as they
are at the end of their maintenance periods. Please use node version >= 4.

See https://github.com/nodejs/LTS for more information.

### Remove `new`

Bodybuilder no longer uses javascript class syntax under the hood, so remove the
use of `new` when writing a query. For example:

```js
// before
var Bodybuilder = require('bodybuilder')
var body = new Bodybuilder().query('match', 'message', 'test').build()

// after
var bodybuilder = require('bodybuilder')
var body = bodybuilder().query('match', 'message', 'test').build()
```

### Building for elasticsearch 1.x, 2.x+ now the default

Bodybuilder 2 will make the elasticsearch > 2.x Query DSL the default. That
means bodybuilder filters will live in the `query.bool.filter` context instead
of in the _deprecated_ filtered query.

The elasticsearch docs have more information on query and filter context.
https://www.elastic.co/guide/en/elasticsearch/reference/5.1/query-filter-context.html

Practically, this means if you were doing `.build('v2')` in your bodybuilder
queries it will have no effect and you will no longer need to do so in
bodybuilder 2. If you are using build() without the 'v2' argument please be
aware of this change, and if you  want to preserve the old functionality pass
the argument 'v1' as in `build('v1')`. For example:

```js
// before
var body = new Bodybuilder().query('match', 'message', 'test').build('v2')

// after, with v2 dsl
var body = bodybuilder().query('match', 'message', 'test').build()

// or, with v1 dsl
var body = bodybuilder().query('match', 'message', 'test').build('v1')
```

### Nested `path` must be explicit

Previously when using the `nested` filter type, bodybuilder would imply the
`path` of the parent field to help build the query. This is no longer implicit
and must be specified in the query. For example:

```js
// before
new Bodybuilder().filter('nested', 'path', 'obj1', (q) => q.filter('match', 'color', 'blue')).build()

// after
bodyBuilder().filter('nested', 'path', 'obj1', (q) => q.filter('match', 'obj1.color', 'blue')).build()
```

### Filter(s) aggregations

If you are using the api for filter or filters aggregations using a callback
for the second argument, please update to the standard api for nesting subaggregations.

```js
// before
new BodyBuilder()
  .aggregation('filter', filterBuilder => {
    return filterBuilder.filter('term', 'color', 'red')
  }, 'red_products', agg => agg.aggregation('avg', 'price', 'avg_price'))
  .build()
// after

bodyBuilder().aggregation('filter', 'red_products', (a) => {
  return a.filter('term', 'color', 'red')
          .aggregation('avg', 'price', 'avg_price')
  })
  .build()
```
