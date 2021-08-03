var contentType = require("./fileTypes");
var fs = require("fs");
var httpStatus = require("http-status-codes");

module.exports = {
    read: (path, res) => {
        fs.readFile(`./${path}`, (e, data) => {
            if(e){
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentType.html);
                console.log(`there was an issue reading the file: ${path}`);
            }else{
                res.end(data);
            }
        });
    }
}