import _ from 'lodash'
import { buildClause } from './utils'

export default function suggestionBuilder(newSuggestion) {
    let suggestions = _.isEmpty(newSuggestion) ? {} : newSuggestion

    function makeSuggestion(type, field, options) {
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

        Object.assign(suggestions, {
            [suggestName]: innerClause
        })
    }

    return {
        /**
         * Add an suggestion clause to the query body.
         *
         * @param  {string}        field     Name of the field to suggest on.
         * @param  {Object}        [options] (optional) Additional options to
         *                                   include in the aggregation.
         *                         [options.text ] text query to run on suggest
         *                         [options.name ] pass a custom name to the function
         *                         [options.analyzer ] name of predefined analyzer to use on suggest
         * 
         * @return {bodybuilder} Builder.
         *
         * @example
         * bodybuilder()
         *   .suggest('price', { text: 'test' })
         *   .build()
         *
         * bodybuilder()
         *   .suggest('price', { text: 'test', name: 'custom name' })
         *   .build()
         *
         */
        termSuggest(...args) {
            makeSuggestion('term', ...args)
            return this
        },
        /**
         * Add an suggestion clause to the query body.
         *
         * @param  {string}        field     Name of the field to suggest on.
         * @param  {Object}        [options] (optional) Additional options to
         *                                   include in the aggregation.
         *                         [options.text ] text query to run on suggest
         *                         [options.name ] pass a custom name to the function
         *                         [options.analyzer ] name of predefined analyzer to use on suggest
         *                         [options.size ] The number of candidates that are generated for each individual query term
         *                         [options.gram_size ] The max number of n-grams per field
         * @return {bodybuilder} Builder.
         *
         * @example
         * bodybuilder()
         *   .suggest('price', { text: 'test' })
         *   .build()
         *
         * bodybuilder()
         *   .suggest('price', { text: 'test', name: 'custom name' })
         *   .build()
         *
         */
        phraseSuggest(...args) {
            makeSuggestion('phrase', ...args)
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
