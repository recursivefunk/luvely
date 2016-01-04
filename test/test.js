
'use strict';

const test = require('tape');
const luvely = require('../index');
const bunyan = require('bunyan');

test('info works', (t) => {
  const appName = 'myApp';
  const luvelyStream = luvely();

  const log = bunyan.createLogger({
    name: appName,
    stream: luvelyStream,
    level: 'trace'
  });

  luvelyStream.on('data', (d) => {
    t.equal((d.indexOf('[INFO]') > -1), true);
    t.end();
  });

  log.info('hi');
});

test('debug works', (t) => {
  const appName = 'myApp';
  const luvelyStream = luvely();

  const log = bunyan.createLogger({
    name: appName,
    stream: luvelyStream,
    level: 'trace'
  });

  luvelyStream.on('data', (d) => {
    t.equal((d.indexOf('[DEBUG]') > -1), true);
    t.end();
  });

  log.debug('hi');
});

test('error works', (t) => {
  const appName = 'myApp';
  const luvelyStream = luvely();

  const log = bunyan.createLogger({
    name: appName,
    stream: luvelyStream,
    level: 'trace'
  });

  luvelyStream.on('data', (d) => {
    t.equal((d.indexOf('[ERROR]') > -1), true);
    t.end();
  });

  log.error('hi');
});

test('trace works', (t) => {
  const appName = 'myApp';
  const luvelyStream = luvely();

  const log = bunyan.createLogger({
    name: appName,
    stream: luvelyStream,
    level: 'trace'
  });

  luvelyStream.on('data', (d) => {
    t.equal((d.indexOf('[TRACE]') > -1), true);
    t.end();
  });

  log.trace('hi');
});

test('error works with src', (t) => {
  const appName = 'myApp';
  const luvelyStream = luvely();

  const log = bunyan.createLogger({
    name: appName,
    stream: luvelyStream,
    src: true,
    level: 'trace'
  });

  luvelyStream.on('data', (d) => {
    t.equal((d.indexOf('@ line') > -1), true);
    t.end();
  });

  console.log('\n')
  log.error('oh no an error');
  console.log('\n')
});
