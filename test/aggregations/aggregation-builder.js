import AggregationBuilder from '../../src/aggregations/aggregation-builder'
import {expect} from 'chai'

describe('AggregationBuilder', () => {

  it('should create an aggregation given its type and arguments', () => {
    let builder = Object.create(AggregationBuilder)
    builder.aggregation('terms', 'some.field', 'bySomeField')
    expect(builder.aggregations).to.eql({
      bySomeField: {
        terms: {
          field: 'some.field'
        }
      }
    })
  })

  it('should allow chaining aggregations consecutively', () => {
    let builder = Object.create(AggregationBuilder)
    let result = builder.aggregation('terms', 'some.field', 'bySomeField')
      .aggregation('max', 'some.metric')
    expect(result).to.eql(builder)
    expect(result.aggregations).to.eql({
      bySomeField: {
        terms: {
          field: 'some.field'
        }
      },
      'agg_max_some.metric': {
        max: {
          field: 'some.metric'
        }
      }
    })
  })

  it('should allow nesting aggregations', () => {
    let builder = Object.create(AggregationBuilder)
    builder.aggregation('terms', 'some.field',
      agg => agg.aggregation('min', 'some.metric'))
    expect(builder.aggregations).to.eql({
      'agg_terms_some.field': {
        terms: {
          field: 'some.field'
        },
        aggs: {
          'agg_min_some.metric': {
            min: {
              field: 'some.metric'
            }
          }
        }
      }
    })
  })

  it('should allow chaining aggregations on nested aggregations', () => {
    let builder = Object.create(AggregationBuilder)
    builder.aggregation('terms', 'some.field',
      agg => agg.aggregation('min', 'some.metric')
      .aggregation('avg', 'some.deep.metric')
    )
    expect(builder.aggregations).to.eql({
      'agg_terms_some.field': {
        terms: {
          field: 'some.field'
        },
        aggs: {
          'agg_min_some.metric': {
            min: {
              field: 'some.metric'
            }
          },
          'agg_avg_some.deep.metric': {
            avg: {
              field: 'some.deep.metric'
            }
          }
        }
      }
    })
  })

  it('should allow multiple levels of nested aggregations', () => {
    let builder = Object.create(AggregationBuilder)
    builder.aggregation('terms', 'some.field',
      agg0 => agg0.aggregation('min', 'some.metric',
        agg1 => agg1.aggregation('avg', 'some.deep.metric'))
    )
    expect(builder.aggregations).to.eql({
      'agg_terms_some.field': {
        terms: {
          field: 'some.field'
        },
        aggs: {
          'agg_min_some.metric': {
            min: {
              field: 'some.metric'
            },
            aggs: {
              'agg_avg_some.deep.metric': {
                avg: {
                  field: 'some.deep.metric'
                }
              }
            }
          }
        }
      }
    })
  })
})
