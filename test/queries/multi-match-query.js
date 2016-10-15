import multiMatchQuery from '../../src/queries/multi-match-query'
import {expect} from 'chai'

describe('multiMatchQuery', () => {

  it('should create a multi match query', () => {
    let result = multiMatchQuery(['subject', 'message'], 'this is a test')
    expect(result).to.eql({
      multi_match: {
        query: 'this is a test',
        type: 'best_fields',
        fields: ['subject', 'message']
      }
    })
  })

  it('should create a multi match query with type phrase_prefix', () => {
    let result = multiMatchQuery(['subject', 'message'], 'this is a test', 'phrase_prefix')
    expect(result).to.eql({
      multi_match: {
        query: 'this is a test',
        type: 'phrase_prefix',
        fields: ['subject', 'message']
      }
    })
  })

  it('should create a multi match query with options', () => {
    const result = multiMatchQuery(['subject', 'message'], 'this is a test', {
      type: 'phrase_prefix',
      analyzer: 'standard',
      tie_breaker: 0.3
    })
    expect(result).to.eql({
      multi_match: {
        query: 'this is a test',
        type: 'phrase_prefix',
        fields: ['subject', 'message'],
        analyzer: 'standard',
        tie_breaker: 0.3
      }
    })
  })

  it('should create a multi match query with type=best_fields as the default', () => {
    const result = multiMatchQuery(['subject', 'message'], 'this is a test', {
      analyzer: 'standard',
      tie_breaker: 0.3
    })
    expect(result).to.eql({
      multi_match: {
        query: 'this is a test',
        type: 'best_fields',
        fields: ['subject', 'message'],
        analyzer: 'standard',
        tie_breaker: 0.3
      }
    })
  })

})
