declare function bodybuilder(): Bodybuilder;

export interface QuerySubFilterBuilder extends FilterBuilder<QuerySubFilterBuilder> {}
export type QuerySubFilterFn = (agg: QuerySubFilterBuilder) => QuerySubFilterBuilder

export interface QueryBuilder<B> extends Object {
  query(type: string, field: string | object, value: string | object): B;
  query(type: string, field: string | object, value: string | object, subfilters: QuerySubFilterFn): B;
  query(type: string, field: string | object, value: string | object, options: object): B;
  query(type: string, field: string | object, value: string | object, options: object, subfilters: QuerySubFilterFn): B;

  andQuery(type: string, field: string | object, value: string | object): B;
  andQuery(type: string, field: string | object, value: string | object, subfilters: QuerySubFilterFn): B;
  andQuery(type: string, field: string | object, value: string | object, options: object): B;
  andQuery(type: string, field: string | object, value: string | object, options: object, subfilters: QuerySubFilterFn): B;

  addQuery(type: string, field: string | object, value: string | object): B;
  addQuery(type: string, field: string | object, value: string | object, subfilters: QuerySubFilterFn): B;
  addQuery(type: string, field: string | object, value: string | object, options: object): B;
  addQuery(type: string, field: string | object, value: string | object, options: object, subfilters: QuerySubFilterFn): B;

  orQuery(type: string, field: string | object, value: string | object): B;
  orQuery(type: string, field: string | object, value: string | object, subfilters: QuerySubFilterFn): B;
  orQuery(type: string, field: string | object, value: string | object, options: object): B;
  orQuery(type: string, field: string | object, value: string | object, options: object, subfilters: QuerySubFilterFn): B;

  notQuery(type: string, field: string | object, value: string | object): B;
  notQuery(type: string, field: string | object, value: string | object, subfilters: QuerySubFilterFn): B;
  notQuery(type: string, field: string | object, value: string | object, options: object): B;
  notQuery(type: string, field: string | object, value: string | object, options: object, subfilters: QuerySubFilterFn): B;

  queryMinimumShouldMatch(param: string | number): B;

  getQuery(): object;

  hasQuery(): boolean;
}

export interface FilterSubFilterBuilder extends QueryBuilder<FilterSubFilterBuilder>, FilterBuilder<FilterSubFilterBuilder> {}
export type FilterSubFilterFn = (agg: FilterSubFilterBuilder) => FilterSubFilterBuilder

export interface FilterBuilder<B> extends Object {
  filter(type: string, field: string | object, value: string | object): B;
  filter(type: string, field: string | object, value: string | object, subfilters: FilterSubFilterFn): B;
  filter(type: string, field: string | object, value: string | object, options: object): B;
  filter(type: string, field: string | object, value: string | object, options: object, subfilters: FilterSubFilterFn): B;

  andFilter(type: string, field: string | object, value: string | object): B;
  andFilter(type: string, field: string | object, value: string | object, subfilters: FilterSubFilterFn): B;
  andFilter(type: string, field: string | object, value: string | object, options: object): B;
  andFilter(type: string, field: string | object, value: string | object, options: object, subfilters: FilterSubFilterFn): B;

  addFilter(type: string, field: string | object, value: string | object): B;
  addFilter(type: string, field: string | object, value: string | object, subfilters: FilterSubFilterFn): B;
  addFilter(type: string, field: string | object, value: string | object, options: object): B;
  addFilter(type: string, field: string | object, value: string | object, options: object, subfilters: FilterSubFilterFn): B;

  orFilter(type: string, field: string | object, value: string | object): B;
  orFilter(type: string, field: string | object, value: string | object, subfilters: FilterSubFilterFn): B;
  orFilter(type: string, field: string | object, value: string | object, options: object): B;
  orFilter(type: string, field: string | object, value: string | object, options: object, subfilters: FilterSubFilterFn): B;

  notFilter(type: string, field: string | object, value: string | object): B;
  notFilter(type: string, field: string | object, value: string | object, subfilters: FilterSubFilterFn): B;
  notFilter(type: string, field: string | object, value: string | object, options: object): B;
  notFilter(type: string, field: string | object, value: string | object, options: object, subfilters: FilterSubFilterFn): B;

  filterMinimumShouldMatch(param: string | number): B;

  getFilter(): object;

  hasFilter(): boolean;
}

export interface SubAggregationBuilder extends AggregationBuilder<SubAggregationBuilder>, FilterBuilder<SubAggregationBuilder> {}
export type SubAggregationFn = (agg: SubAggregationBuilder) => SubAggregationBuilder

export interface AggregationBuilder<B> extends Object {
  aggregation(type: string | object, field: string): B;
  aggregation(type: string | object, field: string, name: string): B;
  aggregation(type: string | object, field: string, subaggregations: SubAggregationFn): B;
  aggregation(type: string | object, field: string, name: string, subaggregations: SubAggregationFn): B;
  aggregation(type: string | object, field: string, options: object): B;
  aggregation(type: string | object, field: string, options: object, name: string): B;
  aggregation(type: string | object, field: string, options: object, subaggregations: SubAggregationFn): B;
  aggregation(type: string | object, field: string, options: object, name: string, subaggregations: SubAggregationFn): B;

  agg(type: string | object, field: string): B;
  agg(type: string | object, field: string, name: string): B;
  agg(type: string | object, field: string, subaggregations: SubAggregationFn): B;
  agg(type: string | object, field: string, name: string, subaggregations: SubAggregationFn): B;
  agg(type: string | object, field: string, options: object): B;
  agg(type: string | object, field: string, options: object, name: string): B;
  agg(type: string | object, field: string, options: object, subaggregations: SubAggregationFn): B;
  agg(type: string | object, field: string, options: object, name: string, subaggregations: SubAggregationFn): B;

  getAggregations(): object;

  hasAggregations(): boolean;
}

export interface Bodybuilder extends Object, QueryBuilder<Bodybuilder>, FilterBuilder<Bodybuilder>, AggregationBuilder<Bodybuilder> {
  sort(field: string): Bodybuilder;
  sort(fields: Array<{[field: string]: string | object}>): Bodybuilder;
  sort(field: string, direction: string): Bodybuilder;

  from(quantity: number): Bodybuilder;

  size(quantity: number): Bodybuilder;

  rawOption(k: string, v: any): Bodybuilder;

  build(version?: string): object;
}

export default bodybuilder;
