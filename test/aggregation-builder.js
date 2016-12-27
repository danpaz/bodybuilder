import test from 'tape'
import aggregationBuilder from '../src/aggregation-builder'
import filterBuilder from '../src/filter-builder'

test('aggregationBuilder | avg aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('avg', 'grade')

  t.deepEqual(result.getAggregations(), {
    agg_avg_grade: {
      avg: {
        field: 'grade'
      }
    }
  })
})

test('aggregationBuilder | percentiles aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('percentiles', 'load_time', {
    percents: [95, 99, 99.9]
  })

  t.deepEqual(result.getAggregations(), {
    agg_percentiles_load_time: {
      percentiles: {
        field: 'load_time',
        percents: [95, 99, 99.9]
      }
    }
  })
})

// Skipping, first need a way to handle aggregations with no `field`
test.skip('aggregationBuilder | percentiles script aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('percentiles', 'load_time', {
    script: {
      inline: "doc['load_time'].value / timeUnit",
      params: {
        timeUnit: 100
      }
    }
  })

  t.deepEqual(result.getAggregations(), {
    agg_percentiles_load_time: {
      percentiles: {
        script: {
          inline: "doc['load_time'].value / timeUnit",
          params: {
            timeUnit: 100
          }
        }
      }
    }
  })
})

test('aggregationBuilder | filters aggregation', (t) => {
  t.plan(1)

  const f1 = filterBuilder().filter('term', 'user', 'John').getFilter()
  const f2 = filterBuilder().filter('term', 'status', 'failure').getFilter()

  const result = aggregationBuilder().aggregation('filters', {
    filters: {
      users: f1,
      errors: f2
    }
  }, 'agg_name')

  t.deepEqual(result.getAggregations(), {
    'agg_name': {
      filters: {
        filters: {
          users: { term: { user: 'John' } },
          errors: { term: { status: 'failure' } }
        }
      }
    }
  })
})
