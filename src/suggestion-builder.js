import _ from 'lodash'
import { buildClause } from './utils'

export default function suggestionBuilder (newSuggestion) {
  let suggestion = _.isEmpty(newSuggestion) ? {} : newSuggestion

  function makeSuggestion (type, field, options) {

    const { name, text } = options

    if (name) {
        _.unset(options, 'name')
    }

    if (text) {
        _.unset(options, 'text')
    }


    const innerClause = Object.assign({}, {
      text,
      [type]: buildClause(field, null, options)
    })

    Object.assign(suggestion, {
      [name]: innerClause
    })
  }

  return {
    suggest (...args) {
      makeSuggestion(...args)
      return this
    },
    getSuggestion () {
        return suggestion
    },
  }
}
