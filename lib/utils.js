
'use strict';

const presentation = require('./presentation');
const utils = require('./utils');
const chalk = require('chalk');

exports.pad = (str, minLen) => {
  if (str.length >= minLen) {
    return str;
  }
  const diff = minLen - str.length;
  const char = ' ';
  return `${char.repeat(diff)}${str}`;
};

exports.format = (formatted) => {
  const p = presentation.fromLevel(formatted.level);
  const tmpLabel = utils.pad(`[${p.label.toUpperCase()}]`, 7);
  let label;
  if (typeof p.color === 'string') {
    label = chalk[p.color].apply(chalk, [`${tmpLabel}`]);
  } else {
    label = p.color(`${tmpLabel}`);
  }
  const out = `[${formatted.time}] ${label}: ${formatted.name}/${formatted.pid} on ${formatted.hostname}: ${formatted.msg}\n`;
  return out;
};
