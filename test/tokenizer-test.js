var tokenizer = require('../lib/tokenizer')
	, chai = require('chai')
	, assert = chai.assert;


describe('tokenizer',function() {
	it('should get next token',function(done) {
		var token = tokenizer.nextToken('First token test.');	
		assert.equal(token[0],'First');
		done();
	});

	it('should get tokens',function(done) {
		var test_simple = 'test this token.';	
		var test_long = 'testthistoken.';	
		var test_dash = 'this is a-test.';	
		var tokens_simple = tokenizer.getAllTokens(test_simple);
		assert.equal(tokens_simple.length,3);
		assert.equal(tokenizer.getAllTokens(test_long)[0],'testthistoken');
		assert.equal(tokenizer.getAllTokens(test_dash)[2],'a');
		done();
	});

	it('should get tokens from object',function(done) {
		var obj =  {
			x: 123,
			s: 'Your going to get tokens.'
		};
		assert.deepEqual(tokenizer.getObjectTokens(obj),[ '123', 'Your', 'going', 'to', 'get', 'tokens' ]);
		assert.ok(tokenizer.getObjectTokens(null).length === 0);
		assert.ok(tokenizer.getObjectTokens([null]).length === 0);
		done();
	});

});
