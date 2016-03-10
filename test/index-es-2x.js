import BodyBuilder from '../src/index'
import {expect} from 'chai'

describe('BodyBuilder ES 2x', () => {

  it('should default to empty query', () => {
    let result = new BodyBuilder().build()
    expect(result).to.eql({})
  })

  it('should return a copy of body when build', () => {
    let body = new BodyBuilder()
    let result1 = body.build('v2')
    let result2 = body.build('v2')
    expect(result1).to.not.equal(result2)
  })

  it('should use default sort direction', () => {
    let result = new BodyBuilder().sort('timestamp').build('v2')
    expect(result).to.eql({
      sort: {
        timestamp: {
          order: 'asc'
        }
      }
    })
  })

  it('should set a sort direction', () => {
    let result = new BodyBuilder().sort('timestamp', 'desc').build('v2')
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
                                  .build('v2')
    expect(result).to.eql({
      sort: {
        timestamp: {
          order: 'asc'
        }
      }
    })
  })

  it('should set a from value', () => {
    let result = new BodyBuilder().from(25).build('v2')
    expect(result).to.eql({
      from: 25
    })
  })

  it('should set a size value', () => {
    let result = new BodyBuilder().size(25).build('v2')
    expect(result).to.eql({
      size: 25
    })
  })

  it('should set a raw option', () => {
    let result = new BodyBuilder().rawOption('_sourceExclude', 'bigfield')
                                  .build('v2')
    expect(result).to.eql({
      _sourceExclude: 'bigfield'
    })
  })

  it('should add a filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .build('v2')
    expect(result).to.eql({
      query: {
        bool: {
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
                                  .build('v2')
    expect(result).to.eql({
      size: 25,
      from: 100,
      query: {
        bool: {
          filter: {
            term: {user: 'kimchy'}
          }
        }
      }
    })
  })

  it('should add two filters using bool filter ES 2x', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .filter('term', 'user', 'herald')
                                  .build('v2')
    expect(result).to.eql({
      query: {
        bool: {
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

  it('should add three filters using bool filter ES 2x', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .filter('term', 'user', 'herald')
                                  .filter('term', 'user', 'johnny')
                                  .build('v2')
    expect(result).to.eql({
      query: {
        bool: {
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

  it('should add an or filter using bool filter ES 2x', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .orFilter('term', 'user', 'herald')
                                  .build('v2')
    expect(result).to.eql({
      query: {
        bool: {
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

  it('should add and, not, and or filters using bool filter ES 2x', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .filter('term', 'user', 'herald')
                                  .orFilter('term', 'user', 'johnny')
                                  .notFilter('term', 'user', 'cassie')
                                  .build('v2')
    expect(result).to.eql({
      query: {
        bool: {
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

  it('should throw if filter type not found ES 2x', () => {
    let fn = () => {
      new BodyBuilder().filter('unknown', 'user', 'kimchy').build('v2')
    }
    expect(fn).to.throw('Filter type unknown not found.')
  })

  it('should add an aggregation ES 2x', () => {
    let result = new BodyBuilder().aggregation('terms', 'user').build('v2')
    expect(result).to.eql({
      aggs: {
        agg_terms_user: {
          terms: {
            field: 'user'
          }
        }
      }
    })
  })

  it('should add multiple aggregations ES 2x', () => {
    let result = new BodyBuilder().aggregation('terms', 'user')
                                  .aggregation('terms', 'name')
                                  .build('v2')
    expect(result).to.eql({
      aggs: {
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

  it('should add an aggregation and a filter ES 2x', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .agg('terms', 'user')
                                  .build('v2')
    expect(result).to.eql({
      query: {
        bool: {
          filter: {
            term: {user: 'kimchy'}
          }
        }
      },
      aggs: {
        agg_terms_user: {
          terms: {
            field: 'user'
          }
        }
      }
    })
  })

  it('should add a query ES 2x', () => {
    let result = new BodyBuilder().query('match', 'message', 'this is a test')
                                  .build('v2')
    expect(result).to.eql({
      query: {
        match: {
          message: 'this is a test'
        }
      }
    })
  })

  it('should add multiple queries ES 2x', () => {
    let result = new BodyBuilder().query('match', 'message', 'this is a test')
                                  .andQuery('match', 'message', 'another test')
                                  .addQuery('match', 'title', 'test')
                                  .build('v2')
    expect(result).to.eql({
      query: {
        bool: {
          must: [
            {match: {message: 'this is a test'}},
            {match: { message: 'another test'}},
            {match: {title: 'test'}}
          ]
        }
      }
    })
  })

  it('should support starting with a should query ES 2x', () => {
    let result = new BodyBuilder().orQuery('match', 'message', 'this is a test')
                                  .build('v2')
    expect(result).to.eql({
      query: {
        bool: {
          should: [
            {match: {message: 'this is a test'}}
          ]
        }
      }
    })
  })

  it('should support starting with multiple should queries ES 2x', () => {
    let result = new BodyBuilder().orQuery('match', 'message', 'this is a test')
                                  .orQuery('match', 'message', 'another test')
                                  .build('v2')
    expect(result).to.eql({
      query: {
        bool: {
          should: [
            {match: {message: 'this is a test'}},
            {match: { message: 'another test'}}
          ]
        }
      }
    })
  })

  it('should add and, not, and or queries using bool query ES 2x', () => {
    let result = new BodyBuilder().query('term', 'user', 'kimchy')
                                  .query('term', 'user', 'herald')
                                  .orQuery('term', 'user', 'johnny')
                                  .notQuery('term', 'user', 'cassie')
                                  .build('v2')
    expect(result).to.eql({
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
    })
  })

  it('should add a query with a filter ES 2x', () => {
    let result = new BodyBuilder().query('match', 'message', 'this is a test')
                                  .filter('term', 'user', 'kimchy')
                                  .build('v2')
    expect(result).to.eql({
      query: {
        bool: {
          must: {
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

  it('should add queries with filters ES 2x', () => {
    let result = new BodyBuilder().query('match', 'message', 'this is a test')
                                  .andQuery('match', 'other', 'this is another test')
                                  .filter('term', 'user', 'kimchy')
                                  .filter('term', 'is_active', true)
                                  .build('v2')
    expect(result).to.eql({
      query: {
        bool: {
          must: [
            {
              match: {
                message: 'this is a test'
              }
            },
            {
              match: {
                other: 'this is another test'
              }
            }
          ],
          filter: {
            bool: {
              must: [
                {
                  term: {user: 'kimchy'}
                },
                {
                  term: {is_active: true}
                }
              ]
            }
          }
        }
      }
    })
  })

  it('should add multiples different queries ES 2x', () => {
    let result = new BodyBuilder().query('match', 'title', 'quick')
                                  .notQuery('match', 'title', 'lazy')
                                  .orQuery('match', 'title', 'brown')
                                  .orQuery('match', 'title', 'dog')
                                  .build('v2')
    expect(result).to.eql({
      "query": {
        "bool": {
          "must":     [  { "match": { "title": "quick" }} ],
          "must_not": [  { "match": { "title": "lazy"  }} ],
          "should":   [
                        { "match": { "title": "brown" }},
                        { "match": { "title": "dog"   }}
                      ]
        }
      }
    })
  })

  it('should add query_string queries ES 2x', () => {
    let result = new BodyBuilder().query('queryString', ['title'], 'this AND that OR thus')
                                  .build('v2')
    expect(result).to.eql({
      "query": {
        "query_string": {
          "query": "this AND that OR thus",
          "fields": ["title"]
        }
      }
    })
  })

})
