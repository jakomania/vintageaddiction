const fs = require("fs");
const { parse } = require("querystring");
const { Register } = require("./Register.js");
const { Login } = require("./Login.js");
const { usersDb } = require("./storage.js");
const { Player } = require("./Player.js");

module.exports = {
  renderPng: function (res, req, url) {
    fs.readFile(`img/${url}`, (err, data) => {
      res.setHeader("Content-Type", "image/png");
      if (err) {
        const msgError = "Image load error";
        console.log(msgError);
        res.end(msgError);
        return;
      }
      res.end(data);
    });
  },

  renderGif: function (res, req, url) {
    fs.readFile(`img/${url}`, (err, data) => {
      res.setHeader("Content-Type", "image/gif");
      if (err) {
        const msgError = "Image load error";
        console.log(msgError);
        res.end(msgError);
        return;
      }
      res.end(data);
    });
  },

  //Home route
  renderHome: function (req, res) {
    fs.readFile("templates/index.html", (err, data) => {
      if (err) {
        const msgError = "Home load error";
        console.log(msgError);
        res.end(msgError);
        return;
      }
      res.end(data);
    });
  },

  //Login route
  renderLogin: function (req, res) {
    if (req.method !== "POST") {
      fs.readFile("templates/login.html", (err, data) => {
        if (err) {
          const msgError = "Login load error";
          console.log(msgError);
          res.end(msgError);
          return;
        }
        res.end(data);
      });
    } // POST method to login
    else {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString(); // convert Buffer to string
      });
      req.on("end", () => {
        let data = parse(body);
        var login = new Login(data);
        var cookie = JSON.stringify(login.loginUser());
        console.log(cookie);
        if (cookie) {
          fs.readFile("templates/dashboard.html", (err, data) => {
            if (err) {
              const msgError = "Dashboard load error";
              console.log(msgError);
              res.end(msgError);
              return;
            } else {
              res.writeHead(200, {
                "Set-Cookie": `${cookie}`,
                "Content-Type": `text/html`,
              });
              res.end(data);
            }
          });
        } else {
          res.end("Authentication fail!");
        }
      });
    }
  },

  //Register route
  renderRegister: function (req, res) {
    if (req.method !== "POST") {
      fs.readFile("templates/register.html", (err, data) => {
        if (err) {
          const msgError = "Registry load error";
          console.log(msgError);
          res.end(msgError);
          return;
        } else {
          res.end(data);
        }
      });
    } // POST metrhod to register user data
    else {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString(); // convert Buffer to string
      });
      req.on("end", () => {
        console.log(parse(body));
        let register = new Register(parse(body));
        let exists = register.checkEmail();
        if (!exists) {
          register.registerUser();
          fs.readFile("templates/success_reg.html", (err, data) => {
            if (err) {
              const msgError = "Page load error";
              console.log(msgError);
              res.end(msgError);
              return;
            } else {
              res.end(data);
            }
          });
        } else {
          res.end("User email already registerd");
        }
      });
    }
  },

  renderRoom: function (req, res) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on("end", () => {
      let data = parse(body);
      var player = new Player(data);
      player.addPlayer2Room();

      let players = player.getRoomData();
      let room = player.getRoom();

      var obj = new Object();
      obj[room] = players;

      let cookie = JSON.stringify(obj);
      console.log(cookie);

      if (cookie) {
        fs.readFile("templates/room.html", (err, data) => {
          if (err) {
            const msgError = "Room load error";
            console.log(msgError);
            res.end(msgError);
            return;
          } else {
            res.writeHead(200, {
              "Set-Cookie": `${cookie}`,
              "Content-Type": `text/html`,
            });
            res.end(data);
          }
        });
      } else {
        res.end("No room data available!");
      }
    });
  },

  //   renderSuccessReg: function ()
  //   {
  //     {
  //       fs.readFile(
  //         'templates/success_reg.html', ( err, data ) =>
  //       {
  //         if ( err )
  //         {
  //           const msgError = "Page load error"
  //           console.log( msgError );
  //           res.end( msgError );
  //           return;
  //         }
  //         else
  //         {
  //           return data;
  //         };
  //       })
  //     }
  // }
};

