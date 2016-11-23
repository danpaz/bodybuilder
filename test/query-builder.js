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
