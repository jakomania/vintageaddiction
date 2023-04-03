var querystring = require("querystring");
var fs = require("fs");
const Room = require('../model/room')
const Player = require('../model/player');

var userRegisters = new Array();
//Home route
function init(response) {


  fs.readFile("public/views/landing.html", function (err, data) {
    if (err) {
      throw err;
    }
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  })
}

function validatedRegister(response, postData) {

  var myJSON = JSON.parse(postData);
  if (postData) {
    if(myJSON.name === '' || myJSON.username === '' || myJSON.password === ''){
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end();
    }

    if(myJSON.name !== '' && myJSON.username !== '' && myJSON.password !== ''){
      var newUser = new Player(myJSON.name, myJSON.username, myJSON.password);
      var userRepited = userRegisters.find(user => user.username === newUser.username);
      if(userRepited === undefined){
        userRegisters.push(newUser);
        //clean post data avoid duplicate records
        postData = "";
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end();
      }else{
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end();
      }

    }


  }
}

//Login route
function login(response, postData) {
  var myJson = JSON.parse(postData);
  var username = myJson.username;
  var password = myJson.password;
  var item = userRegisters.find(item => item.username === username);

  if (item !== undefined) {
    if (item.username === username && item.password === password) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end();
    }


    if (item.username === username && item.password !== password) {
      //PASSWORD INCORRECT
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end();
    }
  }

  if (item === undefined) {
    //USER DOESN'T EXISTS
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end();
  }
}
     
  //Register route
function register(response) {
  fs.readFile("public/views/register.html", function (err, data) {
    if (err) {
      throw err;
    }
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  })

}

function logOut(response, postData, idpath){

  var userNameLogOut = idpath.replace('user=', '');

  rooms.forEach(room => {
    for (const key in room) {
      if(key === 'player1'){
        var value = room[key];
        if(value === userNameLogOut){
          room[key] = '';
          console.log(rooms);
        }
      }
      if(key === 'player2'){
        var value = room[key];
        if(value === userNameLogOut){
          room[key] = '';
          console.log(rooms);
        }
      }
    }

  });

  fs.readFile("public/views/home.html", function (err, data) {
    if (err) {
      throw err;
    }
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  })
}

exports.init = init;
exports.login = login;
exports.register = register;
exports.validatedRegister = validatedRegister;
exports.logOut = logOut;