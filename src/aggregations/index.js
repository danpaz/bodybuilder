import avgAggregation from './avg-aggregation'
import cardinalityAggregation from './cardinality-aggregation'
import dateHistogramAggregation from './date-histogram-aggregation'
import extendedStatsAggregation from './extended-stats-aggregation'
import histogramAggregation from './histogram-aggregation'
import maxAggregation from './max-aggregation'
import minAggregation from './min-aggregation'
import missingAggregation from './missing-aggregation'
import percentilesAggregation from './percentiles-aggregation'
import rangeAggregation from './range-aggregation'
import significantTermsAggregation from './significant-terms-aggregation'
import statsAggregation from './stats-aggregation'
import sumAggregation from './sum-aggregation'
import termsAggregation from './terms-aggregation'
import valueCountAggregation from './value-count-aggregation'
import topHitsAggregation from './top-hits-aggregation'
import geohashAggregation from './geohash-aggregation'
import childrenAggregation from './children-aggregation'

/**
 * Use these keys to select the aggregation type when building an aggregation
 * clause.
 *
 * @example
 * var body = new Bodybuilder()
 *   .aggregation('sum', 'grade')
 *   .build()
 */
export default {
  average: avgAggregation,
  avg: avgAggregation,
  cardinality: cardinalityAggregation,
  datehistogram: dateHistogramAggregation,
  date_histogram: dateHistogramAggregation,
  'date-histogram': dateHistogramAggregation,
  dateHistogram: dateHistogramAggregation,
  extendedstats: extendedStatsAggregation,
  extended_stats: extendedStatsAggregation,
  'extended-stats': extendedStatsAggregation,
  extendedStats: extendedStatsAggregation,
  histogram: histogramAggregation,
  max: maxAggregation,
  min: minAggregation,
  missing: missingAggregation,
  percentiles: percentilesAggregation,
  range: rangeAggregation,
  significantterms: significantTermsAggregation,
  significant_terms: significantTermsAggregation,
  'significant-terms': significantTermsAggregation,
  significantTerms: significantTermsAggregation,
  stats: statsAggregation,
  sum: sumAggregation,
  terms: termsAggregation,
  valuecount: valueCountAggregation,
  value_count: valueCountAggregation,
  'value-count': valueCountAggregation,
  valueCount: valueCountAggregation,
  topHits: topHitsAggregation,
  top_hits: topHitsAggregation,
  'top-hits': topHitsAggregation,
  geohash: geohashAggregation,
  children: childrenAggregation
}
