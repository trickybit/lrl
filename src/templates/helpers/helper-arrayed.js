module.exports.register = function (Handlebars) {
  'use strict';
  Handlebars.registerHelper('arrayed', function (n) {
    return new Array(n);
  });
};
