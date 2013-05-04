var sider = require('../lib/sider')
	, redis = require('redis')
	, client = redis.createClient()
	, _ = require('underscore')
	, chai = require('chai')
	, assert = chai.assert;


describe('Indexer',function() {
	var obj = {
		x:"this is some rad index",
		y:123,
		id:2
	};
	var k = 'sdr:n:2';

	before(function(done) {
		done();
	});

	it('Should make an index for tokens.',function(done) {
		var indexer = new sider.Indexer();
		indexer.store(obj);
		client.smembers('sdr:word:this',function(err,replies) {
			assert.equal(replies[0],k);
			done();
		});
		
	});

	it('Should make an index with a type.');

	it('Should store a result object.',function(done) {
		client.hmget(k+':result','y',function(err,replies) {
			assert.equal(replies[0],'123');
			done();
		});
	});

	it('should store a clean object',function(done) {
		client.smembers(k+':clean',function(err,replies) {
			assert.deepEqual(_.filter(replies,function(i) {
				if(i === 'sdr:word:this') return true;
				if(i === 'sdr:word:rad') return true;
			}),['sdr:word:this','sdr:word:rad']);
			done();
		});
	});

	after(function(done) {
		var indexer = new sider.Indexer();
		indexer.remove(k,done);
	});

});
