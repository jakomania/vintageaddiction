var server = require("./server");
var router = require("./router");
var requestHandlers = require("./src/controler/requesthandler");

var handle = {};
handle["/"] = requestHandlers.init;
handle["/home"] =requestHandlers.init;
handle["/register"]=requestHandlers.register;
handle["/login"]=requestHandlers.login;
handle["/game-app"]=requestHandlers.gameApp;
handle["/validated-register"]=requestHandlers.validatedRegister;
handle["/assets/avatars"]= requestHandlers.serveImg;
handle["/ocupation"]= requestHandlers.ocupation;
handle["/disconnect"]= requestHandlers.disconnect;
handle["/ocupationcheck"]= requestHandlers.ocupationcheck;
handle["/logOut"] = requestHandlers.logOut;

server.init(router.route, handle);