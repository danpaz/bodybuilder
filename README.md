# bodybuilder

An elasticsearch query body builder. Easily build complex queries for
elasticsearch with a simple, predictable api.

![bodybuilder](img/bodybuilder.jpeg)

## Install

    npm install bodybuilder

## Usage

    var Bodybuilder = require('bodybuilder');
    var body = new Bodybuilder();

### Queries

Use `addQuery(queryType, fieldToQuery, searchTerm)` to build a query.

```js
var body = new Bodybuilder().addQuery('match', 'message', 'this is a test');
// body == {
//   query: {
//     filtered: {
//       query: {
//         match: {
//           message: 'this is a test'
//         }
//       }
//     }
//   }
// }
```

### Filters

Use `filter(filterType, fieldToFilter, searchTerm)` to build a filtered query.

```js
var body = new Bodybuilder().filter('term', 'message', 'test');
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

Use `aggregation(aggType, fieldToAgg, optionalAggName)`, or `agg`, to build an
aggregation query. The optional aggregation name defaults to
`agg_<aggType>_<fieldToAgg>`.

```js
var body = new BodyBuilder().aggregation('terms', 'user')
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
var body = new BodyBuilder().addQuery('match', 'message', 'this is a test')
                            .filter('term', 'user', 'kimchy')
                            .filter('term', 'user', 'herald')
                            .orFilter('term', 'user', 'johnny')
                            .notFilter('term', 'user', 'cassie')
                            .aggregation('terms', 'user');

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
                            .sort('date');
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
                            .from(10);
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
                            .rawOption('_sourceExclude', 'verybigfield');
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
