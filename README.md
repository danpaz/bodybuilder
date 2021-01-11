# bodybuilder
[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors)
[![npm version](https://badge.fury.io/js/bodybuilder.svg)](https://www.npmjs.com/package/bodybuilder)
[![Build Status](https://travis-ci.org/danpaz/bodybuilder.svg?branch=master)](https://travis-ci.org/danpaz/bodybuilder)

An elasticsearch query body builder. Easily build complex queries for
elasticsearch with a simple, predictable api.

![bodybuilder](img/bodybuilder.jpeg)

# Documentation

**Check out the [API documentation](http://bodybuilder.js.org/docs)** for details and examples.

Use https://bodybuilder.js.org/ to test your constructions.

## Elasticsearch compatibility

Currently aims to support the full elasticsearch query DSL for all versions.

The elasticsearch 1.x query DSL is supported by providing a `v1` argument
when calling the `build` function.

## Install

    npm install bodybuilder --save

## Usage

```js
var bodybuilder = require('bodybuilder')
var body = bodybuilder().query('match', 'message', 'this is a test')
body.build() // Build 2.x or greater DSL (default)
body.build('v1') // Build 1.x DSL
```

For each elasticsearch query body, create an instance of `bodybuilder`, apply
the desired query/filter/aggregation clauses, and call `build` to retrieve the
built query body.

## REPL

Try it out on the command line using the node REPL:

    # Start the repl
    node ./node_modules/bodybuilder/repl.js
    # The builder is available in the context variable bodybuilder
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

### Suggestions

```js
bodybuilder().suggest([arguments])
```

Creates a `phrase` or `term` suggestion.

#### Arguments

The specific arguments depend on the type of aggregation, but typically follow
this pattern:

* `suggestionType` - This can be either `phrase` or `term`.
* `fieldToAggregate` - The name of the field in your index to suggest on.
* `options` - An object of fields to include in the suggestions.
  * `text` - The query to run on our suggest field.
  * `name` - A custom name for the suggest clause.
  * `analyzer` - The name of an analyzer to run on a suggestion.
  * ... other suggest specific options, see [typings]('./bodybuilder.d.ts') or the [ElasticSearch suggest docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html) for more info



```js
var body = bodybuilder().suggest('term', 'user', { text: 'kimchy', 'name': 'user_suggest'}).build()
// body == {
//   aggregations: {
//     user_suggest: {
//       text: 'kimchy',
//       term: {
//         field: 'user'
//       }
//     }
//   }
// }
```

### Combining queries, filters, aggregations, and suggestions

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
  .suggest('term', 'user' { text: 'kimchy' })
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
//   suggest_term_user: {
//     text: 'kimchy',
//     term: {
//       field: 'user'
//     }
//   }
// }
```

#### Nesting Filters and Queries

It is even possible to nest filters, e.g. when some should and must filters have to be combined.

```js
var body = bodybuilder()
    .orFilter('term', 'author', 'kimchy')
    .orFilter('bool', b => b
      .filter('match', 'message', 'this is a test')
      .filter('term', 'type', 'comment')
    )
    .build()

// body == {
//   query: {
//     bool: {
//       filter: {
//         bool: {
//           should: [
//             { term: { author: 'kimchy' } },
//             { bool: { must: [
//               { match: { message: 'this is a test' } },
//               { term: { type: 'comment' } }
//             ] } }
//           ]
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
**Advanced usage:** Set a sort configuration object for the given sort field with additional [sort properties](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-sort.html).
`sort(field, { sort: 'asc', mode: 'min', ...})`

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/5665333?v=4" width="100px;"/><br /><sub>Daniel Paz-Soldan</sub>](http://danpaz.me/)<br />[💻](https://github.com/danpaz/bodybuilder/commits?author=danpaz "Code") [📖](https://github.com/danpaz/bodybuilder/commits?author=danpaz "Documentation") [🚇](#infra-danpaz "Infrastructure (Hosting, Build-Tools, etc)") [🤔](#ideas-danpaz "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/476069?v=4" width="100px;"/><br /><sub>Nicolás Fantone</sub>](https://github.com/nfantone)<br />[💻](https://github.com/danpaz/bodybuilder/commits?author=nfantone "Code") [⚠️](https://github.com/danpaz/bodybuilder/commits?author=nfantone "Tests") | [<img src="https://avatars0.githubusercontent.com/u/967979?v=4" width="100px;"/><br /><sub>Nauval Atmaja</sub>](http://nauvalatmaja.com)<br />[💻](https://github.com/danpaz/bodybuilder/commits?author=npatmaja "Code") | [<img src="https://avatars2.githubusercontent.com/u/159764?v=4" width="100px;"/><br /><sub>Ferron H</sub>](https://ferronrsmith.github.io/)<br />[💻](https://github.com/danpaz/bodybuilder/commits?author=ferronrsmith "Code") [⚠️](https://github.com/danpaz/bodybuilder/commits?author=ferronrsmith "Tests") [🐛](https://github.com/danpaz/bodybuilder/issues?q=author%3Aferronrsmith "Bug reports") [📖](https://github.com/danpaz/bodybuilder/commits?author=ferronrsmith "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/352835?v=4" width="100px;"/><br /><sub>Dave Cranwell</sub>](http://davecranwell.com)<br />[💻](https://github.com/danpaz/bodybuilder/commits?author=davecranwell "Code") | [<img src="https://avatars0.githubusercontent.com/u/5310458?v=4" width="100px;"/><br /><sub>Johannes Scharlach</sub>](https://github.com/johannes-scharlach)<br />[💻](https://github.com/danpaz/bodybuilder/commits?author=johannes-scharlach "Code") [📖](https://github.com/danpaz/bodybuilder/commits?author=johannes-scharlach "Documentation") [🤔](#ideas-johannes-scharlach "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/102233?v=4" width="100px;"/><br /><sub>Anton Samper Rivaya</sub>](https://rivaya.com)<br />[💻](https://github.com/danpaz/bodybuilder/commits?author=antonsamper "Code") [📖](https://github.com/danpaz/bodybuilder/commits?author=antonsamper "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars2.githubusercontent.com/u/22251956?v=4" width="100px;"/><br /><sub>Suhas Karanth</sub>](https://github.com/sudo-suhas)<br />[💬](#question-sudo-suhas "Answering Questions") | [<img src="https://avatars1.githubusercontent.com/u/130874?v=4" width="100px;"/><br /><sub>Jacob Gillespie</sub>](https://github.com/jacobwgillespie)<br />[💻](https://github.com/danpaz/bodybuilder/commits?author=jacobwgillespie "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
