'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _avgAggregation = require('./avg-aggregation');

var _avgAggregation2 = _interopRequireDefault(_avgAggregation);

var _cardinalityAggregation = require('./cardinality-aggregation');

var _cardinalityAggregation2 = _interopRequireDefault(_cardinalityAggregation);

var _dateHistogramAggregation = require('./date-histogram-aggregation');

var _dateHistogramAggregation2 = _interopRequireDefault(_dateHistogramAggregation);

var _extendedStatsAggregation = require('./extended-stats-aggregation');

var _extendedStatsAggregation2 = _interopRequireDefault(_extendedStatsAggregation);

var _histogramAggregation = require('./histogram-aggregation');

var _histogramAggregation2 = _interopRequireDefault(_histogramAggregation);

var _maxAggregation = require('./max-aggregation');

var _maxAggregation2 = _interopRequireDefault(_maxAggregation);

var _minAggregation = require('./min-aggregation');

var _minAggregation2 = _interopRequireDefault(_minAggregation);

var _missingAggregation = require('./missing-aggregation');

var _missingAggregation2 = _interopRequireDefault(_missingAggregation);

var _percentilesAggregation = require('./percentiles-aggregation');

var _percentilesAggregation2 = _interopRequireDefault(_percentilesAggregation);

var _rangeAggregation = require('./range-aggregation');

var _rangeAggregation2 = _interopRequireDefault(_rangeAggregation);

var _significantTermsAggregation = require('./significant-terms-aggregation');

var _significantTermsAggregation2 = _interopRequireDefault(_significantTermsAggregation);

var _statsAggregation = require('./stats-aggregation');

var _statsAggregation2 = _interopRequireDefault(_statsAggregation);

var _sumAggregation = require('./sum-aggregation');

var _sumAggregation2 = _interopRequireDefault(_sumAggregation);

var _termsAggregation = require('./terms-aggregation');

var _termsAggregation2 = _interopRequireDefault(_termsAggregation);

var _valueCountAggregation = require('./value-count-aggregation');

var _valueCountAggregation2 = _interopRequireDefault(_valueCountAggregation);

var _topHitsAggregation = require('./top-hits-aggregation');

var _topHitsAggregation2 = _interopRequireDefault(_topHitsAggregation);

var _filterAggregation = require('./filter-aggregation');

var _filterAggregation2 = _interopRequireDefault(_filterAggregation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Use these keys to select the aggregation type when building an aggregation
 * clause.
 *
 * @example
 * var body = new Bodybuilder()
 *   .aggregation('sum', 'grade')
 *   .build()
 */
exports.default = {
  average: _avgAggregation2.default,
  avg: _avgAggregation2.default,
  cardinality: _cardinalityAggregation2.default,
  datehistogram: _dateHistogramAggregation2.default,
  date_histogram: _dateHistogramAggregation2.default,
  'date-histogram': _dateHistogramAggregation2.default,
  dateHistogram: _dateHistogramAggregation2.default,
  extendedstats: _extendedStatsAggregation2.default,
  extended_stats: _extendedStatsAggregation2.default,
  'extended-stats': _extendedStatsAggregation2.default,
  extendedStats: _extendedStatsAggregation2.default,
  histogram: _histogramAggregation2.default,
  max: _maxAggregation2.default,
  min: _minAggregation2.default,
  missing: _missingAggregation2.default,
  percentiles: _percentilesAggregation2.default,
  range: _rangeAggregation2.default,
  significantterms: _significantTermsAggregation2.default,
  significant_terms: _significantTermsAggregation2.default,
  'significant-terms': _significantTermsAggregation2.default,
  significantTerms: _significantTermsAggregation2.default,
  stats: _statsAggregation2.default,
  sum: _sumAggregation2.default,
  terms: _termsAggregation2.default,
  valuecount: _valueCountAggregation2.default,
  value_count: _valueCountAggregation2.default,
  'value-count': _valueCountAggregation2.default,
  valueCount: _valueCountAggregation2.default,
  topHits: _topHitsAggregation2.default,
  top_hits: _topHitsAggregation2.default,
  'top-hits': _topHitsAggregation2.default,
  filterAggregation: _filterAggregation2.default
};