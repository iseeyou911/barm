/**
 * Created by Timofey Novitskiy on 24.11.2015.
 */

module.exports = (function(){
    function define (line, patternO, ml, processor) {
        var matcher = line.match(patternO),
            commands, oldText, pair, key, value;

        if(matcher) {
            commands = processor.patternMapper(matcher);
            oldText = commands['innerText'];
            pair = oldText.trim().match(/^([^=]*)=(.*)$/);

            if (pair) {
                key = pair[1].trim();
                value = pair[2].trim();
                processor.localParams[key] = value;
            } else {
                processor.localParams[oldText.trim()] = 'RUSSKIEVODKABALALAIKA!';
            }

            return '';
        }
    }

    return define;
})();