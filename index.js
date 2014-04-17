var clc = require( 'cli-color' );
var moment = require( 'moment' );
var callerId = require( './lib/callerId' );
var util = require( 'util' );
var appName = 'App';
var instance;

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
    var level = '[ ' + pad( levelObj.label, this.minLength ) + ' ] ';
    var meta = ( levelObj.verbose ) ? constructVerboseMeta( callerData, level, this.dateFormat ) : level;
    var str = clc[ levelObj.color ].apply( clc, [ '  ' + meta ] ) + util.format.apply( this, callerArgs );
    console.log( str );
    return this;
  },

  verbose: function() {
    var args = Array.prototype.slice.call( arguments, 0 );
    var i;

    for ( i in this.levels ) {
      // console.log(i)
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

function constructVerboseMeta( caller, level, dateFormat ) {
  var str = '[ ';
  str += moment().format( dateFormat );
  str += ':';
  str += getFilename( caller.filePath );
  str += ':';
  str += caller.lineNumber;
  str += ' ] ';
  str += level;
  return str;
}

function getFilename( filePath ) {
  var pathParts = filePath.split('/');
  var filename = pathParts[ pathParts.length - 1 ];
  return filename;
}

module.exports = new Logger();