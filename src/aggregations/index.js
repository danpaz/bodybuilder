import avgAggregation from './avg-aggregation'
import dateHistogramAggregation from './date-histogram-aggregation'
import extendedStatsAggregation from './extended-stats-aggregation'
import histogramAggregation from './histogram-aggregation'
import maxAggregation from './max-aggregation'
import minAggregation from './min-aggregation'
import missingAggregation from './missing-aggregation'
import percentilesAggregation from './percentiles-aggregation'
import significantTermsAggregation from './significant-terms-aggregation'
import statsAggregation from './stats-aggregation'
import sumAggregation from './sum-aggregation'
import termsAggregation from './terms-aggregation'
import valueCountAggregation from './value-count-aggregation'

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
  valueCount: valueCountAggregation
}
