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
	var k = 'sdr:n:2';

	before(function(done) {
		var indexer = new sider.Indexer();
		indexer.store(obj);
		done();
	});

	it('Should search for tokens.',function(done) {
		var searcher = new sider.Searcher();
		searcher.getIds('this rad',function(replies) {
			assert.deepEqual(replies,['sdr:n:2']);
			done();
		});
	});

	after(function(done) {
		var indexer = new sider.Indexer();
		indexer.remove(k,done);
	});

});
