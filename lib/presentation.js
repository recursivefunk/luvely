
'use strict';

const colors = require('./colors');
const labels = require('./levels');

exports.fromLevel = (level) => {
  const color = colors[level];
  const label = labels[level];
  return {
    color,
    label
  };
};
