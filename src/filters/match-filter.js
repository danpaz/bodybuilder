/**
 * Construct a match filter
 *
 * @param  {String}  field    Field name to match over.
 * @param  {String}  term     Query value.
 * @param  {Boolean} isPhrase Should the term be treated as a phrase or not.
 * @return {Object}           Match filter.
 */
export default function matchFilter(field, term, isPhrase = false) {
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
