
'use strict';

const es = require('event-stream');
const bunyan = require('bunyan');
const chalk = require('chalk');
const presentation = require('./lib/presentation');
const utils = require('./lib/utils');

module.exports = () => {
  const format = es.map(function(data, callback) {
    const formatted = JSON.parse(data);
    const out = utils.format(formatted);
    callback(null, out);
  });

  [format, process.stdout].reduce((prev, next) => prev.pipe(next));
  return format;
};
