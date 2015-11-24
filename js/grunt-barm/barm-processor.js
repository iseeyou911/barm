/**
 * Created by Timofey Novitskiy on 24.11.2015.
 */

var CONSTS = require('./barm-consts'),
    extend = require('extend');

module.exports = (function () {

    /**
     *
     * @param {String} condition
     * @param {Object} localParams
     * @returns {boolean}
     */
    BarmProcessor.prototype.checkCondition = function checkCondition(condition) {
        var key, value,
            pair = condition.match(/^([^=]*)=(.*)$/);
        if (pair) {
            key = pair[1].trim();
            value = pair[2].trim();
            return ('' + this.getParam(key)) === value;
        }
        return this.getParam(condition) != null;
    };


    /**
     *
     * @param {Array} matcher
     * @returns {Object}
     */
    BarmProcessor.prototype.patternMapper = function patternMapper(matcher) {
        var i, isNotKeyWord,
            result = {};
        for (i = 1; i < matcher.length; i++) {
            isNotKeyWord = true;
            this.factory.keyWords.forEach(function (it) {
                if (matcher[i] == it) {
                    result[it] = matcher[i + 1];
                    i++;
                    isNotKeyWord = false;
                    return true;
                }
            });

            if (isNotKeyWord && matcher[i] != null) {
                result['innerText'] = matcher[i];
            }
        }

        return result;
    };

    BarmProcessor.prototype.getParam = function getParam (name) {
        var tmp = this.localParams[name];

        return tmp ? tmp : this.factory.globalParams[name];
    };

    /**
     *
     * @param {String} str
     * @returns {string}
     */
    BarmProcessor.prototype.replacePlaceHolder = function replacePlaceHolder(str) {
        var self = this;

        return str.replace(/\$\{([^}]*)\}/g, function (full, word) {
            var tmp, pair = word.match(/^([^:]*):(.*)$/);
            if (pair) {
                word = pair[1];
            }


            tmp = self.getParam(word);

            if (tmp != null) {
                if (pair && pair[2] == "removeQuotes") {
                    return tmp.replace(/^['"](.*)['"]$/g, '$1');
                } else if (pair) {
                    throw "Can't find command" + pair[2];
                } else {
                    return tmp;
                }
            } else {
                throw "Can't find placeholder " + full;
            }
        })
    };

    BarmProcessor.prototype.checkEnd = function checkEnd(line, patternC) {
        var matcher = line.match(patternC);
        return !!matcher;
    };

    BarmProcessor.prototype.run = function run(file, ext) {

        var closePattern, checkNextLine, replaceTo,
            stringWasReplaced = false,
            result = null,
            cPatterns = this.factory.config.patterns[ext],
            newFile = [],
            key, it,
            editedLines = 0;

        file.split('\r\n')
            .forEach(function (line, index, lines) {
                result = null;

                if (this.isIdle()) {
                    if (cPatterns != null) {
                        closePattern = null;
                        for (key in cPatterns) {
                            it = cPatterns[key];
                            if (result == null && it['single'] != null) {
                                result = it['calll'](line, it['single'], false, this);
                            }
                            if (result == null && it['open'] != null) {
                                result = it['calll'](line, it['open'], true, this);
                                closePattern = it['close'];
                            }
                            if (result != null) {
                                break;
                            }
                        }
                    }

                    if (result instanceof Array) {
                        checkNextLine = result[0];
                        replaceTo = result[1];
                        result = "";
                    }
                } else {

                    if (!this.isIdle() && this.checkEnd(line, closePattern)) {
                        this.setState(CONSTS.STATE.IDLE);
                        checkNextLine = null;
                        stringWasReplaced = false;
                        line = "";
                    } else {
                        if (this.isState(CONSTS.STATE.REPLACE_START)) {
                            if (checkNextLine != null) {
                                result = line.replace(checkNextLine, replaceTo);
                            } else if (!stringWasReplaced) {
                                result = replaceTo;
                                stringWasReplaced = true;
                            } else {
                                result = "";
                            }

                        }

                        if (this.isState(CONSTS.STATE.INSERT_START) && result == null) {
                            result = line;
                        }
                    }
                }

                if (result != null) {
                    editedLines++;
                    newFile.push(result);
                } else {
                    newFile.push(line);
                }
            }, this);
        return newFile;
    };

    /**
     *
     * @param {Number} state
     */
    BarmProcessor.prototype.setState = function setState(state) {
        this.state = state;
    };

    /**
     *
     * @param {Number} state
     * @returns {boolean}
     */
    BarmProcessor.prototype.isState = function isState(state) {
        return this.state === state;
    };

    /**
     *
     * @returns {boolean}
     */
    BarmProcessor.prototype.isIdle = function isIdle() {
        return this.state === CONSTS.STATE.IDLE;
    };

    BarmProcessor.prototype.localParams = {};
    /**
     *
     * @param factory
     * @param localParams
     * @constructor
     */
    function BarmProcessor(factory, localParams) {
        this.factory = factory;
        this.localParams = localParams || {};
        this.setState(CONSTS.STATE.IDLE);
    }

    return BarmProcessor;
})();