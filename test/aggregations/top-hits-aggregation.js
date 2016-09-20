import topHitsAggregation from '../../src/aggregations/top-hits-aggregation'
import { expect } from 'chai'

describe('topHitsAggregation', () => {

  it('should create a top_hits aggregation', () => {
    let result = topHitsAggregation()
    expect(result).to.eql({
      agg_top_hits_0: {
        top_hits: {}
      }
    })
  })

  it('should create a top_hits aggregation with custom name', () => {
    let result = topHitsAggregation('agg_name')
    expect(result).to.eql({
      agg_name: {
        top_hits: {}
      }
    })
  })

  it('should create a top_hits aggregation with custom options', () => {
    let result = topHitsAggregation({
      _source: {
        include: [
          'title'
        ]
      },
      size: 10
    })
    expect(result).to.eql({
      agg_top_hits_1: {
        top_hits: {
          _source: {
            include: [
              'title'
            ]
          },
          size: 10
        }
      }
    })
  })

  it('should create a top_hits aggregation with custom options and name', () => {
    let result = topHitsAggregation('agg_name', {
      size: 10
    })
    expect(result).to.eql({
      agg_name: {
        top_hits: {
          size: 10
        }
      }
    })
  })
})
