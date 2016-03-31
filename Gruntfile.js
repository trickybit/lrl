module.exports = function (grunt) {
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
        dest: '<%=conf.build%>/'
      }
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: '<%=conf.src%>/less/<%=pkg.name%>',
            src: ['**/*.less'],
            dest: '<%=conf.build%>',
            filter: 'isFile'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%=conf.build%>',
            src: ['**'],
            dest: '<%=conf.dist%>/dev',
            filter: 'isFile'
          }
        ]
      },
      release: {
        files: [
          {
            expand: true,
            cwd: 'dist/dev/',
            src: ['*'],
            dest: 'dist/<%=pkg.version%>/'
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
          '<%=conf.build%>/test/results.css': '<%=conf.src%>/less/test.less'
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
  grunt.registerTask('build', ['clean', 'test', 'copy:build', 'assemble', 'less:test']);
  grunt.registerTask('dist', ['build', 'copy:dist']);
  grunt.registerTask('dist:release', ['dist', 'release', 'copy:release']);
};
