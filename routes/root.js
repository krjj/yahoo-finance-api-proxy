module.exports = async function (fastify) {
  // Route handler for '/'
  fastify.get('/', async () => ({
    root: true, info: 'Yahoo Finance API Proxy', cacheKeys: fastify['request-cacher'].all(), time: new Date().toLocaleTimeString(),
  }));
};
