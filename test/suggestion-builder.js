import test from 'tape'
import suggestionBuilder from '../src/suggestion-builder'


test('suggestion Builder | term suggest', (t) => {
    t.plan(1)

    const result = suggestionBuilder().suggest('term', 'products', { text: 'testing' })

    t.deepEqual(result.getSuggestions(), {
        'suggest_term_products': {
            text: 'testing',
            term: {
                field: 'products',
            }
        }
    })
})

test('suggestion Builder | term suggest with custom name', (t) => {
    t.plan(1)

    const result = suggestionBuilder().suggest('term', 'products', { name: 'products', text: 'testing' })

    t.deepEqual(result.getSuggestions(), {
        products: {
            text: 'testing',
            term: {
                field: 'products',
            }
        }
    })
})

test('suggestion Builder | phrase suggest', (t) => {
    t.plan(1)

    const result = suggestionBuilder().suggest('phrase', 'products', { text: 'testing' })

    t.deepEqual(result.getSuggestions(), {
        'suggest_phrase_products': {
            text: 'testing',
            phrase: {
                field: 'products',
            }
        }
    })
})

test('suggestion Builder | phrase suggest with custom name', (t) => {
    t.plan(1)

    const result = suggestionBuilder().suggest('phrase', 'products', { name: 'products', text: 'testing' })

    t.deepEqual(result.getSuggestions(), {
        products: {
            text: 'testing',
            phrase: {
                field: 'products',
            }
        }
    })
})