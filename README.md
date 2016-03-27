# bodybuilder

[![npm version](https://badge.fury.io/js/bodybuilder.svg)](https://www.npmjs.com/package/bodybuilder)
[![Build Status](https://travis-ci.org/danpaz/bodybuilder.svg?branch=master)](https://travis-ci.org/danpaz/bodybuilder)

An elasticsearch query body builder. Easily build complex queries for
elasticsearch with a simple, predictable api.

![bodybuilder](img/bodybuilder.jpeg)

## Compatibility

Currently aims to support the full elasticsearch query DSL for versions 1.x.
The elasticsearch 2.x query DSL is supported by providing a `v2` arguments
when calling `build` function.

Contributions are welcome!

## Install

    npm install bodybuilder --save

## Usage

```js
var Bodybuilder = require('bodybuilder')
var body = new Bodybuilder() // A builder instance.
body.query('match', 'message', 'this is a test')
body.build() // Build 1.x DSL
body.build('v2') // Build 2.x DSL
```

For each elasticsearch query body, create an instance of `Bodybuilder`, apply
the desired query/filter/aggregation clauses, and call `build` to retrieve the
built query body.

## REPL

Try it out on the command line using the node repl:

    # Start the repl
    node repl.js
    # The Bodybuilder class is available in the context variable Bodybuilder
    bodybuilder > var body = new Bodybuilder()
    bodybuilder > body.query('match', 'message', 'this is a test').build()

### Queries

```js
body.query(queryType, [arguments])
```

Creates a query of type `queryType`. Currently supported query types are listed
[here](./src/queries/index.js).

#### Arguments

The specific arguments depend on the type of query, but typically follow this
pattern:

* `queryType` - The name of the query, such as `'term'` or `'prefix'`.
* `fieldToQuery` - The name of the field in your index to query over.
* `searchTerm` - The string to search for.

```js
var body = new Bodybuilder().query('match', 'message', 'this is a test').build()
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
body.filter(filterType, [arguments])
```

Creates a filtered query using filter of type `filterType`. Currently supported
filter types are listed [here](./src/filters/index.js).

#### Arguments

The specific arguments depend on the type of filter, but typically follow this
pattern:

* `filterType` - The name of the query, such as `'regexp'` or `'exists'`.
* `fieldToQuery` - The name of the field in your index to filter on.
* `searchTerm` - The string to search for.

```js
var body = new Bodybuilder().filter('term', 'message', 'test').build()
// body == {
//   query: {
//     filtered: {
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
body.aggregation(aggregationType, [arguments])
```

Creates an aggregation of type `aggregationType`. Currently supported
aggregation types are listed [here](./src/aggregations/index.js).

#### Arguments

The specific arguments depend on the type of aggregation, but typically follow
this pattern:

* `aggregationType` - The name of the aggregation, such as `'sum'` or `'terms'`.
* `fieldToAggregate` - The name of the field in your index to aggregate over.
* `aggregationName` - (optional) A custom name for the aggregation. Defaults to
`agg_<aggregationType>_<fieldToAggregate>`.

```js
var body = new BodyBuilder().aggregation('terms', 'user').build()
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

### Combining queries, filters, and aggregations

Multiple queries and filters are merged using the boolean query or filter (see
[Combining Filters](https://www.elastic.co/guide/en/elasticsearch/guide/current/combining-filters.html)).

```js
var body = new BodyBuilder().query('match', 'message', 'this is a test')
                            .filter('term', 'user', 'kimchy')
                            .filter('term', 'user', 'herald')
                            .orFilter('term', 'user', 'johnny')
                            .notFilter('term', 'user', 'cassie')
                            .aggregation('terms', 'user')
                            .build()

// body == {
//   query: {
//     filtered: {
//       query: {
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
//     aggregations: {
//       agg_terms_user: {
//         terms: {
//           field: 'user'
//         }
//       }
//     }
//   }
// }
```

### Sort

Set a sort direction using `sort(field, direction)`, where direction defaults to
ascending.

```js
var body = new Bodybuilder().filter('term', 'message', 'test')
                            .sort('date')
                            .build()
// body == {
//   sort: {
//     date: {
//       order: 'asc'
//     }
//   },
//   query: {
//     filtered: {
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
var body = new Bodybuilder().filter('term', 'message', 'test')
                            .size(5)
                            .from(10)
                            .build()
// body == {
//   size: 5,
//   from: 10,
//   query: {
//     filtered: {
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
var body = new Bodybuilder().filter('term', 'message', 'test')
                            .rawOption('_sourceExclude', 'verybigfield')
                            .build()
// body == {
//   _sourceExclude: 'verybigfield',
//   query: {
//     filtered: {
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
