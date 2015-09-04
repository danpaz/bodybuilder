import BodyBuilder from '../src/index'
import {expect} from 'chai'

describe('BodyBuilder', () => {

  it('should work', () => {
    let result = new BodyBuilder()
    expect(result).to.eql({
      query: {}
    })
  })

  it('should set a sort direction', () => {
    let result = new BodyBuilder().sort('asc')
    expect(result).to.eql({
      query: {},
      sort: 'asc'
    })
  })

  it('should set a size', () => {
    let result = new BodyBuilder().size(25)
    expect(result).to.eql({
      query: {},
      size: 25
    })
  })

  it('should add a filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
    expect(result).to.eql({
      query: {
        filter: {
          term: {user: 'kimchy'}
        }
      },
    })
  })

  it('should add two filters using bool filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .filter('term', 'user', 'herald')
    expect(result).to.eql({
      query: {
        filter: {
          bool: {
            must: [
              {term: {user: 'kimchy'}},
              {term: {user: 'herald'}}
            ]
          }
        }
      },
    })
  })

  it('should add three filters using bool filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .filter('term', 'user', 'herald')
                                  .filter('term', 'user', 'johnny')
    expect(result).to.eql({
      query: {
        filter: {
          bool: {
            must: [
              {term: {user: 'kimchy'}},
              {term: {user: 'herald'}},
              {term: {user: 'johnny'}}
            ]
          }
        }
      },
    })
  })

  it('should add an or filter using bool filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .orFilter('term', 'user', 'herald')
    expect(result).to.eql({
      query: {
        filter: {
          bool: {
            should: [
              {term: {user: 'kimchy'}},
              {term: {user: 'herald'}}
            ]
          }
        }
      },
    })
  })

  it('should add and, not, and or filters using bool filter', () => {
    let result = new BodyBuilder().filter('term', 'user', 'kimchy')
                                  .filter('term', 'user', 'herald')
                                  .orFilter('term', 'user', 'johnny')
                                  .notFilter('term', 'user', 'cassie')
    expect(result).to.eql({
      query: {
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
      },
    })
  })

  it('should throw if filter type not found', () => {
    let fn = () => {
      new BodyBuilder().filter('not-found', 'user', 'kimchy')
    }
    expect(fn).to.throw(/Filter type not found/)
  })

})
