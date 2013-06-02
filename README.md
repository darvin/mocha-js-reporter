[![browser support](https://ci.testling.com/darvin/mocha-js-reporter.png)](https://ci.testling.com/darvin/mocha-js-reporter)
[![Build Status](https://travis-ci.org/darvin/mocha-js-reporter.png?branch=master)](https://travis-ci.org/darvin/mocha-js-reporter)

mocha-js-reporter
===================

JS runtime reporter for Mocha.

Runtime reporter for Mocha in [Jasmine JS-Reporter](https://github.com/detro/jasmine-jsreporter) format. 


This is a Mocha reporter, designed to simplify the extraction of test results from the Page.
It's tailored with _Test Reporting Automation_ in mind.

Ideal scenario of use are:

* Use Selenium Web Driver to extract the result out of the page
* Use PhantomJS to do... well, the same as above
* Every time you wish Jasmine produced a JSON to report about the tests

## What does it do?

The Reporter awaits for all the Test to finish, than produces a report that can be retrieved with

```javascript
var JSONReport = mocha.getJSReport ();
```
and looks like the following:

```JSON
{
    "suites": [
        {
            "description": "Simple test that checks the obvious regarding Truthy-ness and Falsy-ness",
            "durationSec": 0.005,
            "specs": [
                {
                    "description": "should report that a number is truthy, if different than '0', falsy otherwise",
                    "durationSec": 0.004,
                    "passed": true,
                    "skipped": false,
                },
                // ... more specs here...
            ],
            "suites": [],
            "passed": true
        }
    ],
    "durationSec": 0.005,
    "passed": true
}
```

After that, you can just extract it from the page.

## How do I download it and check it works

1. Download the code:
    * `git clone http://github.com/darvin/mocha-js-reporter.git`
2. Include the reporter in your page running Jasmine tests with something like:
    * `<script src="path/to/mocha-js-reporter.js" type="text/javascript"></script>`
3. Open your [WebInspector](http://trac.webkit.org/wiki/WebInspector), [Firebug](http://getfirebug.com/) or whatever you use
4. On the console, type:
    * `mocha.getJSReport ()`
5. Check that you get an Object back (should look like the above one)
6. You are done!

Now you can setup your Test Infrastructure to _extract test results from the test page_, in the same way I just showed you.

