import test from 'tape'
import queryBuilder from '../src/query-builder'

test('queryBuilder | match_all', (t) => {
  t.plan(1)

  const result = queryBuilder().query('match_all')

  t.deepEqual(result.getQuery(), {
    match_all: {}
  })
})

test('queryBuilder | match_all with boost', (t) => {
  t.plan(1)

  const result = queryBuilder().query('match_all', { boost: 1.2 })

  t.deepEqual(result.getQuery(), {
    match_all: {
      boost: 1.2
    }
  })
})

test('queryBuilder | match_none', (t) => {
  t.plan(1)

  const result = queryBuilder().query('match_none')

  t.deepEqual(result.getQuery(), {
    match_none: {}
  })
})

test('queryBuilder | match', (t) => {
  t.plan(1)

  const result = queryBuilder().query('match', 'message', 'this is a test')

  t.deepEqual(result.getQuery(), {
    match: {
      message: 'this is a test'
    }
  })
})

test('queryBuilder | match empty string', (t) => {
  t.plan(1)

  const result = queryBuilder().query('match', 'message', '')

  t.deepEqual(result.getQuery(), {
    match: {
      message: ''
    }
  })
})

test('queryBuilder | match with options', (t) => {
  t.plan(1)

  const result = queryBuilder().query('match', 'message', {
    query: 'this is a test',
    operator: 'and'
  })

  t.deepEqual(result.getQuery(), {
    match: {
      message: {
        query: 'this is a test',
        operator: 'and'
      }
    }
  })
})

test('queryBuilder | match_phrase', (t) => {
  t.plan(1)

  const result = queryBuilder().query('match_phrase', 'message', 'this is a test')

  t.deepEqual(result.getQuery(), {
    match_phrase: {
      message: 'this is a test'
    }
  })
})

test('queryBuilder | match_phrase with options', (t) => {
  t.plan(1)

  const result = queryBuilder().query('match_phrase', 'message', {
    query: 'this is a test',
    analyzer: 'my_analyzer'
  })

  t.deepEqual(result.getQuery(), {
    match_phrase: {
      message: {
        query: 'this is a test',
        analyzer: 'my_analyzer'
      }
    }
  })
})

test('queryBuilder | common', (t) => {
  t.plan(1)

  const result = queryBuilder().query('common', 'body', {
    query: 'this is bonsai cool',
    cutoff_frequency: 0.001
  })

  t.deepEqual(result.getQuery(), {
    common: {
      body: {
        query: 'this is bonsai cool',
        cutoff_frequency: 0.001
      }
    }
  })
})

test('queryBuilder | common', (t) => {
  t.plan(1)

  const result = queryBuilder().query('common', 'body', {
    query: 'this is bonsai cool',
    cutoff_frequency: 0.001
  })

  t.deepEqual(result.getQuery(), {
    common: {
      body: {
        query: 'this is bonsai cool',
        cutoff_frequency: 0.001
      }
    }
  })
})

test('queryBuilder | query_string', (t) => {
  t.plan(1)

  const result = queryBuilder().query('query_string', 'query', 'this AND that OR thus')

  t.deepEqual(result.getQuery(), {
    query_string: {
      query: 'this AND that OR thus'
    }
  })
})

test('queryBuilder | query_string with options', (t) => {
  t.plan(1)

  const result = queryBuilder().query('query_string', 'query', 'this AND that OR thus', {
    fields: ['content', 'name']
  })

  t.deepEqual(result.getQuery(), {
    query_string: {
      query: 'this AND that OR thus',
      fields: ['content', 'name']
    }
  })
})

test('queryBuilder | query_string alternative', (t) => {
  t.plan(1)

  const result = queryBuilder().query('query_string', {
    query: 'this AND that OR thus',
    fields: ['content', 'name']
  })

  t.deepEqual(result.getQuery(), {
    query_string: {
      query: 'this AND that OR thus',
      fields: ['content', 'name']
    }
  })
})

test('queryBuilder | simple_query_string', (t) => {
  t.plan(1)

  const result = queryBuilder().query('simple_query_string', 'query', 'foo bar baz')

  t.deepEqual(result.getQuery(), {
    simple_query_string: {
      query: 'foo bar baz'
    }
  })
})

test('queryBuilder | term', (t) => {
  t.plan(1)

  const result = queryBuilder().query('term', 'user', 'kimchy')

  t.deepEqual(result.getQuery(), {
    term: {
      user: 'kimchy'
    }
  })
})

test('queryBuilder | term with boost', (t) => {
  t.plan(1)

  const result = queryBuilder().query('term', 'status', {
    value: 'urgent',
    boost: '2.0'
  })

  t.deepEqual(result.getQuery(), {
    term: {
      status: {
        value: 'urgent',
        boost: '2.0'
      }
    }
  })
})

test('queryBuilder | term multiple', (t) => {
  t.plan(1)

  const result = queryBuilder()
    .orQuery('term', 'status', {
      value: 'urgent',
      boost: '2.0'
    })
    .orQuery('term', 'status', 'normal')

  t.deepEqual(result.getQuery(), {
    bool: {
      should: [{
        term: {
          status: {
            value: 'urgent',
            boost: '2.0'
          }
        }
      }, {
        term: {
          status: 'normal'
        }
      }]
    }
  })
})

test('queryBuilder | terms', (t) => {
  t.plan(1)

  const result = queryBuilder().query('terms', 'user', ['kimchy', 'elastic'])

  t.deepEqual(result.getQuery(), {
    terms: {
      user: ['kimchy', 'elastic']
    }
  })
})

test('queryBuilder | range', (t) => {
  t.plan(1)

  const result = queryBuilder().query('range', 'age', { gte: 10 })

  t.deepEqual(result.getQuery(), {
    range: {
      age: { gte: 10 }
    }
  })
})

test('queryBuilder | exists', (t) => {
  t.plan(1)

  const result = queryBuilder().query('exists', 'user')

  t.deepEqual(result.getQuery(), {
    exists: {
      field: 'user'
    }
  })
})

test('queryBuilder | missing', (t) => {
  t.plan(1)

  const result = queryBuilder().query('missing', 'user')

  t.deepEqual(result.getQuery(), {
    missing: {
      field: 'user'
    }
  })
})

test('queryBuilder | prefix', (t) => {
  t.plan(1)

  const result = queryBuilder().query('prefix', 'user', 'ki')

  t.deepEqual(result.getQuery(), {
    prefix: {
      user: 'ki'
    }
  })
})

test('queryBuilder | prefix with boost', (t) => {
  t.plan(1)

  const result = queryBuilder().query('prefix', 'user', {value: 'ki', boost: 2})

  t.deepEqual(result.getQuery(), {
    prefix: {
      user: {
        value: 'ki',
        boost: 2
      }
    }
  })
})

test('queryBuilder | wildcard', (t) => {
  t.plan(1)

  const result = queryBuilder().query('wildcard', 'user', 'ki*y')

  t.deepEqual(result.getQuery(), {
    wildcard: {
      user: 'ki*y'
    }
  })
})

test('queryBuilder | regexp', (t) => {
  t.plan(1)

  const result = queryBuilder().query('regexp', 'name.first', 's.*y')

  t.deepEqual(result.getQuery(), {
    regexp: {
      'name.first': 's.*y'
    }
  })
})

test('queryBuilder | fuzzy', (t) => {
  t.plan(1)

  const result = queryBuilder().query('fuzzy', 'user', 'ki')

  t.deepEqual(result.getQuery(), {
    fuzzy: {
      user: 'ki'
    }
  })
})

test('queryBuilder | type', (t) => {
  t.plan(1)

  const result = queryBuilder().query('type', 'value', 'my_type')

  t.deepEqual(result.getQuery(), {
    type: {
      value: 'my_type'
    }
  })
})

test('queryBuilder | ids', (t) => {
  t.plan(1)

  const result = queryBuilder().query('ids', 'type', 'my_ids', {
    values: ['1', '4', '100']
  })

  t.deepEqual(result.getQuery(), {
    ids: {
      type: 'my_ids',
      values: ['1', '4', '100']
    }
  })
})

test('queryBuilder | constant_score', (t) => {
  t.plan(1)

  const result = queryBuilder().query('constant_score', { boost: 1.2 }, (q) => {
    return q.filter('term', 'user', 'kimchy')
  })

  t.deepEqual(result.getQuery(), {
    constant_score: {
      filter: {
        term: { user: 'kimchy' }
      },
      boost: 1.2
    }
  })
})

test('queryBuilder | nested', (t) => {
  t.plan(1)

  const result = queryBuilder().query('nested', {path: 'obj1', score_mode: 'avg'}, (q) => {
    return q.query('match', 'obj1.name', 'blue')
            .query('range', 'obj1.count', {gt: 5})
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

test('queryBuilder | has_child', (t) => {
  t.plan(1)

  const result = queryBuilder().query('has_child', 'type', 'blog_tag', (q) => {
    return q.query('term', 'tag', 'something')
  })

  t.deepEqual(result.getQuery(), {
    has_child: {
      type: 'blog_tag',
      query: {
        term: { tag: 'something' }
      }
    }
  })
})

test('queryBuilder | has_parent', (t) => {
  t.plan(1)

  const result = queryBuilder().query('has_parent', 'parent_tag', 'blog', (q) => {
    return q.query('term', 'tag', 'something')
  })

  t.deepEqual(result.getQuery(), {
    has_parent: {
      parent_tag: 'blog',
      query: {
        term: { tag: 'something' }
      }
    }
  })
})

test('queryBuilder | geo_bounding_box', (t) => {
  t.plan(1)

  const result = queryBuilder().query('geo_bounding_box', 'pin.location', {
    top_left: { lat: 40, lon: -74 },
    bottom_right: { lat: 40, lon: -74 }
  }, {
    relation: 'within'
  })

  t.deepEqual(result.getQuery(), {
    geo_bounding_box: {
      relation: 'within',
      'pin.location': {
        top_left: { lat: 40, lon: -74 },
        bottom_right: { lat: 40, lon: -74 }
      }
    }
  })
})

test('queryBuilder | geo_distance', (t) => {
  t.plan(1)

  const result = queryBuilder().query('geo_distance', 'pin.location', {
    lat: 40,
    lon: -74
  }, {
    distance: '200km'
  })

  t.deepEqual(result.getQuery(), {
    geo_distance: {
      distance: '200km',
      'pin.location': {
        lat: 40,
        lon: -74
      }
    }
  })
})

test('queryBuilder | geo_distance_range', (t) => {
  t.plan(1)

  const result = queryBuilder().query('geo_distance_range', 'pin.location', {
    lat: 40,
    lon: -74
  }, {
    from: '100km',
    to: '200km'
  })

  t.deepEqual(result.getQuery(), {
    geo_distance_range: {
      from: '100km',
      to: '200km',
      'pin.location': {
        lat: 40,
        lon: -74
      }
    }
  })
})

test('queryBuilder | geo_polygon', (t) => {
  t.plan(1)

  const result = queryBuilder().query('geo_polygon', 'person.location', {
    points: [
      {lat : 40, lon : -70},
      {lat : 30, lon : -80},
      {lat : 20, lon : -90}
    ]
  })

  t.deepEqual(result.getQuery(), {
    geo_polygon: {
      'person.location': {
        points: [
          {lat : 40, lon : -70},
          {lat : 30, lon : -80},
          {lat : 20, lon : -90}
        ]
      }
    }
  })
})

test('queryBuilder | geohash_cell', (t) => {
  t.plan(1)

  const result = queryBuilder().query('geohash_cell', 'pin', {
    lat: 13.4080,
    lon: 52.5186
  }, {
    precision: 3,
    neighbors: true
  })

  t.deepEqual(result.getQuery(), {
    geohash_cell: {
      pin: {
        lat: 13.4080,
        lon: 52.5186
      },
      precision: 3,
      neighbors: true
    }
  })
})

test('queryBuilder | more_like_this', (t) => {
  t.plan(1)

  const result = queryBuilder().query('more_like_this', {
    fields: ['title', 'description'],
    like: "Once upon a time",
    min_term_freq: 1,
    max_query_terms: 12
  })

  t.deepEqual(result.getQuery(), {
    more_like_this: {
      fields: ['title', 'description'],
      like: "Once upon a time",
      min_term_freq: 1,
      max_query_terms: 12
    }
  })
})

test('queryBuilder | template', (t) => {
  t.plan(1)

  const result = queryBuilder().query('template', {
    inline: { match: { text: '{{query_string}}' }},
    params: {
      query_string: 'all about search'
    }
  })

  t.deepEqual(result.getQuery(), {
    template: {
      inline: { match: { text: '{{query_string}}' }},
      params: {
        query_string: 'all about search'
      }
    }
  })
})

test('queryBuilder | script', (t) => {
  t.plan(1)

  const result = queryBuilder().query('script', 'script', {
    inline: "doc['num1'].value > 1",
    lang: 'painless'
  })

  t.deepEqual(result.getQuery(), {
    script: {
      script: {
        inline: "doc['num1'].value > 1",
        lang: 'painless'
      }
    }
  })
})

test('queryBuilder | or', (t) => {
  t.plan(1)

  const result = queryBuilder().query('or', [
    {term: {user: 'kimchy'}},
    {term: {user: 'tony'}}
  ])

  t.deepEqual(result.getQuery(), {
    or: [
      {term: {user: 'kimchy'}},
      {term: {user: 'tony'}}
    ]
  })
})

test('queryBuilder | minimum_should_match with multiple combination', (t) => {
    t.plan(1)

    const result = queryBuilder()
        .orQuery('term', 'status', 'alert')
        .orQuery('term', 'status', 'normal')
        .queryMinimumShouldMatch('2<-25% 9<-3')

    t.deepEqual(result.getQuery(), {
        bool: {
            should: [{
                term: {
                    status: 'alert'
                }
            }, {
                term: {
                    status: 'normal'
                }
            }],
            minimum_should_match: '2<-25% 9<-3'
        }
    })
})

test('queryBuilder | minimum_should_match with multiple queries', (t) => {
  t.plan(1)

  const result = queryBuilder()
    .orQuery('term', 'status', 'alert')
    .orQuery('term', 'status', 'normal')
    .queryMinimumShouldMatch(2)

  t.deepEqual(result.getQuery(), {
    bool: {
      should: [{
        term: {
          status: 'alert'
        }
      }, {
        term: {
          status: 'normal'
        }
      }],
      minimum_should_match: 2
    }
  })

})
