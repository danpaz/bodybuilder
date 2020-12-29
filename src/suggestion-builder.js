import _ from 'lodash'
import { buildClause } from './utils'

export default function suggestionBuilder (newSuggestion) {
  let suggestion = _.isEmpty(newSuggestion) ? {} : newSuggestion

  function makeSuggestion (type, field, options) {
    let suggestName
    const { name, text } = options

    if (name) {
        suggestName = name
        _.unset(options, 'name')
    } else {
        suggestName = `suggest_${type}_${field}`
    }

    if (text) {
        _.unset(options, 'text')
    }

    const innerClause = Object.assign({}, {
      text,
      [type]: buildClause(field, null, options)
    })

    Object.assign(suggestion, {
      [suggestName]: innerClause
    })
  }

  return {
          /**
     * Add an suggestion clause to the query body.
     *
     * @param  {string|Object} type      Name of the suggestion type, such as
     *                                   `'sum'` or `'terms'`.
     * @param  {string}        field     Name of the field to suggest on.
     * @param  {Object}        [options] (optional) Additional options to
     *                                   include in the aggregation.
     *                         [options.text ] text query to run on suggest
     *                         [options.name ] pass a custom name to the function
     * 
     * @return {bodybuilder} Builder.
     *
     * @example
     * bodybuilder()
     *   .suggest('max', 'price', { text: 'test' })
     *   .build()
     *
     * bodybuilder()
     *   .suggest('max', 'price', { text: 'test', name: 'custom name' })
     *   .build()
     *
     */
    suggest (...args) {
      makeSuggestion(...args)
      return this
    },
    getSuggestion () {
        return suggestion
    },
  }
}
