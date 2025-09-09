const serverless = require("serverless-http");
const app = require("../src/server"); // vägen till server.js
module.exports = serverless(app);
