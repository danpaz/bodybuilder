import "../test-util/extend-object-proto"
import test from "tape"
import bodyBuilder from "../src"
import filterBuilder from "../src/filter-builder"

test("with Object#should | bodyBuilder returns a should-filter", t => {
  t.plan(1)

  const result = bodyBuilder()
    .orFilter("term", "email", "kimchee@kimchee.com")
    .orFilter("term", "username", "kimchee")
    .build()

  t.deepEqual(result, {
    query: {
      bool: {
        filter: {
          bool: {
            should: [
              {
                term: {
                  email: "kimchee@kimchee.com"
                }
              },
              {
                term: {
                  username: "kimchee"
                }
              }
            ]
          }
        }
      }
    }
  })
})

test("with Object#should | queryBuilder builds a should query", t => {
  t.plan(1)
  const result = filterBuilder()
    .orFilter("term", "email", "kimchee@kimchee.com")
    .orFilter("term", "username", "kimchee")
    .getFilter()

  t.deepEqual(result, {
    bool: {
      should: [
        {
          term: {
            email: "kimchee@kimchee.com"
          }
        },
        {
          term: {
            username: "kimchee"
          }
        }
      ]
    }
  })
})
