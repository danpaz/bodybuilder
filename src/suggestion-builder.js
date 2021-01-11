import _ from 'lodash'
import { buildClause } from './utils'

export default function suggestionBuilder(newSuggestion) {
    let suggestions = _.isEmpty(newSuggestion) ? {} : newSuggestion

    function makeSuggestion(type, field, options = {}) {
        let suggestName
        const { name, text } = options

        if (name) {
            suggestName = name
            _.unset(options, 'name')
        } else {
            suggestName = `suggest_${type}_${field}`
        }

        let innerClause = {}

        if (text) {
            _.unset(options, 'text')
            innerClause.text = text
        }

        innerClause[type] = buildClause(field, null, options)

        Object.assign(suggestions, {
            [suggestName]: innerClause
        })
    }

    return {
        /**
         * Add a suggestion clause to the query body.
         *
         * @param  {string}        field     Name of the field to suggest on.
         * @param  {Object}        [options] (optional) Additional options to
         *                                   include in the suggestion clause.
         *                         [options.text ] text query to run on suggest
         *                         [options.name ] pass a custom name to the function
         *                         [options.analyzer ] name of predefined analyzer to use on suggest
         * 
         * @return {bodybuilder} Builder.
         *
         * @example
         * bodybuilder()
         *   .suggest('term', price', { text: 'test' })
         *   .build()
         *
         * bodybuilder()
         *   .suggest('phrase', 'price', { text: 'test', name: 'custom name' })
         *   .build()
         *
         */
        suggest(...args) {
            makeSuggestion(...args)
            return this
        },
        getSuggestions() {
            return suggestions
        },
        hasSuggestions() {
            return !_.isEmpty(suggestions)
        },
    }
}
