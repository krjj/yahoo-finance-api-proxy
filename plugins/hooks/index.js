// hooks plugin will add 2 custom hooks for handling caching process

const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {

  // Custom preHandler hook for checking if request url exist as key in cache
  // if resource exists then request is served directly from here
  // else handler is executed
  fastify.addHook('preHandler', async (request, reply) => {
    const cacheVal = fastify['request-cacher'].get(request.url);
    if (cacheVal !== undefined) {
      // console.log('Serving from cache', request.url);
      reply.fromCache = true;
      reply.send(cacheVal);
      return reply;
    }
  });


  // Custom onSend hook for storing the response data in cache
  // stores data only when response is not fetched from cache and 
  // status code is 200
  // root path '/' is not cached
  fastify.addHook('onSend', async (request, reply, payload) => {
    if (reply.statusCode === 200 && reply.fromCache !== true && request.url !== '/') {
      // console.log('Saving to cache', request.url);
      fastify['request-cacher'].set(request.url, payload);
    }
  });
});
