/** Funciones básicas de mapeo **/

function route(handle, pathname, response, postData, idpath){
    console.log("starting to route a request to: " + pathname);
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response, postData, idpath);
    }else{
        console.log("Dont found requet handler to: " + pathname);
        response.writeHead(200, {"Content-type": "text/html"});
        response.write("404 Not Found")
    }
}

exports.route = route;