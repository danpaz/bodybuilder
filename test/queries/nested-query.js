import nestedQuery from '../../src/queries/nested-query'
import {expect} from 'chai'

describe('nestedQuery', () => {

  it('should create a nested query query', () => {
    let query = {bool: {must: [{match: {'comments.name': 'john'}}, {match: {'comments.age': 28}}]}}
    let result = nestedQuery('comments', query)
    expect(result).to.eql({
      nested: {
        path: 'comments',
        query: {
          bool: {
            must: [
              {
                match: {
                  'comments.name': 'john'
                }
              },
              {
                match: {
                  'comments.age': 28
                }
              }
            ]
          }
        }
      }
    })
  })

  it('should create a nested query query with score_mode', () => {
    let query = {bool: {must: [{match: {'comments.name': 'john'}}, {match: {'comments.age': 28}}]}}
    let opts = {score_mode: 'max'}
    let result = nestedQuery('comments', query, opts)
    expect(result).to.eql({
      nested: {
        path: 'comments',
        score_mode: 'max',
        query: {
          bool: {
            must: [
              {
                match: {
                  'comments.name': 'john'
                }
              },
              {
                match: {
                  'comments.age': 28
                }
              }
            ]
          }
        }
      }
    })
  })

})