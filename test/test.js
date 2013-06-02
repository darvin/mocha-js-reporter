#!/usr/bin/env node

var mochaJsReporter = require("../")
  , test = require('tape')
  , path = require('path')
  , util = require('util');
var cleanUp = function(suite) {
  if (suite.specs) {
    suite.specs.forEach(function(spec) {
      cleanUp(spec);
    })
  }
  if (suite.suites) {
    suite.suites.forEach(function(suite) {
      cleanUp(suite);
    })
  }
  if (suite.durationSec) {
    delete suite.durationSec;
  }
}
test("Mocha JS Reporter test", function(t) {

  var Mocha = require("mocha");
  var mocha = new Mocha;
  mocha.ui("bdd");
  mocha.reporter(mochaJsReporter);
  mocha.addFile(path.join(__dirname,"example/spec.js"));
  mocha.run(function(err, result) {
    var result = Mocha.getJSReport();

    console.log(util.inspect(result, false, 10, true));
    // console.log(JSON.stringify(result, null, 2));

    t.ok((result.durationSec>0.09)&&(result.durationSec<0.4), "Duration should be around 0.1 sec");

    var expected = require(path.join(__dirname, "expected.json"));
    
    t.deepEqual(cleanUp(expected), cleanUp(result), "Result should be equal to expected");
    t.end();

  })

});