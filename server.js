const http = require("http");

const server = http.createServer((request, response) => {
  console.log(request.url);
  response.end("Yoo was geht");
});

server.listen(8080);