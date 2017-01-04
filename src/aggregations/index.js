import avgAggregation from './avg-aggregation'
import cardinalityAggregation from './cardinality-aggregation'
import childrenAggregation from './children-aggregation'
import dateHistogramAggregation from './date-histogram-aggregation'
import extendedStatsAggregation from './extended-stats-aggregation'
import filterAggregation from './filter-aggregation'
import filtersAggregation from './filter-aggregation'
import geohashAggregation from './geohash-aggregation'
import globalAggregation from './global-aggregation'
import histogramAggregation from './histogram-aggregation'
import maxAggregation from './max-aggregation'
import minAggregation from './min-aggregation'
import missingAggregation from './missing-aggregation'
import nestedAggregation from './nested-aggregation'
import percentilesAggregation from './percentiles-aggregation'
import rangeAggregation from './range-aggregation'
import reverseNestedAggregation from './reverse-nested-aggregation'
import scriptedMetricAggregation from './scripted-metric-aggregation'
import significantTermsAggregation from './significant-terms-aggregation'
import statsAggregation from './stats-aggregation'
import sumAggregation from './sum-aggregation'
import termsAggregation from './terms-aggregation'
import topHitsAggregation from './top-hits-aggregation'
import valueCountAggregation from './value-count-aggregation'

/**
 * Construct elasticsearch aggregations.
 *
 * @namespace Aggregations
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
  children: childrenAggregation,
  datehistogram: dateHistogramAggregation,
  date_histogram: dateHistogramAggregation,
  'date-histogram': dateHistogramAggregation,
  dateHistogram: dateHistogramAggregation,
  extendedstats: extendedStatsAggregation,
  extended_stats: extendedStatsAggregation,
  'extended-stats': extendedStatsAggregation,
  extendedStats: extendedStatsAggregation,
  filter: filterAggregation,
  filters: filtersAggregation,
  geohash: geohashAggregation,
  global: globalAggregation,
  histogram: histogramAggregation,
  max: maxAggregation,
  min: minAggregation,
  missing: missingAggregation,
  nested: nestedAggregation,
  percentiles: percentilesAggregation,
  range: rangeAggregation,
  reversenested: reverseNestedAggregation,
  reverse_nested: reverseNestedAggregation,
  'reverse-nested': reverseNestedAggregation,
  reverseNested: reverseNestedAggregation,
  scriptedmetric: scriptedMetricAggregation,
  scripted_metric: scriptedMetricAggregation,
  'scripted-metric': scriptedMetricAggregation,
  scriptedMetric: scriptedMetricAggregation,
  significantterms: significantTermsAggregation,
  significant_terms: significantTermsAggregation,
  'significant-terms': significantTermsAggregation,
  significantTerms: significantTermsAggregation,
  stats: statsAggregation,
  sum: sumAggregation,
  terms: termsAggregation,
  tophits: topHitsAggregation,
  top_hits: topHitsAggregation,
  'top-hits': topHitsAggregation,
  topHits: topHitsAggregation,
  valuecount: valueCountAggregation,
  value_count: valueCountAggregation,
  'value-count': valueCountAggregation,
  valueCount: valueCountAggregation
}
