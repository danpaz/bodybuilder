import test from 'tape'
import bodyBuilder from '../src/body-builder'

test('bodyBuilder should build query with no field', (t) => {
  t.plan(1)

  const result = bodyBuilder().query('match_all')

  t.deepEqual(result.getQuery(), {
    match_all: {}
  })
})

test('bodyBuilder should build query with field but no value', (t) => {
  t.plan(1)

  const result = bodyBuilder().query('exists', 'user')

  t.deepEqual(result.getQuery(), {
    exists: {
      field: 'user'
    }
  })
})

test('bodyBuilder should create query and filter', (t) => {
  t.plan(2)

  const result = bodyBuilder()
    .query('exists', 'user')
    .filter('term', 'user', 'kimchy')

  t.deepEqual(result.getQuery(), {
    exists: {
      field: 'user'
    }
  })
  t.deepEqual(result.getFilter(), {
    term: {
      user: 'kimchy'
    }
  })
})

test('bodyBuilder should build a filtered query', (t) => {
  t.plan(1)

  const result = bodyBuilder()
    .query('match', 'message', 'this is a test')
    .filter('term', 'user', 'kimchy')
    .build()

  t.deepEqual(result, {
    query: {
      filtered: {
        query: {
          match: {
            message: 'this is a test'
          }
        },
        filter: {
          term: {
            user: 'kimchy'
          }
        }
      }
    }
  })
})


test('bodyBuilder should build a filtered query for version 2.x', (t) => {
  t.plan(1)

  const result = bodyBuilder()
    .query('match', 'message', 'this is a test')
    .filter('term', 'user', 'kimchy')
    .build('v2')

  t.deepEqual(result, {
    query: {
      bool: {
        must: {
          match: {
            message: 'this is a test'
          }
        },
        filter: {
          term: {user: 'kimchy'}
        }
      }
    }
  })
})

test('bodyBuilder should sort with default sort direction', (t) => {
  t.plan(1)

  const result = bodyBuilder().sort('timestamp').build()

  t.deepEqual(result, {
    sort: [
      {
        timestamp: {
          order: 'asc'
        }
      }
    ]
  })
})

test('bodyBuilder should set from on body', (t) => {
  t.plan(1)

  const result = bodyBuilder().from(10).build()

  t.deepEqual(result, {
    from: 10
  })
})

test('bodyBuilder should set size on body', (t) => {
  t.plan(1)

  const result = bodyBuilder().size(10).build()

  t.deepEqual(result, {
    size: 10
  })
})

test('bodyBuilder should set any key-value on body', (t) => {
  t.plan(1)

  const result = bodyBuilder().rawOption('a', {b: 'c'}).build()

  t.deepEqual(result, {
    a: { b: 'c' }
  })
})

test('bodyBuilder should build query with field and value', (t) => {
  t.plan(1)

  const result = bodyBuilder().query('term', 'user', 'kimchy')

  t.deepEqual(result.getQuery(), {
    term: {
      user: 'kimchy'
    }
  })
})

test('bodyBuilder should build query with field and object value', (t) => {
  t.plan(1)

  const result = bodyBuilder().query('range', 'date', {gt: 'now-1d'})

  t.deepEqual(result.getQuery(), {
    range: {
      date: {gt: 'now-1d'}
    }
  })
})

test('bodyBuilder should build query with more options', (t) => {
  t.plan(1)

  const result = bodyBuilder().query('geo_distance', 'point', {lat: 40, lon: 20}, {distance: '12km'})

  t.deepEqual(result.getQuery(), {
    geo_distance: {
      distance: '12km',
      point: {
        lat: 40,
        lon: 20
      }
    }
  })
})

test('bodyBuilder should build nested queries', (t) => {
  t.plan(1)

  const result = bodyBuilder().query('nested', 'path', 'obj1', (q) => q.query('match', 'obj1.color', 'blue'))

  t.deepEqual(result.getQuery(), {
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

test('bodyBuilder should nest bool-merged queries', (t) => {
  t.plan(1)

  const result = bodyBuilder().query('nested', 'path', 'obj1', {score_mode: 'avg'}, (q) => {
    return q.query('match', 'obj1.name', 'blue').query('range', 'obj1.count', {gt: 5})
  })

  t.deepEqual(result.getQuery(), {
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

test('bodyBuilder should make this chained nested query', (t) => {
  t.plan(1)

  const result = bodyBuilder()
    .query('match', 'title', 'eggs')
    .query('nested', 'path', 'comments', {score_mode: 'max'} , (q) => {
      return q
        .query('match', 'comments.name', 'john')
        .query('match', 'comments.age', 28)
  })

  t.deepEqual(result.getQuery(), {
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

test('bodyBuilder should create this big-ass query', (t) => {
  t.plan(1)

  const result = bodyBuilder().query('constant_score', (q) => {
    return q
      .orFilter('term', 'created_by.user_id', 'abc')
      .orFilter('nested', 'path', 'doc_meta', {}, (q) => {
        return q.query('constant_score', (q) => {
          return q.filter('term', 'doc_meta.user_id', 'abc')
        })
      })
      .orFilter('nested', 'path', 'tests', {}, (q) => {
        return q.query('constant_score', (q) => {
          return q.filter('term', 'tests.created_by.user_id', 'abc')
        })
      })
  })

  t.deepEqual(result.getQuery(), {
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
