"use strict";
var namespace = require("can-namespace");

function buildParam(prefix, obj, add) {
	if (Array.isArray(obj)) {
		for (var i = 0, l = obj.length; i < l; ++i) {
			var inner = obj[i];
			/* commented-out: only support flat-structure to avoid encoded-characters
			var shouldIncludeIndex = typeof inner === 'object';
			var arrayIndex = shouldIncludeIndex ? '[' + i + ']' : '[]';
			buildParam(prefix + arrayIndex, inner, add);
			*/
			buildParam(prefix, inner, add);
		}
	} else if ( obj && typeof obj === "object" ) {
		for (var name in obj) {
			buildParam(prefix + '[' + name + ']', obj[name], add);
		}
	} else {
		add(prefix, obj);
	}
}

module.exports = namespace.param = function param(object) {
	var pairs = [],
		add = function (key, value) {
			pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
		};
	for (var name in object) {
		buildParam(name, object[name], add);
	}
	return pairs.join('&')
		.replace(/%20/g, '+');
};
