# Sider
An inverted index search in node based on Redis.  If you want a text search, but you don't yet need the power of lucene or solr.

## Simple api

Indexing an object:

```js
var indexer = new sider.Indexer();
indexer.store({
	id:2,
	x:"This is some rad index",
	y:123
});
```

Search:

```js
var searcher = new sider.Searcher();
searcher.getIds('this rad',function(results) {
	// do something with your ids	
});
```


