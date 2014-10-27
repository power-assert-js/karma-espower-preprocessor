# karma-espower-preprocessor

Preprocess source code by [espower-source](https://github.com/twada/espower-source)

# Installation

```
npm install karma-espower-preprocessor --save-dev
```

# Configuration

```
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.js': ['espower']
    },

    coffeePreprocessor: {
      // options passed to the coffee compiler
      options: {
        bare: true,
        sourceMap: false
      },
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js');
      }
    }
  });
};
```
