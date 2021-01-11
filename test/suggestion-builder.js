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

test('suggestion Builder | chained suggests', (t) => {
    t.plan(1)

    const result = suggestionBuilder().suggest('phrase', 'products', { name: 'products', text: 'testing' }).suggest('term', 'brands', { name: 'brands', text: 'testing'})

    t.deepEqual(result.getSuggestions(), {
        products: {
            text: 'testing',
            phrase: {
                field: 'products',
            }
        },
        brands: {
            text: 'testing',
            term: {
                field: 'brands',
            }
        }
    })
})


test('suggestion Builder | nested generator clause', (t) => {
    t.plan(1)

    const result = suggestionBuilder().suggest('phrase', 'products', { name: 'products', text: 'testing', direct_generator: { field: 'name.trigram', suggest_mode: 'popular'} })

    t.deepEqual(result.getSuggestions(), {
        products: {
            text: 'testing',
            phrase: {
                field: 'products',
                direct_generator: {
                    field: 'name.trigram',
                    suggest_mode: 'popular',
                }
            }
        },
    })
})

test('suggestion Builder | no config', (t) => {
    t.plan(1)

    const result = suggestionBuilder().suggest('phrase', 'products')

    t.deepEqual(result.getSuggestions(), {
        suggest_phrase_products: {
            phrase: {
                field: 'products',
            }
        },
    })
})