var routes = require("./src/js/routes.js");
const http = require("http");
const path = require("path");
const fs = require("fs");
const port = 3000;

//create a server object:
// Helper function to get the content type based on the file extension
function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".json":
            return "application/json";
        case ".png":
            return "image/png";
        case ".jpg":
            return "image/jpeg";
        default:
            return "application/octet-stream";
    }
}
const server = http.createServer((req, res) => {
    var url = req.url;

    if (url.match(".css$")) {
        const filePath = path.join(__dirname, "style", req.url);

        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // File doesn't exist, send a 404 response
                res.statusCode = 404;
                res.end("File not found");
            } else {
                // File exists, serve it as a static file
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        // Error reading file, send a 500 response
                        res.statusCode = 500;
                        res.end("Error reading file");
                    } else {
                        // File read successfully, set the content type and send the file data
                        res.setHeader("Content-Type", getContentType(filePath));
                        res.end(data);
                    }
                });
            }
        });
    } else {
        if (url.match(".png$")) {
            routes.renderPng(res, req, url);
        } else if (url.match(".gif$")) {
            routes.renderGif(res);
        } else if (url === "/about") {
            res.writeHead(200, {
                "Content-Type": `text/html`,
            });
            res.write("<h1>about us page<h1>");
            res.end();
        } else if (url === "/login") {
            res.writeHead(200, {
                "Content-Type": `text/html`,
            });
            routes.renderLogin(req, res);
        } else if (url === "/register") {
            res.writeHead(200, {
                "Content-Type": `text/html`,
            });
            routes.renderRegister(req, res);
        } else if (url === "/dashboard" && req.method === "POST") {
            res.writeHead(200, {
                "Content-Type": `text/html`,
            });
            routes.renderDashboard(req, res);
        } else if (url === "/room" && req.method === "POST") {
            res.writeHead(200, {
                "Content-Type": `text/html`,
            });
            routes.renderRoom(req, res);
        } else {
            res.writeHead(200, {
                "Content-Type": `text/html`,
            });
            routes.renderHome(req, res);
        }
    }

    // Parse the URL to determine the file path
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

