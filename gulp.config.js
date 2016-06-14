module.exports = function () {
  var src = './';
  var app = src + 'app/';

  var config = {
    src: src,
    index: src + 'index.html',
    css: src + 'css/**/*.css',

    js: [
      app + '**/*.module.js',
      app + '**/*.js',
      '!' + '**/*.spec.js'
    ],

    scss: 'scss/**/*.scss',

    /**
     * Bower options
     */
    bower: {
      overrides: {
        // Exemple :
        // 'highcharts': {
        //   'main': ['lib/adapters/standalone-framework.js', 'lib/highstock.js']
        // }
      }
    }
  };

  config.getBowerFilesDefaultOptions = function () {
    var options = {
      overrides: config.bower.overrides
    };

    return options;
  };

  return config;
};
