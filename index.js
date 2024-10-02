const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
//const port = process.env.PORT || 10000;

const server = http.createServer(app);



server.listen(port, () => {
    console.log(`Server is running on ${port}`);
    // <h1>Server is running on</h1>
  });
  // (async function() {
  //   try {
  //     const url = await ngrok.connect({
  //       addr: port,
  //       authtoken: process.env.NGROK_AUTHTOKEN // Ensure this environment let iable is set
  //     });
  //     console.log(`ngrok tunnel established at: ${url}`);
  //   } catch (error) {
  //     console.error('Error establishing ngrok tunnel:', error);
  //   }
  // })();
   