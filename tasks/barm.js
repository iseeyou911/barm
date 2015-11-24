/*
 * grunt-barm
 * https://github.com/iseeyou911/barm
 *
 * Copyright (c) 2015 Timofey Novitskiy
 * Licensed under the MIT license.
 */

'use strict';

var Barm = require('../js/grunt-barm/barm');

module.exports = function(grunt) {

  grunt.registerMultiTask('barm', 'JavaScript, HTML, CSS preprocessor', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({}),
        barm = new Barm(options);

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.

      f.src.filter(function(filepath, index, files){
        var file = grunt.file.read(filepath),
            ext = filepath.match(/\.([^.]*)$/), processedFile;


        try {
          processedFile = barm.make(file, ext ? ext[1] : '');
          if (files.length === 1 && f.dest) {
            grunt.file.write(f.dest, processedFile);
            grunt.log.writeln('File "' + f.dest + '" created.');
          } else {
            grunt.file.write(filepath, processedFile);
            grunt.log.writeln('File "' + filepath + '" rewrited.');
          }
        } catch (e) {
          grunt.log.writeln('Error in preprocess "' + filepath + ' ' + e);
        }
      });

      // Write the destination file.
      //grunt.file.write(f.dest, src);

      // Print a success message.
      //grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
