module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.config.init({
    conf: grunt.file.readYAML('conf.yml'),
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      all: ['<%=conf.dist%>', '<%=conf.temp%>']
    },
    assemble: {
      options: {
        helpers: '<%=conf.src%>/templates/helpers/helper-*.js',
        layoutdir: '<%=conf.src%>/templates/layouts',
        partials: ['<%=conf.src%>/templates/partials/*.hbs'],
        flatten: true
      },
      less: {
        options: {
          data: ['<%=conf.src%>/data/less/*.{yml,json}'],
          layout: 'less.hbs',
          ext: '.less'
        },
        src: ['<%=conf.src%>/templates/less/*.hbs'],
        dest: '<%=conf.temp%>/less/lrl/'
      }
    },
    copy: {
      temp: {
        files: [
          {
            expand: true,
            cwd: '<%=conf.src%>/less',
            src: ['**/*.less'],
            dest: '<%=conf.temp%>/less/',
            filter: 'isFile'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%=conf.temp%>/less/lrl',
            src: ['*.less'],
            dest: '<%=conf.dist%>/less/lrl/',
            filter: 'isFile'
          }
        ]
      }
    },
    jshint: {
      options: grunt.file.readYAML('jshint.yml'),
      configurations: ['Gruntfile.js', 'package.json']
    },
    less: {
      test: {
        options: {
          plugins: [
            new (require('less-plugin-autoprefix'))({
              browsers: ['last 2 versions']
            }),
            new (require('less-plugin-clean-css'))({
              advanced: true,
              keepBreaks: true
            })
          ]
        },
        files: {
          '<%=conf.dist%>/css/test.css': '<%=conf.temp%>/less/test.less'
        }
      }
    },
    release: {
      options: {}
    },
    watch: {
      data: {
        files: '<%=conf.src%>/**/*.{yml,json}',
        tasks: ['assemble']
      },
      template: {
        files: '<%=conf.src%>/templates/**/*.{js,hbs}',
        tasks: ['assemble']
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['clean', 'test', 'copy:temp', 'assemble', 'less:test', 'copy:dist']);
};
