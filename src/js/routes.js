
const fs = require( 'fs' );
const { parse } = require('querystring');
const { Register } = require('./Register.js')
const { Login } = require('./Login.js')

module.exports = {

  users: [ 
    {
    username: 'admin  ',
    email: 'admin@protonmail.com',
    pass: 'ciscocisco',
    room: '6',
    avatar: 'flying-fox'
    }
  ],

  //Test cookie
  cookie: JSON.stringify({user: 'jacob', pass: 'cisco', favRomm: '4'}),  

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

  //Login route
  renderLogin: function ( req, res )
  {    
    if (req.method !== 'POST')    
    {
      fs.readFile( 
        'templates/login.html', ( err, data ) => 
        {
          if ( err ) 
          {
            const msgError = "Error al cargar el login"
            console.log( msgError );
            res.end( msgError )
            return;
          }
          res.end( data )
        })
    }
    else // POST method to login
    {
      let body = '';
      req.on('data', chunk => 
      {
        body += chunk.toString(); // convert Buffer to string
      }); 
      req.on('end', () => 
      {
          let data = parse( body );
          console.log( data );
          var login = new Login( data );
          login.loginUser( data );          
          res.end( 'Dashboard' );
      });    
    } 
  },

  //Register route
  renderRegister: function ( req, res )
  { 
    if (req.method !== 'POST')    
    {
      fs.readFile( 
        'templates/register.html', ( err, data ) => 
      {
        if ( err ) 
        {
          const msgError = "Error al cargar el registro"
          console.log( msgError );
          res.end( msgError );        
          return;
        } 
        else 
        { 
          console.log(this.cookie)
          res.end( data );
        };          
      })
    }          
    else // POST metrhod to register user data 
    {
      let body = '';
      req.on('data', chunk => 
      {
        body += chunk.toString(); // convert Buffer to string
      }); 
      req.on('end', () => 
      {
          console.log( parse( body ) );
          var register = new Register( parse( body ) );
          this.users.push( register );          
          console.log(
            'User ' 
            +  this.users[ this.users.length -1 ].username 
            + ' has been registered'            
              );
          res.end( 'ok' );
      });    
    } 
  }  
}


