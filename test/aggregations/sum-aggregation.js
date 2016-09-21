import sumAggregation from '../../src/aggregations/sum-aggregation'
import {expect} from 'chai'

describe('sumAggregation', () => {

  it('should create a sum aggregation', () => {
    let result = sumAggregation('grade', 'agg_name')
    expect(result).to.eql({
      agg_name: {
        sum: {
          field: 'grade'
        }
      }
    })
  })

  it('should allow a script property', () => {
    let result = sumAggregation('funds', 'Balance', {
      script: "doc['DEBIT_DC'].value + doc['CREDIT_DC'].value",
      lang: "expression"
    })
    expect(result).to.eql({
      Balance: {
        sum: {
          field: 'funds',
          script: "doc['DEBIT_DC'].value + doc['CREDIT_DC'].value",
          lang: "expression"
        }
      }
    })
  })

})
