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

test('aggregationBuilder | cardinality aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('cardinality', 'author')

  t.deepEqual(result.getAggregations(), {
    agg_cardinality_author: {
      cardinality: {
        field: 'author'
      }
    }
  })
})

test('aggregationBuilder | extended_stats aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('extended_stats', 'grade')

  t.deepEqual(result.getAggregations(), {
    agg_extended_stats_grade: {
      extended_stats: {
        field: 'grade'
      }
    }
  })
})

test('aggregationBuilder | geo_bounds aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('geo_bounds', 'location')

  t.deepEqual(result.getAggregations(), {
    agg_geo_bounds_location: {
      geo_bounds: {
        field: 'location'
      }
    }
  })
})

test('aggregationBuilder | geo_centroid aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('geo_centroid', 'location')

  t.deepEqual(result.getAggregations(), {
    agg_geo_centroid_location: {
      geo_centroid: {
        field: 'location'
      }
    }
  })
})

test('aggregationBuilder | max aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('max', 'price')

  t.deepEqual(result.getAggregations(), {
    agg_max_price: {
      max: {
        field: 'price'
      }
    }
  })
})

test('aggregationBuilder | min aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('min', 'price')

  t.deepEqual(result.getAggregations(), {
    agg_min_price: {
      min: {
        field: 'price'
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

test('aggregationBuilder | percentile_ranks aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('percentile_ranks', 'load_time', {
    values: [15, 30]
  })

  t.deepEqual(result.getAggregations(), {
    agg_percentile_ranks_load_time: {
      percentile_ranks: {
        field: 'load_time',
        values: [15, 30]
      }
    }
  })
})

test('aggregationBuilder | scripted_metric aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('scripted_metric', {
    init_script: "params._agg.transactions = []",
    map_script: "params._agg.transactions.add(doc.type.value == 'sale' ? doc.amount.value : -1 * doc.amount.value)",
    combine_script: "double profit = 0; for (t in params._agg.transactions) { profit += t } return profit",
    reduce_script: "double profit = 0; for (a in params._aggs) { profit += a } return profit"
  }, 'agg_scripted_metric')

  t.deepEqual(result.getAggregations(), {
    agg_scripted_metric: {
      scripted_metric: {
        init_script: "params._agg.transactions = []",
        map_script: "params._agg.transactions.add(doc.type.value == 'sale' ? doc.amount.value : -1 * doc.amount.value)",
        combine_script: "double profit = 0; for (t in params._agg.transactions) { profit += t } return profit",
        reduce_script: "double profit = 0; for (a in params._aggs) { profit += a } return profit"
      }
    }
  })
})

test('aggregationBuilder | stats aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('stats', 'grade')

  t.deepEqual(result.getAggregations(), {
    agg_stats_grade: {
      stats: {
        field: 'grade'
      }
    }
  })
})

test('aggregationBuilder | sum aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('sum', 'change')

  t.deepEqual(result.getAggregations(), {
    agg_sum_change: {
      sum: {
        field: 'change'
      }
    }
  })
})

test('aggregationBuilder | value_count aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('value_count', 'grade')

  t.deepEqual(result.getAggregations(), {
    agg_value_count_grade: {
      value_count: {
        field: 'grade'
      }
    }
  })
})

test('aggregationBuilder | children aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('terms', 'tags.keyword', { size: 10 }, 'top-tags', (a1) => {
    return a1.aggregation('children', { type: 'answer' }, 'to-answers', (a2) => {
      return a2.aggregation('terms', 'owner.display_name.keyword', { size: 10 }, 'top-names')
    })
  })

  t.deepEqual(result.getAggregations(), {
    'top-tags': {
      terms: {
        field: 'tags.keyword',
        size: 10,
      },
      aggs: {
        'to-answers': {
          children: {
            type: 'answer'
          },
          aggs: {
            'top-names': {
              terms: {
                field: 'owner.display_name.keyword',
                size: 10
              }
            }
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
