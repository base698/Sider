var _ = require('underscore');

module.exports = {
	nextToken: function(str) {
		var token = '';
		var ch;
		while(str) {
			ch = str.charAt(0);	
			str = str.substring(1);
			if(/\W/.test(ch)) {
				return [token,str];
			} else {
				token += ch;
			}
		}
		return [token,str];
	},
	getAllTokens: function(str) {
		if(typeof str === 'number') return [''+str];
		var token;
		var tokens = [];
		var ret;
		while(str) {
			ret = this.nextToken(str);
			str = ret[1];
			tokens.push(ret[0]);
		}
		return tokens;
	},
	getObjectTokens: function(obj) {
		var stack = [obj];	
		var tokens = [];
		while(stack.length > 0) {
			obj = stack.pop();	
			if(_.isNull(obj) || _.isUndefined(obj) || typeof obj === 'boolean') continue;
			
			if(typeof obj === 'string' || typeof obj === 'number') {
				tokens = tokens.concat(this.getAllTokens(obj));
			} else {
				_.each(obj,function(v,k) {
					if(_.isArray(v)) {
						stack = v.concat(stack);	
					} else if(_.isObject(v)) {
						stack = _.values(v).concat(stack);
					} else {
						stack.unshift(v);
					}
				});
			}
		};
		return tokens;
	}
}
			
