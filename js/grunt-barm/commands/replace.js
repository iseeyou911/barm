/**
 * Created by Timofey Novitskiy on 24.11.2015.
 */

var CONSTS = require('../barm-consts');

module.exports = (function () {

    /**
     *
     * @param line
     * @param patternO
     * @param ml
     * @param {BarmProcessor} processor
     * @returns {*}
     */
    function replace (line, patternO, ml, processor) {
        var matcher = line.match(patternO),
            str, result, commands, strPattern, strReplace, condition, oldText;

        if (matcher) {
            commands = processor.patternMapper(matcher);
            strPattern = commands['pattern'];
            strReplace = commands['to'];
            condition = commands['if'];
            oldText = commands['innerText'];

            //strPattern = strPattern ? new RegExp(strPattern) : strPattern;

            if (condition != null && !processor.checkCondition(condition)) {
                return null;
            }

            if (strReplace != null) {
                str = processor.replacePlaceHolder(strReplace.trim());
                str = processor.replacePlaceHolder(str);
                if (strPattern == null) {
                    result = matcher.input.substr(0, matcher.index) + str + matcher.input.substr(matcher.index + matcher[0].length);
                } else {
                    result = str;
                }
            } else {
                result = matcher.input.substr(0, matcher.index) + oldText + matcher.input.substr(matcher.index + matcher[0].length);
            }

            ml && processor.setState(CONSTS.STATE.REPLACE_START);

            if (strPattern != null || ml) {
                return [strPattern != null ? processor.replacePlaceHolder(strPattern) : strPattern, result]
            } else {
                return result;
            }
        }
    }
        return replace;
})();