import functionScoreQuery from '../../src/queries/function-score-query'
import {expect} from 'chai'

describe('functionScoreQuery', () => {
  it('should create a function_score query', () => {
    let result = functionScoreQuery([{
      gauss: {
        date: {
          origin: '2013-09-17',
          scale: '10d',
          offset: '5d',
          decay : 0.5
        }
      }
    }])
    expect(result).to.eql({
      function_score: {
        functions: [{
          gauss: {
            date: {
              origin: '2013-09-17',
              scale: '10d',
              offset: '5d',
              decay : 0.5
            }
          }
        }]
      }
    })
  })

  it('should create a complex function_score query', () => {
    let result = functionScoreQuery([{
      gauss: {
        location: {
          origin: '55.75,37.61',
          scale: '10km',
          decay : 0.5
        }
      }
    }], {
      query: {
        match: {
          name: 'Jim'
        }
      }
    })
    expect(result).to.eql({
      function_score: {
        query: {
          match: {
            name: 'Jim'
          }
        },
        functions: [{
          gauss: {
            location: {
              origin: '55.75,37.61',
              scale: '10km',
              decay : 0.5
            }
          }
        }]
      }
    })
  })
})
