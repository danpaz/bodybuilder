# bodybuilder

[![npm version](https://badge.fury.io/js/bodybuilder.svg)](https://www.npmjs.com/package/bodybuilder)
[![Build Status](https://travis-ci.org/danpaz/bodybuilder.svg?branch=master)](https://travis-ci.org/danpaz/bodybuilder)

An elasticsearch query body builder. Easily build complex queries for
elasticsearch with a simple, predictable api.

![bodybuilder](img/bodybuilder.jpeg)

## Upgrading to bodybuilder 2

See the [migration guide](./docs/migrate-to-2.md) if you are upgrading from
bodybuilder 1 to bodybuilder 2.

## Elasticsearch compatibility

Currently aims to support the full elasticsearch query DSL for versions 1.x,
2.x, and 5.x.

The elasticsearch 1.x query DSL is supported by providing a `v1` argument
when calling the `build` function.

## Install

    npm install bodybuilder --save

## Usage

```js
var bodybuilder = require('bodybuilder')
var body = bodybuilder().query('match', 'message', 'this is a test')
body.build() // Build 2.x / 5.x DSL (default)
body.build('v1') // Build 1.x DSL
```

For each elasticsearch query body, create an instance of `Bodybuilder`, apply
the desired query/filter/aggregation clauses, and call `build` to retrieve the
built query body.

## REPL

Try it out on the command line using the node REPL:

    # Start the repl
    node ./node_modules/bodybuilder/repl.js
    # The builder is available in the context variable Bodybuilder
    bodybuilder > bodybuilder().query('match', 'message', 'this is a test').build()

### Queries

```js
bodybuilder().query([arguments])
```

Creates a query of type `queryType`.

#### Arguments

The specific arguments depend on the type of query, but typically follow this
pattern:

* `queryType` - The name of the query, such as `'term'` or `'prefix'`.
* `fieldToQuery` - The name of the field in your index to query over.
* `searchTerm` - The string to search for.

```js
var body = bodybuilder().query('match', 'message', 'this is a test').build()
// body == {
//   query: {
//     match: {
//       message: 'this is a test'
//     }
//   }
// }
```

### Filters

```js
bodybuilder().filter([arguments])
```

Creates a filtered query using filter of type `filterType`.

#### Arguments

The specific arguments depend on the type of filter, but typically follow this
pattern:

* `filterType` - The name of the query, such as `'regexp'` or `'exists'`.
* `fieldToQuery` - The name of the field in your index to filter on.
* `searchTerm` - The string to search for.

```js
bodybuilder().filter('term', 'message', 'test').build()
// body == {
//   query: {
//     bool: {
//       filter: {
//         term: {
//           message: 'test'
//         }
//       }
//     }
//   }
// }
```

### Aggregations

```js
bodybuilder().aggregation([arguments])
```

Creates an aggregation of type `aggregationType`.

#### Arguments

The specific arguments depend on the type of aggregation, but typically follow
this pattern:

* `aggregationType` - The name of the aggregation, such as `'sum'` or `'terms'`.
* `fieldToAggregate` - The name of the field in your index to aggregate over.
* `aggregationName` - (optional) A custom name for the aggregation. Defaults to
`agg_<aggregationType>_<fieldToAggregate>`.
* `aggregationOptions` - (optional) Additional key-value pairs to include in the
aggregation object.
* `nestingFunction` - (optional) A function used to define aggregations as
children of the one being created. This _must_ be the last parameter set.

```js
var body = bodybuilder().aggregation('terms', 'user').build()
// body == {
//   aggregations: {
//     agg_terms_user: {
//       terms: {
//         field: 'user'
//       }
//     }
//   }
// }
```

#### Nested aggregations

To nest aggregations, pass a `function` as the last parameter in `[arguments]`.
The `function` receives the recently built aggregation instance and is expected
to return an `Object` which will be assigned to `.aggs` on the current
aggregation. Aggregations in this scope behave like builders and you can call
the chainable method `.aggregation([arguments])` on them just as you would on
the main `bodybuilder`.

```js
var body = bodybuilder().aggregation('terms', 'code', {
      order: { _term: 'desc' },
      size: 1
    }, agg => agg.aggregation('terms', 'name')).build()
// body == {
//   "aggregations": {
//       "agg_terms_code": {
//           "terms": {
//               "field": "code",
//               "order": {
//                   "_term": "desc"
//               },
//               "size": 1
//           },
//           "aggs": {
//               "agg_terms_name": {
//                   "terms": {
//                       "field": "name"
//                   }
//               }
//           }
//       }
//   }
//}
```

### Combining queries, filters, and aggregations

Multiple queries and filters are merged using the boolean query or filter (see
[Combining Filters](https://www.elastic.co/guide/en/elasticsearch/guide/current/combining-filters.html)).

```js
var body = bodybuilder()
  .query('match', 'message', 'this is a test')
  .filter('term', 'user', 'kimchy')
  .filter('term', 'user', 'herald')
  .orFilter('term', 'user', 'johnny')
  .notFilter('term', 'user', 'cassie')
  .aggregation('terms', 'user')
  .build()

// body == {
//   query: {
//     bool: {
//       must: {
//         match: {
//           message: 'this is a test'
//         }
//       },
//       filter: {
//         bool: {
//           must: [
//             {term: {user: 'kimchy'}},
//             {term: {user: 'herald'}}
//           ],
//           should: [
//             {term: {user: 'johnny'}}
//           ],
//           must_not: [
//             {term: {user: 'cassie'}}
//           ]
//         }
//       }
//     },
//   },
//   aggs: {
//     agg_terms_user: {
//       terms: {
//         field: 'user'
//       }
//     }
//   }
// }
```

### Sort

Set a sort direction using `sort(field, direction)`, where direction defaults to
ascending.

```js
var body = bodybuilder()
    .filter('term', 'message', 'test')
    .sort('timestamp', 'desc')
    .sort([{
      "channel": {
        "order": "desc"
      }
    }])
    .sort([
      {"categories": "desc"},
      {"content": "asc"}
    ])
    .build()

// body == {
//   sort: [{
//       "timestamp": {
//         "order": "desc"
//       }
//     },
//     {
//       "channel": {
//         "order": "desc"
//       }
//     },
//     {
//       "categories": {
//         "order": "desc"
//       }
//     },
//     {
//       "content": {
//         "order": "asc"
//       }
//     }
//   ],
//   query: {
//     bool: {
//       filter: {
//         term: {
//           message: 'test'
//         }
//       }
//     }
//   }
// }
```

### From / Size

Set `from` and `size` parameters to configure the offset and maximum hits to be
returned.

```js
var body = bodybuilder()
  .filter('term', 'message', 'test')
  .size(5)
  .from(10)
  .build()

// body == {
//   size: 5,
//   from: 10,
//   query: {
//     bool: {
//       filter: {
//         term: {
//           message: 'test'
//         }
//       }
//     }
//   }
// }
```

### Other Options

Set any other search request option using `rawOption` passing in the key-value
pair to include in the body.

```js
var body = bodybuilder()
  .filter('term', 'message', 'test')
  .rawOption('_sourceExclude', 'verybigfield')
  .build()

// body == {
//   _sourceExclude: 'verybigfield',
//   query: {
//     bool: {
//       filter: {
//         term: {
//           message: 'test'
//         }
//       }
//     }
//   }
// }
```

## Test

Run unit tests:

    npm test
