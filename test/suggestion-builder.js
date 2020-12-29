import test from 'tape'
import suggestionBuilder from '../src/suggestion-builder'


test('suggestion Builder | term suggest', (t) => {
    t.plan(1)
  
    const result = suggestionBuilder().suggest('term', 'products', { name: 'products', text: 'testing' })
  
    t.deepEqual(result.getSuggestion(), {
      products: {
        text: 'testing',
        term: {
          field: 'products',
        }
      }
    })
  })

  test('suggestion Builder | term suggest with offset and length', (t) => {
    t.plan(1)
  
    const result = suggestionBuilder().suggest('term', 'products', { name: 'products', text: 'testing', offset: 2, length: 10 })
  
    t.deepEqual(result.getSuggestion(), {
      products: {
        text: 'testing',
        term: {
          field: 'products',
          offset: 2,
          length: 10
        }
      }
    })
  })