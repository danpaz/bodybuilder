const CONDITIONS_MAP = {
  must: 'must',
  should: 'should',
  must_not: 'must_not',
  mustNot: 'must_not',
  and: 'must',
  or: 'should',
  not: 'must_not'
}

/**
 * Construct a Boolean composite filter.
 *
 * @private
 * @memberof Filters
 *
 * @param  {String} condition Boolean condition: must, must_not, should.
 * @param  {Object} filter    Fully-formed filter.
 * @return {Object}           Boolean filter.
 */
export default function boolFilter(condition, filter) {
  let cond = CONDITIONS_MAP[condition]
  return {
    bool: {
      [cond]: [filter]
    }
  }
}
