import matchPhrasePrefix from '../../src/queries/match-phrase-prefix'
import {expect} from 'chai'

describe('matchPhrasePrefix', () => {

  it('should create a match phrase prefix query', () => {
    let result = matchPhrasePrefix('message', 'this is a test')
    expect(result).to.eql({
      match_phrase_prefix: {
        message: 'this is a test'
      }
    })
  })


})
