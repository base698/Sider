var redis = require('redis')
	, client = redis.createClient()
	, tokenizer = require('./tokenizer')
	, _ = require('underscore');

function getConfig(config) {
	config = config || {};
	config.id = config.id || 'id';
	config.prefix = 'sdr:' + (config.type || 'n') + ':';
	config = _.extend(config,global.config);
	return config;
}

function getKey(config,obj) {
	var id = obj[config.id];
	var key = config.prefix + id;
	return key;
}

function Searcher(config) {
	this.config = getConfig(config);
}

Searcher.prototype = {
	getIds:function(str,cb) {
		var tokens = tokenizer.getAllTokens(str);
		tokens = _.map(tokens,function(i) {
			return 'sdr:word:'+i;
		});
		client.sinter(tokens,function(err,replies) {
			cb(replies);
		});

	},
	getObjs:function(str) {

	}
}

function Indexer(config) {
	this.config = getConfig(config);
}

Indexer.prototype = {
	store:function(obj) {
		var objKey = getKey(this.config,obj);
		var tokens = _.map(tokenizer.getObjectTokens(obj),function(i) {
			var searchKey = 'sdr:word:'+i;
			client.sadd(searchKey,objKey,redis.print);
			return searchKey;
		});
		var resultKey = objKey+':result';
		var cleanKey = objKey+':clean';
		client.sadd(cleanKey,tokens,redis.print);
		this.storeHash(resultKey,obj);
	},
	storeHash:function(key,obj) {
		_.each(obj,function(v,k) {
			client.hset(key,k,v,redis.print);
		});
	},
	remove:function(objKey,cb) {
		var resultKey = objKey+':result';
		var cleanKey = objKey+':clean';
		client.del(resultKey);
		client.smembers(cleanKey,function(err,replies) {
			replies.forEach(function(reply,i) {
				if(replies.length-1 === i) {
					client.del(cleanKey);
					cb();
				}
				console.log(reply);
				client.srem(reply,objKey);
			});
		});
	}
}

module.exports.Indexer = Indexer;
module.exports.Searcher = Searcher;
