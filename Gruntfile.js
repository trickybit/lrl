module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt, {
    pattern: ['assemble', 'grunt-*'],
    scope: ['devDependencies']
  });

  grunt.initConfig({
    conf: grunt.file.readYAML('conf.yml'),
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      all: ['dist', 'tmp']
    },
    assemble: {
      options: {
        helpers: 'src/templates/helpers/helper-*.js',
        layoutdir: 'src/templates/layouts',
        partials: [
          'src/templates/layouts/*.hbs',
          'src/templates/partials/*.hbs'],
        flatten: true
      },
      less: {
        options: {
          data: ['src/data/less/*.{yml,json}'],
          layout: 'less.hbs',
          ext: ".less"
        },
        src: ['src/templates/less/*.hbs'],
        dest: 'tmp/assemble/less/'
      }
    },
    release: {
      options: {
        additionalFiles: ['bower.json']
      }
    },
    watch: {
      data: {
        files: 'src/**/*.{yml,json}',
        tasks: ['assemble']
      },
      template: {
        files: 'src/templates/**/*.{js,hbs}',
        tasks: ['assemble']
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('test', ['jshint', 'less:specimen']);
  grunt.registerTask('build', ['clean', 'test']);
  //grunt.registerTask('site', ['clean', 'test', 'less']);
  //grunt.registerTask('deploy', ['site', 'gh-pages']);
  //grunt.registerTask('live', ['site', 'connect', 'watch']);
};
