/**
 * Created by Timofey Novitskiy on 24.11.2015.
 */

var BarmProcessor = require('./barm-processor'),
    extend = require('extend'),
    defaultConfig = require('./default-config');

module.exports = (function () {
    Barm.prototype.make = function make (file, ext, localPrams) {
        var processor = new BarmProcessor(this, localPrams || {});
        return processor.run(file, ext).join(this.config.joinSeparator);
    };

    Barm.prototype.keyWords = ['if', 'pattern', 'to', 'file', 'type'];
    Barm.prototype.globalParams = {};
    Barm.prototype.config = extend({}, defaultConfig);

    function Barm(config) {
        extend(this.config, config || {});
        extend(this.globalParams, config.globalParams || {});
    }

    return Barm;
})();