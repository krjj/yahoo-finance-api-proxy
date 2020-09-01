module.exports = async function (fastify) {

  // Route hander for /yahoo-finance/stock/get-news'
  fastify.get('/get-news', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          symbol: { type: 'string' },
        },
        required: ['symbol'],
      },
    },
  }, async (request, reply) => {
    try {
      const data = await fastify['yahoo-api-fetcher'].getNews(request.query.symbol);
      reply.send(data);
    } catch (e) {
      reply.send(new Error(e));
    }
  });

  // Route handler for '/yahoo-finance/stock/get-analysis'
  fastify.get('/get-analysis', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          symbol: { type: 'string' },
        },
        required: ['symbol'],
      },
    },
  }, async (request, reply) => {
    try {
      const data = await fastify['yahoo-api-fetcher'].getAnalysis(request.query.symbol);
      reply.send(data);
    } catch (e) {
      reply.send(new Error(e));
    }
  });
};
