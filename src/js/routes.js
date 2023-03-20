
const fs = require( 'fs' );
const { parse } = require('querystring');
const { Register } = require('./Register.js')
const { Login } = require('./Login.js');
const { usersDb } = require('./storage.js');

module.exports = {
  

  //Test cookie
  //cookie: JSON.stringify({user: 'jacob', pass: 'cisco', favRomm: '4'}),  

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
      req.on(
        'end', () => 
        {          
            let data = parse( body );          
            var login = new Login( data );
            var cookie = JSON.stringify( login.loginUser() );
            console.log(cookie);                                    
            if ( cookie )
            {
              fs.readFile( 
                'templates/dashboard.html', ( err, data ) => 
              {
                if ( err ) 
                {
                  const msgError = "Error al cargar el dashboard"
                  console.log( msgError );
                  res.end( msgError );        
                  return;
                } 
                else 
                { 
                  res.writeHead(
                    200, {
                    "Set-Cookie": `${cookie}`,
                    "Content-Type": `text/html`
                    });     
                  //res.write( data );
                  res.end( data );
                };          
              })
                       
            }
           
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
          register.registerUser();
          console.log(
            'User ' 
            +  usersDb[ usersDb.length -1 ].username 
            + ' has been registered'            
            );
          res.end( 'ok' );
      });    
    } 
  },  

  parseTemplate: function ( template )
  {    
    fs.readFile( 
      template, ( err, data ) => 
      {
        if ( err ) {
          const msgError = "Error al parsear html"
          console.log( msgError );                  
        }            
        console.log(data);
      } )
  },


  sumarDigitos: function (a, b)
  {
    return a + b;
  }


  

}



