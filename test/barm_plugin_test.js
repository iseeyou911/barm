'use strict';

var grunt = require('grunt');

/*

*/
/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.barm = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    default_options: function (test) {
        test.expect(4);

        var actual = grunt.file.read('tmp/replace_test.js');
        var expected = grunt.file.read('test/expected/replace_test.js');
        test.equal(actual, expected, 'Js replace test');

        actual = grunt.file.read('tmp/insert_test.js');
        expected = grunt.file.read('test/expected/insert_test.js');
        test.equal(actual, expected, 'Js insert_test test');

        actual = grunt.file.read('tmp/replace_insert_test.html');
        expected = grunt.file.read('test/expected/replace_insert_test.html');
        test.equal(actual, expected, 'html replace_insert_test test');

        actual = grunt.file.read('tmp/import_test.js');
        expected = grunt.file.read('test/expected/import_test.js');
        test.equal(actual, expected, 'Js import_test test');

        test.done();
    }
};
