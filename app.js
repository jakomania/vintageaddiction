const { parse } = require('querystring');
var routes = require('./src/js/routes.js');
const { Register } = require('./src/js/Register.js')

const http = require('http');
const port = 3000;    

    
//create a server object:
http.createServer( (req, res) => {


    var userDb = [];

    // res.writeHead(200, {'Content-Type': 'text/html'}); // http header

    const cookie = JSON.stringify({user: 'jacob', pass: 'cisco', favRomm: '4'});

    res.writeHead(200, {
        "Set-Cookie": `${cookie}`,
        "Content-Type": `text/html`
    });


    var url = req.url;

    if(url ==='/about'){                
        res.write('<h1>about us page<h1>');                 
        res.end(); 
    }else if(url ==='/login'){
        routes.renderLogin(req, res);    
    }else if (req.method === 'POST' && url ==='/register') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            console.log(parse(body));
            var register = new Register(parse(body));
            userDb.push(register);
            console.log('Hello ' + userDb[userDb.length - 1].getUsername());
            res.end('ok');

        });
    }else if(url ==='/register'){
            routes.renderRegister(req, res);
    }else{          
        console.log(res);
        routes.renderHome(req, res);        
    }
    }).listen(port, () => {
        console.log(`Server running at port ${port}`); //the server object listens on port 8000
});




