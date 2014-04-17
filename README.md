## PIMP
###Pretty and Intuitive Multi-level-logging Prototype

Yet another logging thing. It's logging the way I want/like to use logging. Use it, or not - whatever.

```
var logger = require( '../index' ).getInstance();

// normal logging mode
console.log( '\n' );
logger.info( 'Here\'s some info ' );
logger.debug( 'Debugging this thang ' );
logger.warn( 'Betta have my money!' );
logger.error( 'Ooops!' );

console.log( '\n******************************************************\n');
// selectively enable verbose to some levels
logger.verbose( 'error', 'debug' );
logger.info( 'Here\'s some info' );
logger.debug( 'Debugging this thang (verbose)' );
logger.warn( 'Betta have my money!' );
logger.error( 'Ooops! (verbose)' );

console.log( '\n******************************************************\n');
// verbose all the things
// did I mention you could chain the calls?
logger
  .verbose()
  .info( 'Here\'s some info ' )
  .debug( 'Debugging this thang ' )
  .warn( 'Betta have my money!' )
  .error( 'Ooops!' );

console.log( '\n' );
```
The above code is taken from test/test.js - run it to see PIMP in action. More features (and real tests) coming soon