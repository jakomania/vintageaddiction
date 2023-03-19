
//const { Register } = require('./routes.js')
//const { users } = require('./routes.js');
var routes = require('./routes.js');

class Login {

  fields = {};
  errors = {};
  //users = [];  

  constructor(formFields) {
    this.username = formFields.username;    
    this.password = formFields.pass;    
    }  

    getUsername() 
    { 
      //return routes.users[0].username; 
    }  
    
    loginUser() 
    {
      console.log( 'Hello my ' +  this.username );
      console.log( 'User stored is: ' + users[0].username );
      // if ( this.password === users[0].password )
      // {
      //   console.log('Estas autenticado');
      // }
      // else 
      // {
      //   console.log('Fallo autenticación!');
      // }
    }


    

  }


module.exports = { Login }
  



