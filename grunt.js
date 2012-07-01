
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        'Author: <%= pkg.author %> ' +
        'License: Apache 2.0 ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    clean: {
      folder: "dist/*"
    },

    lint: {
      files: [
        "lib/*.js"
      ]
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        browser: true,
        scripturl: true
      },
      globals: {
        jQuery: true
      }
    },
    jasmine: {
      index: ['specs/index.html']
    },
    concat: {
      "dist/ServiceLocator.js": [
        "lib/Service.js",
        "lib/ServiceLocator.js"
      ]
    },

    min: {
      "dist/ServiceLocator.min.js": [
        "<banner>",
        "dist/ServiceLocator.js"
      ]
    },
    qunit: {
      all: ["test/qunit/*.html"]
    }

  });

  grunt.loadNpmTasks('grunt-clean');
  grunt.loadNpmTasks('grunt-jasmine-task');

  grunt.registerTask("default", "clean concat min");
};