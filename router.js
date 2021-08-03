var httpStatus = require("http-status-codes");
var contentType = require("./fileTypes");
var read = require('./read.js');


var routes = {
    "GET": {

    }, 
    "POST": {

    }
}

exports.handle = (req, res) => {
    try {
        if(routes[req.method][req.url]){
            routes[req.method][req.url](req, res);
        }else{
            res.writeHead(httpStatus.NOT_FOUND, contentType.html);
            res.end("<h1>Sorry, we couldn't find the page you were looking for</h1>");
        }
    }
    catch(e) {
        console.log(`Error: ${e}`);
    }
}

exports.get = (url, callback) => {
    routes["GET"][url] = callback;
}

exports.post = (url, callback) => {
    routes["POST"][url] = callback;
}