var clc = require( 'cli-color' );
var moment = require( 'moment' );
var callerId = require( './lib/callerId' );
var util = require( 'util' );
var appName = 'App';
var instance;
var defaultTimeFormat = 'MM-DD-YYYY:HH:mm:ss';

var Logger = function() {

  this.dateFormat = 'MM-DD-YYYY:HH:mm:ss';

  this.levels = {
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

  this.opts = {
    minLength: 5
  };

};

Logger.prototype = {

  info: function() {
    var level = this.levels.info;
    var callerData = callerId.getData();
    this._logIt( level, callerData, arguments );
    return this;
  },

  error: function() {
    var level = this.levels.error;
    var callerData = callerId.getData();
    this._logIt( level, callerData, arguments );
    return this;
  },

  warn: function() {
    var level = this.levels.warn;
    var callerData = callerId.getData();
    this._logIt( level, callerData, arguments );
    return this;
  },

  debug: function() {
    var level = this.levels.debug;
    var callerData = callerId.getData();
    this._logIt( level, callerData, arguments );
    return this;
  },

  _logIt: function( levelObj, callerData, callerArgs ) {
    var level = pad( levelObj.label );
    var meta;
    if ( levelObj.verbose ) {
      meta = constructVerboseMeta( callerData, level, this.dateFormat, levelObj.color );
    } else {
      meta = constructNonVerboseMeta( level, levelObj.color );
    }

    var str = meta + util.format.apply( this, callerArgs );
    console.log( str );
    return this;
  },

  verbose: function() {
    var args = Array.prototype.slice.call( arguments, 0 );
    var i;

    for ( i in this.levels ) {
      if ( args.length === 0 ) {
        this.levels[ i ].verbose = true;
      } else {
        if ( args.indexOf( i ) > -1 ) {
          this.levels[ i ].verbose = true;
        } else {
          delete this.levels[ i ].verbose;
        }
      }
    }
    return this;
  },

  nonVerbose: function() {
    var args = Array.prototype.slice.call( arguments, 0 );
    var i;

    for ( i in this.levels ) {
      if ( args.length === 0 ) {
        delete this.levels[ i ].verbose;
      } else {
        if ( args.indexOf( i ) > -1 ) {
          delete this.levels[ i ].verbose;
        } else {
          this.levels[ i ].verbose = true;
        }
      }
    }
    return this;
  },

  configure: function( opts ) {
    this.opts = opts || {};
    return this;
  }

};

function pad( str, len ) {
  while( str.length < 5 ) {
    str += ' ';
  }
  return str;
}

function constructNonVerboseMeta( level, levelColor ) {
  var c = clc[ levelColor ];
  return c( '[ ' + level + ' ] ' );
}

function constructVerboseMeta( caller, level, dateFormat, levelColor ) {

  var c = clc[ levelColor ];
  var str = c( '[ ' );
  str += c( moment().format( dateFormat ) );
  str += ':';
  str += c( getFilename( caller.filePath ) );
  str += ':';
  str += c( caller.lineNumber );
  str += c( ' ] ' );
  str += c( '[ ' + level + ' ] ' );
  return str;
}

function getFilename( filePath ) {
  var pathParts = filePath.split('/');
  var filename = pathParts[ pathParts.length - 1 ];
  return filename;
}

module.exports = new Logger();