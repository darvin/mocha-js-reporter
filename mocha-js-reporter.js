
/**
 * Expose `JSReporter`.
 */


if ( typeof module === "object" && module && typeof module.exports === "object" ) {
  module.exports = JSReporter;
} else {
  if ( typeof define === "function" && define.amd ) {
    define( "JSReporter", [], function () { return jQuery; } );
  }
}

var BaseReporter;
 
var mocha;
if ( typeof window === "object" && typeof window.document === "object" ) {
  window.JSReporter = JSReporter;
  BaseReporter = Mocha.reporters.HTML;
} else {
  mocha =require("mocha");
  BaseReporter = mocha.reporters.Base;
}

/**
 * Initialize a new JSReporter reporter.
 *
 * @param {Runner} runner
 * @api public
 */

// usage:
//
// mocha.setup({"ui":"qunit", "reporter":JSReporter});
//
//
// after test:
// 
// mocha.getJSReport()
 
function JSReporter(runner) {
 
  function clean(test) {
  return {
      title: test.title
    , fullTitle: test.fullTitle()
    , duration: test.duration
    }
  };
 
  var self = this;
  BaseReporter.call(this, runner);
 
  var suites = {}
    , stack = new Array()
    , rootSuite = null;
 
 
  var createSuiteElement = function(suite) {
    return {
        description: suite.title
      , durationSec: 0
      , specs: []
      , suites: []
      , passed: null
    }
  }
  runner.on('suite', function(suite){
    var newSuite = createSuiteElement(suite)
    if (stack.length>0){
      stack[0].suites.push(newSuite);
    } else {
      rootSuite = newSuite;
    }
    stack.unshift(newSuite);
  });
 
  runner.on('suite end', function(suite){
    if (stack.length==0) return;

 
    var passed = true;
    var durationSec = 0;
    var suite = stack[0];
    for (var i=0; i<suite.specs.length; i++) {
      passed = passed && suite.specs[i].passed;
      durationSec += suite.specs[i].durationSec || 0;
    };
    for (var i=0; i<suite.suites.length; i++) {
      passed = passed && suite.suites[i].passed;
      durationSec += suite.suites[i].durationSec || 0;
    }
    suite.passed = passed;
    suite.durationSec = durationSec;
 
    stack.shift();
 
  });
 
 
  runner.on('test end', function(test){
    stack[0].specs.push({
        description: test.title
      , durationSec: (test.duration/1000) || 0
      , passed: test.state=="passed"
    });
  });

 
  runner.on('end', function(){
    mocha.getJSReport = function() {
      return rootSuite;
    };
  });

}