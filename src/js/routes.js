
const fs = require( 'fs' );
const { parse } = require('querystring');
const { Register } = require('./Register.js')
const { Login } = require('./Login.js');
const { usersDb } = require('./storage.js');

module.exports = {
  
  //Home route
  renderHome: function ( req, res )
  {    
    fs.readFile( 'templates/index.html', ( err, data ) => 
    {
      if ( err ) {
        const msgError = "Home load error"
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
            const msgError = "Login load error"
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
                  const msgError = "Dashboard load error"
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
            else 
            {
              res.end( 'Authentication fail!')
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
          const msgError = "Registry load error"
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
          let register = new Register( parse( body ) );          
          let exists = register.checkEmail();
          if ( !exists )
          {
            register.registerUser();          
            res.end( 'User registered!' );
          }
          else 
          {
            res.end( 'User email already registerd' );
          }          
      });    
    } 
  },  

}         

  

  


  





