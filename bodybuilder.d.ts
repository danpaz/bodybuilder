declare function bodybuilder(): bodybuilder.Bodybuilder;

declare namespace bodybuilder {
	export interface QuerySubFilterBuilder
		extends QueryBuilder<QuerySubFilterBuilder>, FilterBuilder<QuerySubFilterBuilder> {}

	export type QuerySubFilterFn = (
		agg: QuerySubFilterBuilder
	) => QuerySubFilterBuilder;

	export interface QueryBuilder<B> extends Object {
		query(type: string): B;
		query(type: string, field: string | object | QuerySubFilterFn): B;
		query(type: string, field: string | object, value: any): B;
		query(
			type: string,
			field: string | object,
			value: any,
			subfilters: QuerySubFilterFn
		): B;
		query(
			type: string,
			field: string | object,
			value: any,
			options: object
		): B;
		query(
			type: string,
			field: string | object,
			value: any,
			options: object,
			subfilters: QuerySubFilterFn
		): B;
		andQuery(type: string): B;
		andQuery(type: string, field: string | object | QuerySubFilterFn): B;
		andQuery(type: string, field: string | object, value: any): B;
		andQuery(type: string, field: string | object, value: any): B;
		andQuery(
			type: string,
			field: string | object,
			value: any,
			subfilters: QuerySubFilterFn
		): B;
		andQuery(
			type: string,
			field: string | object,
			value: any,
			options: object
		): B;
		andQuery(
			type: string,
			field: string | object,
			value: any,
			options: object,
			subfilters: QuerySubFilterFn
		): B;
		addQuery(type: string, field: string | object, value: any): B;
		addQuery(
			type: string,
			field: string | object,
			value: any,
			subfilters: QuerySubFilterFn
		): B;
		addQuery(
			type: string,
			field: string | object,
			value: any,
			options: object
		): B;
		addQuery(
			type: string,
			field: string | object,
			value: any,
			options: object,
			subfilters: QuerySubFilterFn
		): B;
		orQuery(type: string): B;
		orQuery(type: string, field: string | object | QuerySubFilterFn): B;
		orQuery(type: string, field: string | object, value: any): B;
		orQuery(
			type: string,
			field: string | object,
			value: any,
			subfilters: QuerySubFilterFn
		): B;
		orQuery(
			type: string,
			field: string | object,
			value: any,
			options: object
		): B;
		orQuery(
			type: string,
			field: string | object,
			value: any,
			options: object,
			subfilters: QuerySubFilterFn
		): B;
		notQuery(type: string): B;
		notQuery(type: string, field: string | object | QuerySubFilterFn): B;
		notQuery(type: string, field: string | object, value: any): B;
		notQuery(
			type: string,
			field: string | object,
			value: any,
			subfilters: QuerySubFilterFn
		): B;
		notQuery(
			type: string,
			field: string | object,
			value: any,
			options: object
		): B;
		notQuery(
			type: string,
			field: string | object,
			value: any,
			options: object,
			subfilters: QuerySubFilterFn
		): B;
		queryMinimumShouldMatch(param: string | number): B;
		getQuery(): object;
		hasQuery(): boolean;
	}

	export interface FilterSubFilterBuilder
		extends QueryBuilder<FilterSubFilterBuilder>,
			FilterBuilder<FilterSubFilterBuilder> {}

	export type FilterSubFilterFn = (
		agg: FilterSubFilterBuilder
	) => FilterSubFilterBuilder;

	export interface FilterBuilder<B> extends Object {
		filter(type: string): B;
		filter(type: string, field: string | object | FilterSubFilterFn): B;
		filter(type: string, field: string | object, value: FilterSubFilterFn): B;
		filter(type: string, field: string | object, value: any): B;
		filter(
			type: string,
			field: string | object,
			value: any,
			subfilters: FilterSubFilterFn
		): B;
		filter(
			type: string,
			field: string | object,
			value: any,
			options: object
		): B;
		filter(
			type: string,
			field: string | object,
			value: any,
			options: object,
			subfilters: FilterSubFilterFn
		): B;
		andFilter(type: string): B;
		andFilter(type: string, field: string | object | FilterSubFilterFn): B;
		andFilter(type: string, field: string | object, value: any): B;
		andFilter(
			type: string,
			field: string | object,
			value: any,
			subfilters: FilterSubFilterFn
		): B;
		andFilter(
			type: string,
			field: string | object,
			value: any,
			options: object
		): B;
		andFilter(
			type: string,
			field: string | object,
			value: any,
			options: object,
			subfilters: FilterSubFilterFn
		): B;
		addFilter(type: string, field: string | object | FilterSubFilterFn): B;
		addFilter(type: string, field: string | object, value: any): B;
		addFilter(
			type: string,
			field: string | object,
			value: any,
			subfilters: FilterSubFilterFn
		): B;
		addFilter(
			type: string,
			field: string | object,
			value: any,
			options: object
		): B;
		addFilter(
			type: string,
			field: string | object,
			value: any,
			options: object,
			subfilters: FilterSubFilterFn
		): B;
		orFilter(type: string): B;
		orFilter(type: string, field: string | object | FilterSubFilterFn): B;
		orFilter(type: string, field: string | object, value: any): B;
		orFilter(
			type: string,
			field: string | object,
			value: any,
			subfilters: FilterSubFilterFn
		): B;
		orFilter(
			type: string,
			field: string | object,
			value: any,
			options: object
		): B;
		orFilter(
			type: string,
			field: string | object,
			value: any,
			options: object,
			subfilters: FilterSubFilterFn
		): B;
		notFilter(type: string): B;
		notFilter(type: string, field: string | object | FilterSubFilterFn): B;
		notFilter(type: string, field: string | object, value: any): B;
		notFilter(
			type: string,
			field: string | object,
			value: any,
			subfilters: FilterSubFilterFn
		): B;
		notFilter(
			type: string,
			field: string | object,
			value: any,
			options: object
		): B;
		notFilter(
			type: string,
			field: string | object,
			value: any,
			options: object,
			subfilters: FilterSubFilterFn
		): B;
		filterMinimumShouldMatch(param: string | number): B;
		getFilter(): object;
		hasFilter(): boolean;
	}

	export interface SubAggregationBuilder
		extends AggregationBuilder<SubAggregationBuilder>,
			FilterBuilder<SubAggregationBuilder> {}

	export type SubAggregationFn = (
		agg: SubAggregationBuilder
	) => SubAggregationBuilder;

	export interface AggregationBuilder<B> extends Object {
		aggregation(type: string | object, field: string): B;
		aggregation(type: string | object, field: string | object, name: string): B;
		aggregation(
			type: string | object,
			field: string,
			subaggregations: SubAggregationFn
		): B;
		aggregation(
			type: string | object,
			field: string | object,
			name: string,
			subaggregations: SubAggregationFn | object
		): B;
		aggregation(type: string | object, field: string, options: object): B;
		aggregation(
			type: string | object,
			field: string,
			options: object,
			name: string
		): B;
		aggregation(
			type: string | object,
			field: string,
			options: object,
			subaggregations: SubAggregationFn
		): B;
		aggregation(
			type: string | object,
			field: string,
			options: object,
			name: string,
			subaggregations: SubAggregationFn
		): B;
		agg(type: string | object, field: string): B;
		agg(
			type: string | object,
			field: string,
			subaggregations: SubAggregationFn
		): B;
		agg(
			type: string | object,
            field: string | object,
			name: string,
			subaggregations: SubAggregationFn | object
		): B;
		agg(type: string | object, field: string, options: string | object): B;
		agg(type: string | object, field: string, options: object, name: string): B;
		agg(
			type: string | object,
			field: string,
			options: object,
			subaggregations: SubAggregationFn
		): B;
		agg(
			type: string | object,
			field: string,
			options: object,
			name: string,
			subaggregations: SubAggregationFn
		): B;
		getAggregations(): object;
		hasAggregations(): boolean;
	}

	export interface Bodybuilder
		extends Object,
			QueryBuilder<Bodybuilder>,
			FilterBuilder<Bodybuilder>,
			AggregationBuilder<Bodybuilder> {
		sort(field: string): Bodybuilder;
		sort(field: string, direction: string): Bodybuilder;
		sort(field: string, body: object): Bodybuilder;
		sort(fields: string[]): Bodybuilder;
		sort(fields: Array<{ [field: string]: string | object } | string >): Bodybuilder;
		from(quantity: number): Bodybuilder;
		size(quantity: number): Bodybuilder;
		rawOption(k: string, v: any): Bodybuilder;
		build(version?: string): object;
	}
}

declare module 'bodybuilder' {
	export = bodybuilder;
}
