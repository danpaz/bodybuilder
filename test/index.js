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
    let result = new BodyBuilder().termFilter('user', 'kimchy')
    expect(result).to.eql({
      query: {
        filter: {
          term: {user: 'kimchy'}
        }
      },
    })
  })

})
