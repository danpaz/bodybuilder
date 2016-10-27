import test from 'tape'
import QueryBuilder from '../src/query-builder'

test('QueryBuilder should build query with no field', (t) => {
  t.plan(1)

  const result = new QueryBuilder().query('match_all')

  t.deepEqual(result._queries, {
    match_all: {}
  })
})

test('QueryBuilder should build query with field but no value', (t) => {
  t.plan(1)

  const result = new QueryBuilder().query('exists', 'user')

  t.deepEqual(result._queries, {
    exists: {
      field: 'user'
    }
  })
})

test('QueryBuilder should build query with field and value', (t) => {
  t.plan(1)

  const result = new QueryBuilder().query('term', 'user', 'kimchy')

  t.deepEqual(result._queries, {
    term: {
      user: 'kimchy'
    }
  })
})

test('QueryBuilder should build query with field and object value', (t) => {
  t.plan(1)

  const result = new QueryBuilder().query('range', 'date', {gt: 'now-1d'})

  t.deepEqual(result._queries, {
    range: {
      date: {gt: 'now-1d'}
    }
  })
})

test('QueryBuilder should build query with more options', (t) => {
  t.plan(1)

  const result = new QueryBuilder().query('geo_distance', 'point', {lat: 40, lon: 20}, {distance: '12km'})

  t.deepEqual(result._queries, {
    geo_distance: {
      distance: '12km',
      point: {
        lat: 40,
        lon: 20
      }
    }
  })
})

test('QueryBuilder should build nested queries', (t) => {
  t.plan(1)

  const result = new QueryBuilder().query('nested', 'path', 'obj1', (q) => q.query('match', 'obj1.color', 'blue'))

  t.deepEqual(result._queries, {
    nested: {
      path: 'obj1',
      query: {
        match: {
          'obj1.color': 'blue'
        }
      }
    }
  })
})

test('QueryBuilder should nest bool-merged queries', (t) => {
  t.plan(1)

  const result = new QueryBuilder().query('nested', 'path', 'obj1', {score_mode: 'avg'}, (q) => {
    return q.query('match', 'obj1.name', 'blue').query('range', 'obj1.count', {gt: 5})
  })

  t.deepEqual(result._queries, {
    nested: {
      path: 'obj1',
      score_mode: 'avg',
      query: {
        bool: {
          must: [
            {
              match: {'obj1.name': 'blue'}
            },
            {
              range: {'obj1.count': {gt: 5}}
            }
          ]
        }
      }
    }
  })
})

test('QueryBuilder should make this chained nested query', (t) => {
  t.plan(1)

  const result = new QueryBuilder().query('match', 'title', 'eggs').query('nested', 'path', 'comments', {score_mode: 'max'} , (q) => {
      return q.query('match', 'comments.name', 'john').query('match', 'comments.age', 28)    
  })

  t.deepEqual(result._queries, {
    bool: {
      must: [
        {
          match: {
            title: 'eggs'
          }
        },
        {
          nested: {
            path: 'comments',
            score_mode: 'max', 
            query: {
              bool: {
                must: [
                  {
                    match: {
                      'comments.name': 'john'
                    }
                  },
                  {
                    match: {
                      'comments.age': 28
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }
  })
})

test('QueryBuilder should create this big-ass query', (t) => {
  t.plan(1)

  const result = new QueryBuilder().query('constant_score', '', '', {}, (q) => {
    return q.orFilter('term', 'created_by.user_id', 'abc')
            .orFilter('nested', 'path', 'doc_meta', {}, (q) => {
              return q.query('constant_score', '', '', {}, (q) => {
                return q.filter('term', 'doc_meta.user_id', 'abc')
              })
            })
            .orFilter('nested', 'path', 'tests', {}, (q) => {
              return q.query('constant_score', '', '', {}, (q) => {
                return q.filter('term', 'tests.created_by.user_id', 'abc')
              })
            })
          })

  t.deepEqual(result._queries, {    
    constant_score: {
      filter: {
        bool: {
          should: [
            {
              term: {
                'created_by.user_id': 'abc'
              }
            }, {
              nested: {
                path: 'doc_meta',
                query: {
                  constant_score: {
                    filter: {
                      term: {
                        'doc_meta.user_id': 'abc'
                      }
                    }
                  }
                }
              }
            }, {
              nested: {
                path: 'tests',
                query: {
                  constant_score: {
                    filter: {
                      term: {
                        'tests.created_by.user_id': 'abc'
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      }
    }
  })
})

