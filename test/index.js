import BodyBuilder from '../src/index'
import {expect} from 'chai'

describe('BodyBuilder', () => {

  it('should default to empty query', () => {
    let result = new BodyBuilder().build()
    expect(result).to.eql({})
  })

  it('should return a copy of body when build', () => {
    let body = new BodyBuilder()
    let result1 = body.build()
    let result2 = body.build()
    expect(result1).to.not.equal(result2)
  })

  it('should use default sort direction', () => {
    let result = new BodyBuilder().sort('timestamp').build()
    expect(result).to.eql({
      sort: {
        timestamp: {
          order: 'asc'
        }
      }
    })
  })

  it('should set a sort direction', () => {
    let result = new BodyBuilder().sort('timestamp', 'desc').build()
    expect(result).to.eql({
      sort: {
        timestamp: {
          order: 'desc'
        }
      }
    })
  })

  it('should overwrite the sort direction', () => {
    let result = new BodyBuilder().sort('timestamp', 'desc')
                                  .sort('timestamp', 'asc')
                                  .build()
    expect(result).to.eql({
      sort: {
        timestamp: {
          order: 'asc'
        }
      }
    })
  })

  it('should set a from value', () => {
    let result = new BodyBuilder().from(25).build()
    expect(result).to.eql({
      from: 25
    })
  })

  it('should set a size value', () => {
    let result = new BodyBuilder().size(25).build()
    expect(result).to.eql({
      size: 25
    })
  })

  it('should set a raw option', () => {
    let result = new BodyBuilder().rawOption('_sourceExclude', 'bigfield')
                                  .build()
    expect(result).to.eql({
      _sourceExclude: 'bigfield'
    })
  })

  it('should add a filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .build()
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

  it('should add a filter with from and size', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .size(25)
                                  .from(100)
                                  .build()
    expect(result).to.eql({
      size: 25,
      from: 100,
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
                                  .build()
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
                                  .build()
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
                                  .build()
    expect(result).to.eql({
      query: {
        filtered: {
          filter: {
            bool: {
              must: [
                {term: {user: 'kimchy'}}
              ],
              should: [
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
                                  .build()
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
      new BodyBuilder().filter('unknown', 'user', 'kimchy').build()
    }
    expect(fn).to.throw('Filter type unknown not found.')
  })

  it('should add an aggregation', () => {
    let result = new BodyBuilder().aggregation('terms', 'user').build()
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
                                  .build()
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
                                  .build()
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
    let result = new BodyBuilder().query('match', 'message', 'this is a test')
                                  .build()
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

  it('should add multiple queries', () => {
    let result = new BodyBuilder().query('match', 'message', 'this is a test')
                                  .query('match', 'message', 'another test')
                                  .query('match', 'title', 'test')
                                  .build()
    expect(result).to.eql({
      query: {
        filtered: {
          query: {
            bool: {
              must: [
                {match: {message: 'this is a test'}},
                {match: { message: 'another test'}},
                {match: {title: 'test'}}
              ]
            }
          }
        }
      }
    })
  })

  it('should support starting with should queries', () => {
    let result = new BodyBuilder().orQuery('match', 'message', 'this is a test')
                                  .orQuery('match', 'message', 'another test')
                                  .build()
    expect(result).to.eql({
      query: {
        filtered: {
          query: {
            bool: {
              should: [
                {match: {message: 'this is a test'}},
                {match: { message: 'another test'}}
              ]
            }
          }
        }
      }
    })
  })

  it('should add and, not, and or queries using bool query', () => {
    let result = new BodyBuilder().query('term', 'user', 'kimchy')
                                  .query('term', 'user', 'herald')
                                  .orQuery('term', 'user', 'johnny')
                                  .notQuery('term', 'user', 'cassie')
                                  .build()
    expect(result).to.eql({
      query: {
        filtered: {
          query: {
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

  it('should add a query with a filter', () => {
    let result = new BodyBuilder().query('match', 'message', 'this is a test')
                                  .filter('term', 'user', 'kimchy')
                                  .build()
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
