const http = require('http');
const app = require('./app');

 const port = process.env.PORT || 3001;
//const PORT = process.env.PORT || 8080

const server = http.createServer(app);

//server.listen(port);

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
    // <h1>Server is running on</h1>
  });
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// })