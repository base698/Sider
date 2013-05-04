var sider = require('../lib/sider')
	, redis = require('redis')
	, client = redis.createClient()
	, _ = require('underscore')
	, chai = require('chai')
	, assert = chai.assert;

describe('search',function() {
	var obj = {
		x:"this is some rad index",
		y:123,
		id:2
	};
	var doc = {
		x: 'this rad tubes bro',
		y: 12,
		id: 4
	};
	var k1 = 'sdr:n:2';
	var k2 = 'sdr:n:4';

	before(function(done) {
		var indexer = new sider.Indexer();
		indexer.store(obj);
		indexer.store(doc);
		done();
	});

	it('Should search for single token.',function(done) {
		var searcher = new sider.Searcher();
		searcher.getIds('rad',function(replies) {
			console.log(replies);
			assert.sameMembers(replies,[k1,k2]);
			done();
		});
	});

	it('Should search for two tokens and fail.',function(done) {
		var searcher = new sider.Searcher();
		searcher.getIds('some bro',function(replies) {
			assert.ok(replies.length === 0);
			done();
		});

	});

	it('Should search for two tokens and succeed.',function(done) {
		var searcher = new sider.Searcher();
		searcher.getIds('this rad',function(replies) {
			assert.sameMembers(replies,[k1,k2]);
			done();
		});

	});

	it('Should search handle null.');

	after(function(done) {
		var indexer = new sider.Indexer();
		indexer.remove(k1,function() {
			indexer.remove(k2,done);	
		});

	});

});
