/**
 * Construct a Match query.
 *
 * @param  {String}  field    Field name to query over.
 * @param  {String}  term     Query value.
 * @param  {Boolean} isPhrase Should the term be treated as a phrase or not.
 * @return {Object}           Match query.
 */
export default function matchQuery(field, term, isPhrase = false) {
  if (isPhrase) {
    return {
      match: {
        [field]: {
          query: term,
          type: 'phrase'
        }
      }
    }
  } else {
    return {
      match: {
        [field]: term
      }
    }
  }
}
