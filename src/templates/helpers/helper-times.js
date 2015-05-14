module.exports.register = function (Handlebars) {
  'use strict';
  Handlebars.registerHelper('times', function (n, options) {
    var accum = '',
      data,
      i = -1;

    while (++i < n) {

      if (options.data) {
        data = Handlebars.createFrame(options.data);
        data.index = i;
        data.count = i+1;
      }
      accum += options.fn(i, { data: data });
    }

    return accum;
  });
};
