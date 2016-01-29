'use strict';

var routing = require('./routing');

// Get/set config data. If value was passed, set. Otherwise, get.
var config = module.exports = function(prop, value) {
  if (arguments.length === 2) {
    // Two arguments were passed, set the property's value.
    return config.set(prop, value);
  } else {
    // Get the property's value (or the entire data object).
    return config.get(prop);
};

// The actual config data.
config.data = {};

// Initialize config data.
config.init = function(obj) {
  console.log('Initializing routes config.');
  // Initialize and return data.
  return (config.data = obj || {});
};

// Match '<%= FOO %>' where FOO is a propString, eg. foo or foo.bar but not
// a method call like foo() or foo.bar().
var propStringTmplRe = /^<%=\s*([a-z0-9_$]+(?:\.[a-z0-9_$]+)*)\s*%>$/i;

// Get config data, recursively processing templates.
config.get = function(prop) {
  return config.process(config.getRaw(prop));
};

// Expand a config value recursively. Used for post-processing raw values
// already retrieved from the config.
config.process = function(raw) {
  return grunt.util.recurse(raw, function(value) {
    // If the value is not a string, return it.
    if (typeof value !== 'string') { return value; }
    // If possible, access the specified property via config.get, in case it
    // doesn't refer to a string, but instead refers to an object or array.
    var matches = value.match(propStringTmplRe);
    var result;
    if (matches) {
      result = config.get(matches[1]);
      // If the result retrieved from the config data wasn't null or undefined,
      // return it.
      if (result != null) { return result; }
    }
    // Process the string as a template.
    return grunt.template.process(value, {data: config.data});
  });
};

// Set config data.
config.set = function(prop, value) {
  return grunt.util.namespace.set(config.data, config.getPropString(prop), value);
};

// Deep merge config data.
config.merge = function(obj) {
  grunt.util._.merge(config.data, obj);
  return config.data;
};
