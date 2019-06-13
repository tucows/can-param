var QUnit = require("steal-qunit");
var param = require("./can-param");

QUnit.module("can-param");

QUnit.test("can-param", function(assert) {
	assert.deepEqual( param( {foo: "bar", baz: "zed"} ), "foo=bar&baz=zed", "Regular object");
	assert.deepEqual( param( {foo: {bar: "baz"}} ), encodeURI("foo[bar]=baz"), "Nested object");
	/* commented-out: only support flat-structure to avoid encoded-characters
	assert.deepEqual( param( {foo: ["bar", "baz"]} ), encodeURI("foo[]=bar&foo[]=baz"), "Nested array");
	*/
	assert.deepEqual( param( {foo: "bar & baz"} ), "foo=bar+%26+baz", "Spec chars values");
	/* commented-out: only support flat-structure to avoid encoded-characters
	assert.equal(param({
		age: {
			or: [ {lte: 5}, null ]
		}
	}), encodeURI("age[or][0][lte]=5&age[or][1]=null"));
	*/

	assert.deepEqual(param({
		"undefined": undefined,
		"null": null,
		"NaN": NaN,
		"true": true,
		"false": false
	}),"undefined=undefined&null=null&NaN=NaN&true=true&false=false","true, false, undefined, etc");
});

/* commented-out: only support flat-structure to avoid encoded-characters
QUnit.test("Encoding arrays of objects includes indices", function(assert) {
	var object = {items: [{name:'one'}, {name:'two'}]};
	var out = param(object);

	assert.equal(out, "items%5B0%5D%5Bname%5D=one&items%5B1%5D%5Bname%5D=two");
});
*/

QUnit.test("Encoding array of primitives does not include indices", function(assert) {
	var object = {items: ['one', 'two']};
	var out = param(object);

	/* commented-out: only support flat-structure to avoid encoded-characters
	assert.equal(out, "items%5B%5D=one&items%5B%5D=two");
	*/
	assert.equal(out, "items=one&items=two");
});
