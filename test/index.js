import BodyBuilder from '../src/index'
import {expect} from 'chai'

describe('BodyBuilder', () => {

  it('should default to empty query', () => {
    let result = new BodyBuilder()
    expect(result).to.eql({})
  })

  it('should set a sort direction', () => {
    let result = new BodyBuilder().sort('timestamp', 'asc')
    expect(result).to.eql({
      sort: {
        timestamp: {
          order: 'asc'
        }
      }
    })
  })

  it('should set a size', () => {
    let result = new BodyBuilder().size(25)
    expect(result).to.eql({
      size: 25
    })
  })

  it('should set a raw option', () => {
    let result = new BodyBuilder().rawOption('_sourceExclude', 'bigfield')
    expect(result).to.eql({
      _sourceExclude: 'bigfield'
    })
  })

  it('should add a filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
    expect(result).to.eql({
      query: {
        filtered: {
          filter: {
            term: {user: 'kimchy'}
          }
        }
      }
    })
  })

  it('should add two filters using bool filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .filter('term', 'user', 'herald')
    expect(result).to.eql({
      query: {
        filtered: {
          filter: {
            bool: {
              must: [
                {term: {user: 'kimchy'}},
                {term: {user: 'herald'}}
              ]
            }
          }
        }
      }
    })
  })

  it('should add three filters using bool filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .filter('term', 'user', 'herald')
                                  .filter('term', 'user', 'johnny')
    expect(result).to.eql({
      query: {
        filtered: {
          filter: {
            bool: {
              must: [
                {term: {user: 'kimchy'}},
                {term: {user: 'herald'}},
                {term: {user: 'johnny'}}
              ]
            }
          }
        }
      }
    })
  })

  it('should add an or filter using bool filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .orFilter('term', 'user', 'herald')
    expect(result).to.eql({
      query: {
        filtered: {
          filter: {
            bool: {
              should: [
                {term: {user: 'kimchy'}},
                {term: {user: 'herald'}}
              ]
            }
          }
        }
      }
    })
  })

  it('should add and, not, and or filters using bool filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .filter('term', 'user', 'herald')
                                  .orFilter('term', 'user', 'johnny')
                                  .notFilter('term', 'user', 'cassie')
    expect(result).to.eql({
      query: {
        filtered: {
          filter: {
            bool: {
              must: [
                {term: {user: 'kimchy'}},
                {term: {user: 'herald'}}
              ],
              should: [
                {term: {user: 'johnny'}}
              ],
              must_not: [
                {term: {user: 'cassie'}}
              ]
            }
          }
        }
      }
    })
  })

  it('should throw if filter type not found', () => {
    let fn = () => {
      new BodyBuilder().filter('unknown', 'user', 'kimchy')
    }
    expect(fn).to.throw('Filter type unknown not found.')
  })

  it('should add an aggregation', () => {
    let result = new BodyBuilder().aggregation('terms', 'user')
    expect(result).to.eql({
      aggregations: {
        agg_terms_user: {
          terms: {
            field: 'user'
          }
        }
      }
    })
  })

  it('should add multiple aggregations', () => {
    let result = new BodyBuilder().aggregation('terms', 'user')
                                  .aggregation('terms', 'name')
    expect(result).to.eql({
      aggregations: {
        agg_terms_user: {
          terms: {
            field: 'user'
          }
        },
        agg_terms_name: {
          terms: {
            field: 'name'
          }
        }
      }
    })
  })

  it('should add an aggregation and a filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .agg('terms', 'user')
    expect(result).to.eql({
      query: {
        filtered: {
          filter: {
            term: {user: 'kimchy'}
          }
        }
      },
      aggregations: {
        agg_terms_user: {
          terms: {
            field: 'user'
          }
        }
      }
    })
  })

  it('should add a query', () => {
    let result = new BodyBuilder().addQuery('match', 'message', 'this is a test')
    expect(result).to.eql({
      query: {
        filtered: {
          query: {
            match: {
              message: 'this is a test'
            }
          }
        }
      }
    })
  })

  it('should add a query with a filter', () => {
    let result = new BodyBuilder().addQuery('match', 'message', 'this is a test')
                                  .filter('term', 'user', 'kimchy')
    expect(result).to.eql({
      query: {
        filtered: {
          query: {
            match: {
              message: 'this is a test'
            }
          },
          filter: {
            term: {user: 'kimchy'}
          }
        }
      }
    })
  })

})
