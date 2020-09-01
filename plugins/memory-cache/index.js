// memory-cache will add decorater/helpers for caching


const fp = require('fastify-plugin');

const NodeCache = require('node-cache');
const cache = new NodeCache();
const CACHE_TTL = parseInt(process.env['cache-expiry-ttl-secs']);

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async (fastify, opts) => {
  // expose methods to set the key-value in cache
  fastify.decorate('request-cacher', {
    set: (key, value) => cache.set(key, value, CACHE_TTL),
    get: (key) => cache.get(key),
    all: () => cache.keys(),
    has: (key) => cache.has(key),
  });
});
