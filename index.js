
var clc = require( 'cli-color' );
var moment = require( 'moment' );
var callerId = require( './lib/callerId' );
var util = require( 'util' );
var appName = 'App';
var instance;
var dateFormat = 'MM-DD-YYYY:HH:mm:ss';
var levels = {
  info: {
    label: 'INFO',
    color: 'cyan'
  },
  warn: {
    label: 'WARN',
    color: 'yellow'
  },
  debug: {
    label: 'DEBUG',
    color: 'magenta'
  },
  error: {
    label: 'ERROR',
    color: 'red'
  }
};

var error = function() {
  var level = ' [ ERROR ] ';
  var callerData = callerId.getData();
  var meta = ( levels.error.verbose ) ? constructVerboseMeta( callerData, level ) : level;
  var str = clc.red.bold( '  ' + meta ) + clc.italic( util.format.apply(this, arguments) );
  console.error( str );
  return instance;
};

var info = function() {
  var level = ' [ INFO  ] ';
  var callerData = callerId.getData();
  var meta = ( levels.info.verbose ) ? constructVerboseMeta( callerData, level ) : level;
  var str = clc.cyan( '  ' + meta ) + util.format.apply(this, arguments);
  console.log( str );
  return instance;
};

var warn = function() {
  var level = ' [ WARN  ] ';
  var callerData = callerId.getData();
  var meta = ( levels.warn.verbose ) ? constructVerboseMeta( callerData, level ) : level;
  var str = clc.yellow( '  ' + meta ) + util.format.apply(this, arguments);
  console.log( str );
  return instance;
};

var debug = function( msg ) {
  var level = ' [ DEBUG ] ';
  var callerData = callerId.getData();
  var meta = ( levels.debug.verbose ) ? constructVerboseMeta( callerData, level ) : level;
  var str = clc.magenta( '  ' + meta ) + util.format.apply(this, arguments);
  console.log( str );
  return instance;
};

var verbose = function() {
  var args = Array.prototype.slice.call( arguments, 0 );
  var i;
  if ( arguments.length === 0 ) { // no arguments set all levels to verbose
    for ( i in levels ) {
      levels[ i ].verbose = true;
    }
  } else {
    for ( i = 0; i < arguments.length; i++ ) {
      levels[ arguments[ i ] ].verbose = true;
    }
  }
  return instance;
};

exports.getInstance = function( label ) {

  'use strict';

  appName = label || appName;

  if ( !instance ) {
    instance = {};
    instance.error = error;
    instance.info = info;
    instance.warn = warn;
    instance.debug = debug;
    instance.verbose = verbose;
  }
  return instance;
};

function constructVerboseMeta( caller, level ) {
  var str = '';
  str += moment().format( dateFormat );
  str += ':';
  str += getFilename( caller.filePath );
  str += ':';
  str += caller.lineNumber;
  str += ':';
  str += level;
  return str;
}

function getFilename( filePath ) {
  var pathParts = filePath.split('/');
  var filename = pathParts[ pathParts.length - 1 ];
  return filename;
}