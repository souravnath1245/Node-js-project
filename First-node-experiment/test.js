let http = require("http");

let ourApp = http.createServer(function (req, res) {
  if (req.url == "/") {
    res.end("Hello, and welcome to our website.");
  } else if (req.url == "/about") {
    res.end("This page tell you about us..");
  } else {
    res.end("We cannot find the page you are looking for..");
  }
});
ourApp.listen(3000);
