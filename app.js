var routes = require('./src/js/routes.js');
const http = require('http');
const port = 3000;    
    
//create a server object:
http.createServer( (req, res) => {
    

    res.writeHead(200, {
        //"Set-Cookie": `${cookie}`,
        "Content-Type": `text/html`
    });

    var url = req.url;

    if(url ==='/about')
    {                
        res.write('<h1>about us page<h1>');                 
        res.end(); 
    }

    else if(url ==='/login')
    {
        routes.renderLogin(req, res);        
    }
    else if(url ==='/register')
    {
        routes.renderRegister(req, res);
    }
    else if(url ==='/dashboard')
    {
        routes.renderDashboard(req, res);
    }
    else
    {                  
        routes.renderHome(req, res);        
    }
    }).listen(port, () => 
        {
            console.log(`Server running at port ${port}`); 
        });




