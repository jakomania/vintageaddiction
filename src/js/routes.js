
const fs = require( 'fs' );

module.exports = {

  renderHome: function ( req, res )
  {    
    fs.readFile( 'templates/index.html', ( err, data ) => 
    {
      if ( err ) {
        const msgError = "Error al cargar la pagina"
        console.log( msgError );
        res.end( msgError )
        return;
      }            
      res.end( data )
    } )
  },

  renderLogin: function ( req, res )
  {    
    fs.readFile( 'templates/login.html', ( err, data ) => 
    {
      if ( err ) {
        const msgError = "Error al cargar el login"
        console.log( msgError );
        res.end( msgError )
        return;
      }
      res.end( data )
    } )
  },

  renderRegister: function ( req, res )
  {    
    fs.readFile( 'templates/register.html', ( err, data ) => 
    {
      if ( err ) {
        const msgError = "Error al cargar el registro"
        console.log( msgError );
        res.end( msgError )
        return;
      }
      res.end( data )
    } )
  },

  
  

}

