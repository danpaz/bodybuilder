import test from 'tape'
import filterBuilder from '../src/filter-builder'

test('filterBuilder | filter term', (t) => {
  t.plan(1)

  const result = filterBuilder().filter('term', 'field', 'value')

  t.deepEqual(result.getFilter(), {
    term: { field: 'value' }
  })
})

test('filterBuilder | filter nested', t => {
  t.plan(1)

  const result = filterBuilder().filter(
    'constant_score',
    f => f.filter('term', 'field', 'value')
  )

  t.deepEqual(result.getFilter(), {
    constant_score: { filter: { term: { field: 'value' } } }
  })
})
