const port = 3000;
var http = require("http");
var router = require("./router");
var contentType = require("./fileTypes");
var read = require("./read");
var httpStatus = require("http-status-codes");



router.get("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.html);
    read.read("views/index.html", res);
});

router.get("/index.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.css);
    read.read("/public/css/index.css", res);
});

router.get("/index.js", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.js);
    read.read("/public/js/index.js", res);
});

router.get("/photoIcon.png", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.png);
    read.read("/public/images/Photo Icon.png", res);
});

router.get("/trashcanIcon.png", (req, res) => {
    res.writeHead(httpStatus.OK, contentType.png);
    read.read("/public/images/Trashcan Icon.png", res);
});

router.get('/video.png', (req, res) => {
    res.writeHead(httpStatus.OK, contentType.png);
    read.read('/public/images/Video_Icon.png', res);
});

router.get('/stopVid.png', (req, res) => {
    res.writeHead(httpStatus.OK, contentType.png);
    read.read('/public/images/stopVid.png', res);
});



var app = http.createServer(router.handle);

app.listen(port);
console.log(`The server is now listening on port number ${port}`);