# bodybuilder

An elasticsearch query body builder.

This library is **under construction** but feel free to use it while features
are being added.

## Install

    npm install

## Usage

```js
var BodyBuilder = require('bodybuilder');
var bodyBuilder = new BodyBuilder();
var body = bodyBuilder.filter('term', 'user', 'kimchy')
                      .filter('term', 'user', 'herald')
                      .orFilter('term', 'user', 'johnny')
                      .notFilter('term', 'user', 'cassie')
                      .aggregation('terms', 'user')

/**
 * body = {
 *     query: {
 *       filtered: {
 *         filter: {
 *           bool: {
 *             must: [
 *               {term: {user: 'kimchy'}},
 *               {term: {user: 'herald'}}
 *             ],
 *             should: [
 *               {term: {user: 'johnny'}}
 *             ],
 *             must_not: [
 *               {term: {user: 'cassie'}}
 *             ]
 *           }
 *         }
 *       },
 *       aggregations: {
 *         agg_terms_user: {
 *           terms: {
 *             field: 'user'
 *           }
 *         }
 *       }
 *     }
 *   })
 * }
 */
```

## Test

Run unit tests:

    npm test
