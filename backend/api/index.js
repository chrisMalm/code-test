const serverless = require("serverless-http");
const app = require("../src/server.js"); // vägen till server.js
module.exports = serverless(app);
