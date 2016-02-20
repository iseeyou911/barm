/**
 * Created by Timofey Novitskiy on 24.11.2015.
 */

var replaceCMD = require('./commands/replace'),
    insertCMD = require('./commands/insert'),
    defineCMD = require('./commands/define'),
    importCMD = require('./commands/import');

var DEFAULT_JOIN_SEPARATOR = '\r\n';

var patterns = {

    js: {
        define: {
            calll: defineCMD,
            single: /\/\/\s*define\s*(.*)/
        },
        'replace': {
            calll: replaceCMD,
            single: /\/\*\s*replace\s*(to)\s*=\s*\^([^\^]*)\^\s*(?:(pattern)\s*=\s*\^([^\^]*)\^\s*)?(?:(if)\s*=\s*\^([^\^]*)\^\s*)?\*\/(?:(.*)(?=\/\*\/\s*replace\s*\*\/)\/\*\/\s*replace\s*\*\/)/,
            open: /\/\*\s*replace\s*(to)\s*=\s*\^([^\^]*)\^\s*(?:(pattern)\s*=\s*\^([^\^]*)\^\s*)?(?:(if)\s*=\s*\^([^\^]*)\^\s*)?\s*\*\/\s*/,
            close: /\s*\/replace\s*\*\/\s*/
        },
        'insert': {
            calll: insertCMD,
            open: /\/\*\s*insert\s*(?:(if)\s*=\s*\^([^\^]*)\^\s*)?\s*/,
            close: /\s*\/insert\s*\*\/\s*/
        },
        'import': {
            calll: importCMD,
            single: /\/\/\s*import\s*(file)\s*=\s*\^([^\^]*)\^\s*(?:(type)\s*=\s*\^([^\^]*)\^\s*)?(?:(if)\s*=\s*\^([^\^]*)\^\s*)?/
        }
    },

    html: {
        define: {
            calll: defineCMD,
            single: /<!--\s*define\s*(.*)-->/
        },
        replace: {
            calll: replaceCMD,
            open: /<!--\s*replace\s*(to)\s*=\s*\^([^\^]*)\^\s*(?:(pattern)\s*=\s*\^([^\^]*)\^\s*)?(?:(if)\s*=\s*\^([^\^]*)\^\s*)?-->/,
            close: /<!--\s*\/replace\s*-->/
        },
        insert: {
            calll: insertCMD,
            open: /<!--\s*insert\s*(?:(if)\s*=\s*\^([^\^]*)\^\s*)?\s*/,
            close: /\s*\/insert\s*-->\s*/
        },
        'import': {
            calll: importCMD,
            single: /<!--\s*import\s*(file)\s*=\s*\^([^\^]*)\^\s*(?:(type)\s*=\s*\^([^\^]*)\^\s*)?(?:(if)\s*=\s*\^([^\^]*)\^\s*)?-->/,
        }
    }

};

patterns['json'] = patterns['js'];
patterns['xhtml'] = patterns['html'];

module.exports = {
    joinSeparator: DEFAULT_JOIN_SEPARATOR,
    patterns: patterns
};
