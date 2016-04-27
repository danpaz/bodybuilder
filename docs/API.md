# BodyBuilder

The main builder class.

**Examples**

```javascript
var body = new Bodybuilder()
  .query('match', 'text', 'this is a test')
  .build()
```

## aggregation

Apply a aggregation of a given type providing all the necessary arguments,
passing these arguments directly to the specified aggregation builder.
Merges existing aggregation(s) with the new aggregation. You may nest
aggregations by passing in a `Function` callback as the last parameter.
The callback will receive the newly built aggregation upon which you can
keep calling `aggregation(type, ...args)`.

**Parameters**

-   `type` **String** Name of the aggregation type.
-   `args` **...args** Arguments passed to aggregation builder. May include
                           am optional nesting function as its last element.

**Examples**

```javascript
var body = new Bodybuilder()
  .query('match', 'text', 'this is a test')
  .aggregation('terms', 'someField', 'bySomeField',
    // Nest aggregations on "bySomeField"
    agg =>
      agg
        .agregation('max', 'someOtherField')
        .aggregation('missing', 'anotherField')
   )
  .build()
```

Returns **BodyBuilder** Builder class.

## build

Constructs the elasticsearch query body in its current state.

**Parameters**

-   `version` **String** Version to generate.

Returns **Object** Query body.

## filter

Apply a filter of a given type providing all the necessary arguments,
passing these arguments directly to the specified filter builder. Merges
existing filter(s) with the new filter.

**Parameters**

-   `type` **String** Name of the filter type.
-   `args` **...args** Arguments passed to filter builder.

Returns **BodyBuilder** Builder class.

## from

Set a _from_ offset value, for paginating a query.

**Parameters**

-   `quantity` **Number** The offset from the first result you want to
                              fetch.

Returns **BodyBuilder** Builder class.

## query

Apply a query of a given type providing all the necessary arguments,
passing these arguments directly to the specified query builder. Merges
existing query(s) with the new query.

**Parameters**

-   `type` **String** Name of the query type.
-   `args` **...args** Arguments passed to query builder.

Returns **BodyBuilder** Builder class.

## rawOption

Set any key-value on the elasticsearch body.

**Parameters**

-   `k` **String** Key.
-   `v` **String** Value.

Returns **BodyBuilder** Builder class.

## size

Set a _size_ value for maximum results to return.

**Parameters**

-   `quantity` **Number** Maximum number of results to return.

Returns **BodyBuilder** Builder class.

## sort

Set a sort direction on a given field.

**Parameters**

-   `field` **String** Field name.
-   `direction` **[String]** A valid direction: 'asc' or 'desc'. (optional, default `'asc'`)

Returns **BodyBuilder** Builder class.
