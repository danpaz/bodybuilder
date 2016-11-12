import test from 'tape'
import boolQuery from '../src/bool-query'

test('should create a bool query', (t) => {
  t.plan(1)

  let query = {match: {message: 'this is a test'}}
  let result = boolQuery('and', query)

  t.deepEqual(result, {
    bool: {
      must: [
        {
          match: {
            message: 'this is a test'
          }
        }
      ]
    }
  })
})
