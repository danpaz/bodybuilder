/// <reference path="../bodybuilder.d.ts" />

import bodybuilder = require('bodybuilder');

bodybuilder().query('match_all');
bodybuilder().query('match', 'someId', 2);
bodybuilder().query('match', 'someId', 'someId');
bodybuilder().query('exists', 'user');
bodybuilder()
    .filter('term', 'user', 'kimchy')
    .build();
bodybuilder()
    .filter('term', 'user', 'kimchy')
    .build('v1');
bodybuilder()
    .query('exists', 'user')
    .filter('term', 'user', 'kimchy');
bodybuilder()
    .query('match', 'message', 'this is a test')
    .filter('term', 'user', 'kimchy')
    .build('v1');
bodybuilder().sort('timestamp').build();
bodybuilder()
    .sort([
        {categories: 'desc'},
        {content: 'desc'},
        'content'
    ]).build();
bodybuilder()
    .sort([
        {
            _geo_distance: {
                'a.pin.location': [-70, 40],
                order: 'asc',
                unit: 'km',
                mode: 'min',
                distance_type: 'sloppy_arc'
            }
        },
        {
            _geo_distance: {
                'b.pin.location': [-70, 40],
                order: 'asc',
                unit: 'km',
                mode: 'min',
                distance_type: 'sloppy_arc'
            }
        }
    ])
    .sort([
        {categories: 'desc'},
        {content: 'desc'},
        {content: 'asc'}
    ])
    .build();
bodybuilder().from(10).build();
bodybuilder().rawOption('a', {b: 'c'}).build();
bodybuilder().query('range', 'date', {gt: 'now-1d'});
bodybuilder().query('geo_distance', 'point', {lat: 40, lon: 20}, {distance: '12km'});
bodybuilder().query('nested', 'path', 'obj1', (q) => q.query('match', 'obj1.color', 'blue'));
bodybuilder().query('nested', 'path', 'obj1', {score_mode: 'avg'}, (q) => {
    return q.query('match', 'obj1.name', 'blue').query('range', 'obj1.count', {gt: 5})
});
bodybuilder()
    .query('match', 'title', 'eggs')
    .query('nested', 'path', 'comments', {score_mode: 'max'}, (q) => {
        return q
            .query('match', 'comments.name', 'john')
            .query('match', 'comments.age', 28)
    });
bodybuilder().query('constant_score', (q) => {
    return q
        .orFilter('term', 'created_by.user_id', 'abc')
        .orFilter('nested', 'path', 'doc_meta', (q) => {
            return q.query('constant_score', (q) => {
                return q.filter('term', 'doc_meta.user_id', 'abc')
            })
        })
        .orFilter('nested', 'path', 'tests', (q) => {
            return q.query('constant_score', (q) => {
                return q.filter('term', 'tests.created_by.user_id', 'abc')
            })
        })
});
bodybuilder()
    .query('match', 'message', 'this is a test')
    .filter('term', 'user', 'kimchy')
    .filter('term', 'user', 'herald')
    .orFilter('term', 'user', 'johnny')
    .notFilter('term', 'user', 'cassie')
    .aggregation('terms', 'user')
    .build();
bodybuilder()
    .notFilter('match', 'message', 'this is a test')
    .build();
bodybuilder().filter('match', 'message', 'this is a test');
bodybuilder()
    .notFilter('match', 'message', 'this is a test')
    .build();
bodybuilder().filter('or', [
    {term: {user: 'kimchy'}},
    {term: {user: 'tony'}}
]).build();
bodybuilder()
    .filter('constant_score', f => f.filter('term', 'user', 'kimchy'))
    .filter('term', 'message', 'this is a test')
    .build();
bodybuilder()
    .orFilter('bool', f => {
        f.filter('terms', 'tags', ['Popular'])
        f.filter('terms', 'brands', ['A', 'B'])
        return f
    })
    .orFilter('bool', f => {
        f.filter('terms', 'tags', ['Emerging'])
        f.filter('terms', 'brands', ['C'])
        return f
    })
    .orFilter('bool', f => {
        f.filter('terms', 'tags', ['Rumor'])
        f.filter('terms', 'companies', ['A', 'C', 'D'])
        return f
    })
    .build();
bodybuilder()
    .orFilter('term', 'user', 'kimchy')
    .orFilter('term', 'user', 'tony')
    .filterMinimumShouldMatch(2)
    .build();
bodybuilder()
    .orQuery('term', 'user', 'kimchy')
    .orQuery('term', 'user', 'tony')
    .queryMinimumShouldMatch(2)
    .build();
bodybuilder()
    .orQuery('term', 'user', 'kimchy')
    .orQuery('term', 'user', 'tony')
    .orFilter('term', 'user', 'kimchy')
    .orFilter('term', 'user', 'tony')
    .filterMinimumShouldMatch(1)
    .queryMinimumShouldMatch(2)
    .build();
bodybuilder()
    .query('bool', b => b.orQuery('match', 'title', 'Solr').orQuery('match', 'title', 'Elasticsearch'))
    .query('match', 'authors', 'clinton gormely')
    .notQuery('match', 'authors', 'radu gheorge')
    .build();

const body = bodybuilder();

body.query('bool', b => b
    .query('term', 'field1', 1)
    .query('term', 'field2', 2)
    .orQuery('term', 'field3', 3));
body.query('bool', b => b
    .query('term', 'field4', 10)
    .query('term', 'field5', 20)
    .orQuery('term', 'field6', 30));
bodybuilder()
    .sort([
        'something'
    ])
    .build();
bodybuilder().aggregation('filter', 'name', 'test', (a) => {
    return a.filter('nested', {path: 'skus'}, (n) => {
        return n.filter('terms', { 'material': 'wood' })
    })
        .aggregation('terms', 'some', 'thing')
}).build();