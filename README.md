# karma-espower-preprocessor

Preprocess source code by [espower-source](https://www.npmjs.org/package/espower-source)

# Installation

```
npm install karma-espower-preprocessor --save-dev
```

I'm recommend to use with [karma-sourcemap-loader](https://www.npmjs.org/package/karma-sourcemap-loader) if you use some altJS.

# Configuration

```
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.js': ['espower']
      // '**/*.js': ['sourcemap', 'espower']
    },

    espowerPreprocessor: {
      options: {
        // emit espowerified code.
        // default: false (in-memory)
        emitActualCode: true
      },
      transformPath: function(path) {
        // default
        return path.replace(/\.js$/, '.espowered.js');
      }
    }
  });
};
```
