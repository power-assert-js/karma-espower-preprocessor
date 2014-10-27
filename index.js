var fs = require('fs');
var path = require('path');
var espowerSource = require("espower-source");
var convert = require('convert-source-map');

var createPreprocessor = function (args, config, logger, helper) {
    config = config || {};
    var log = logger.create('preprocessor.espower');

    var defaultOptions = {}; // see https://github.com/twada/espower-source#api
    var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

    var transformPath = args.transformPath || config.transformPath || function (filepath) {
            return filepath.replace(/\.js$/, '.espowered.js');
        };

    return function (content, file, done) {
        log.debug('Processing "%s".', file.originalPath);
        file.path = transformPath(file.originalPath);

        var opts = helper._.clone(options);
        if (file.sourceMap) {
            log.debug("detected upstream sourceMap info");
            opts = helper.merge(opts, {sourceMap: file.sourceMap});
        }
        var modified = espowerSource(content, file.path, opts);
        var commented = convert.fromSource(modified);
        if (commented) {
            file.sourceMap = commented.toObject();
        } else {
            file.sourceMap = null;
        }
        done(null, modified);
    };
};

createPreprocessor.$inject = ['args', 'config.espowerPreprocessor', 'logger', 'helper'];

module.exports = {
    'preprocessor:espower': ['factory', createPreprocessor]
};
