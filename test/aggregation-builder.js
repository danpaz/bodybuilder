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
        size: 10
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

test('aggregationBuilder | date_histogram aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('date_histogram', 'grade')

  t.deepEqual(result.getAggregations(), {
    agg_date_histogram_grade: {
      date_histogram: {
        field: 'grade'
      }
    }
  })
})

test('aggregationBuilder | date_range aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('date_range', 'date', {
    format: 'MM-yyy',
    ranges: [
      { to: 'now-10M/M' },
      { from: 'now-10M/M' }
    ]
  })

  t.deepEqual(result.getAggregations(), {
    agg_date_range_date: {
      date_range: {
        field: 'date',
        format: 'MM-yyy',
        ranges: [
          { to: 'now-10M/M' },
          { from: 'now-10M/M' }
        ]
      }
    }
  })
})

test('aggregationBuilder | diversified_sampler aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('diversified_sampler', 'user.id', {
    shard_size: 200
  }, (a) => {
    return a.aggregation('significant_terms', 'text', 'keywords')
  })

  t.deepEqual(result.getAggregations(), {
    'agg_diversified_sampler_user.id': {
      diversified_sampler: {
        field: 'user.id',
        shard_size: 200
      },
      aggs: {
        keywords: {
          significant_terms: {
            field: 'text'
          }
        }
      }
    }
  })
})

test('aggregationBuilder | filter aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder().aggregation('filter', 'red_products', (a) => {
    return a.filter('term', 'color', 'red')
            .aggregation('avg', 'price', 'avg_price')
  })

  t.deepEqual(result.getAggregations(), {
    agg_filter_red_products: {
      filter: { term: { color: 'red' } },
      aggs: {
        avg_price : { avg : { field : 'price' } }
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

test('aggregationBuilder | pipeline aggregation', (t) => {
  t.plan(1)

  const result = aggregationBuilder()
    .aggregation('date_histogram', 'date', { interval: 'month' }, 'sales_per_month', (a) => {
      return a.aggregation('sum', 'price', 'sales')
    })
    .aggregation('max_bucket', { buckets_path: 'sales_per_month>sales' }, 'max_monthly_sales')

  t.deepEqual(result.getAggregations(), {
    sales_per_month : {
      date_histogram : {
        field: 'date',
        interval: 'month'
      },
      aggs: {
        sales: {
          sum: {
            field: 'price'
          }
        }
      }
    },
    max_monthly_sales: {
      max_bucket: {
        buckets_path: 'sales_per_month>sales'
      }
    }
  })
})

test('aggregationBuilder | matrix stats', (t) => {
  t.plan(1)

  const result = aggregationBuilder()
    .aggregation('matrix_stats', { fields: ['poverty', 'income'] }, 'matrixstats')

  t.deepEqual(result.getAggregations(), {
    matrixstats: {
      matrix_stats: {
        fields: ['poverty', 'income']
      }
    }
  })
})

test('aggregationBuilder | metadata', (t) => {
    t.plan(1)

    const result = aggregationBuilder()
        .aggregation('terms', 'title', { _metadata: { color: 'blue' } }, 'titles')

    t.deepEqual(result.getAggregations(), {
        titles: {
            terms: {
                field: 'title'
            },
            meta : {
              color : 'blue'
            }
        }
    })
})
