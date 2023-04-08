var querystring = require("querystring");
var fs = require("fs");
const Room = require('../model/room')
const Player = require('../model/player');

var userRegisters = new Array();
var rooms = new Array();
let room1 = new Room("room1", "Room 1", "", "");
let room2 = new Room("room2", "Room 2", "", "");
let room3 = new Room("room3", "Room 3", "", "");
rooms.push(room1);
rooms.push(room2);
rooms.push(room3);
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

  fs.readFile("public/views/landing.html", function (err, data) {
    if (err) {
      throw err;
    }
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  })
}

function gameApp(response) {
  fs.readFile("public/views/dashboard.html", function (err, data) {
    if (err) {
      throw err;
    }

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  })
}

function disconnect(response, postData, idpath) {
  var chosen_room = rooms.find(room => room.number === querystring.parse(idpath)["room"]);
  console.log(chosen_room);
  if(chosen_room !==undefined){
    if (chosen_room.player1 === querystring.parse(idpath)["user"]){
      console.log(chosen_room.player1);
      chosen_room.player1 ='';
      response.writeHead(200, { "Content-Type": "text/html" });
    }
    else if (chosen_room.player2 === querystring.parse(idpath)["user"]){
      console.log(chosen_room.player2);
      chosen_room.player2 ='';
      response.writeHead(200, { "Content-Type": "text/html" });
    }
    else {
      console.log("no encontrado");
      response.writeHead(404, { "Content-Type": "text/html" });
    }

  }else{
    response.writeHead(404, { "Content-Type": "text/html" });
  }
  response.end();

}

function ocupationcheck(response, postData, idpath) {
  var chosen_room = rooms.find(room => room.number === querystring.parse(idpath)["room"]);
  if( chosen_room != undefined){
    if (chosen_room.player1 != '' && chosen_room.player2 != '') {
      response.writeHead(403, { "Content-Type": "text/html" });
    }
    else if (chosen_room.player1 == '' && chosen_room.player2 == '') {
      response.writeHead(200, { "Content-Type": "text/html" });
    }
    else {
      response.writeHead(201, { "Content-Type": "text/html" });
    }
  }else{
    response.writeHead(404, { "Content-Type": "text/html" });
  }

  response.end();

}

function ocupation(response, postData, idpath) {

  var chosen_room = rooms.find(room => room.number === querystring.parse(idpath)["room"]);
  if( chosen_room != undefined){
    if (chosen_room.player1 != '' && chosen_room.player2 != '') {
      response.writeHead(404, { "Content-Type": "text/html" });
    }
    else {
      if(chosen_room.player1 === '') {
        chosen_room.player1 = querystring.parse(idpath)["user"]
      }
      else{
        chosen_room.player2 = querystring.parse(idpath)["user"]
      }

      response.writeHead(200, { "Content-Type": "text/html" });
    }
  }else{
    response.writeHead(404, { "Content-Type": "text/html" });
  }
  response.end();
}

function serveImg(response, postData, idpath) {

  let img = "src/assets/avatars/avatar1.png"
  if (idpath === "2") {
    img = "src/assets/avatars/avatar2.png"
  }
  if (idpath === "3") {
    img = "src/assets/avatars/avatar3.png"
  }
  if (idpath === "4") {
    img = "src/assets/avatars/avatar4.png"
  }
  if (idpath === "5") {
    img = "src/assets/avatars/avatar5.png"
  }
  if (idpath === "6") {
    img = "src/assets/avatars/avatar6.png"
  }
  if (idpath === "7") {
    img = "src/assets/avatars/avatar7.png"
  }
  if (idpath === "8") {
    img = "src/assets/avatars/avatar8.png"
  }
  fs.readFile(img, function (err, data) {
    if (err) {
      console.log(err)
      throw err;
    }

    response.writeHead(200, { "Content-Type": "image/jpeg" });
    response.write(data);
    response.end();
  })
}

exports.init = init;
exports.login = login;
exports.register = register;
exports.validatedRegister = validatedRegister;
exports.logOut = logOut;
exports.gameApp = gameApp;
exports.serveImg = serveImg;
exports.ocupation = ocupation;
exports.disconnect = disconnect;
exports.ocupationcheck = ocupationcheck;