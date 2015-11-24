/**
 * Created by Timofey Novitskiy on 24.11.2015.
 */

var grunt = require('grunt');

module.exports = (function () {
    function _import(line, patternO, ml, processor) {
        var matcher = line.match(patternO),
            commands, condition, file, oldText, type, result;

        if (matcher) {
            commands = processor.patternMapper(matcher);
            condition = commands['if'];
            file = commands['file'];
            oldText = commands['innerText'];
            type = commands['type'];

            if (condition == null || processor.checkCondition(condition)) {
                try {
                    result = null;
                    if (type == 'css') {
                        result = '<style type="text/css">' + (grunt.file.read(processor.replacePlaceHolder(file))) + '</style>';
                    } else {
                        result = (grunt.file.read(processor.replacePlaceHolder(file)));
                    }

                    return result;
                } catch (e) {
                    return "";
                }
            }
        }
    }

    return _import;
})();