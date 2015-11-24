/**
 * Created by Timofey Novitskiy on 24.11.2015.
 */

var CONSTS = require('../barm-consts');

module.exports = (function () {
    function insert(line, patternO, ml, processor) {
        var matcher = line.match(patternO),
            commands, condition;

        if (matcher) {
            commands = processor.patternMapper(matcher);
            condition = commands['if'];

            if (condition == null || processor.checkCondition(condition)) {
                ml && processor.setState(CONSTS.STATE.INSERT_START);
                return "";
            }

            return commands['innerText'];
        }
    }

    return insert;
})();