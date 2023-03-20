const fs = require( 'fs' );

pT = parseTemplate( template )
  {    
    fs.readFile( 
      template, ( err, data ) => 
      {
        if ( err ) {
          const msgError = "Error al parsear html"
          console.log( msgError );                  
        }            
        return data;
      } )
  }

  module.exports = { pT };

