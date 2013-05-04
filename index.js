var config = require('./config') 
	, tokenizer = require('./lib/tokenizer')
	, sider = require('./lib/sider');

module.exports =  function(opts) {
	config(opts);
	return {
		Indexer: sider.Indexer,
		Searcher: sider.Searcher
	};
}
