const path = require("path");
const AutoLoad = require("fastify-autoload");

// Load .env file
require("dotenv").config();

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Enable cors support
  fastify.register(require("fastify-cors"));

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: { ...opts },
  });
};
