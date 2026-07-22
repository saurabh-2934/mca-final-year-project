const http = require("http");
const app = require("./app");
require("dotenv").config();

const connectDb = require("./config/db");

connectDb();

const port = process.env.PORT;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server is listning on http://localhost:${port}`);
});
