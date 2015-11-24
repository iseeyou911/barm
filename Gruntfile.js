/*
 * grunt-barm
 * https://github.com/iseeyou911/barm
 *
 * Copyright (c) 2015 Timofey Novitskiy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },
        copy: {
            tests: {
                files: {
                    'tmp/replace_test.js': 'test/fixtures/replace_test.js',
                    'tmp/import_test.js': 'test/fixtures/import_test.js',
                    'tmp/insert_test.js': 'test/fixtures/insert_test.js',
                    'tmp/replace_insert_test.html': 'test/fixtures/replace_insert_test.html',
                    'tmp/html.test.html': 'test/fixtures/html.test.html'
                }
            }
        },
        // Configuration to be run (and then tested).
        barm: {
            default_options: {
                options: {
                    globalParams : {
                        debug : true,
                        test : true,
                        rootPath : '\'_rootPath_\''
                    }
                },
                files: {
                    src:['tmp/**/*']
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'copy', 'barm', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
