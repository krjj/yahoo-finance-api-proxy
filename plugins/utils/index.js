// utils plugins will add decoraters/helpers for handling yahoo api requests

const fp = require('fastify-plugin');
const unirest = require('unirest');

const RAPID_API_HOST = process.env['x-rapidapi-host'];
const RAPID_API_KEY = process.env['x-rapidapi-key'];

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async (fastify, opts) => {
  // expose methods to set the key-value in cache
  fastify.decorate('yahoo-api-fetcher', {
    getNews(symbol) {
      return new Promise((resolve, reject) => {
        const req = unirest('GET', 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-news');
        req.query({
          category: symbol,
        });
        req.headers({
          'x-rapidapi-host': RAPID_API_HOST,
          'x-rapidapi-key': RAPID_API_KEY,
          useQueryString: true,
        });

        req.end((res) => {
          if (res.error) reject(res.error);
          resolve(res.body);
        });
      });
    },
    getAnalysis(symbol) {
      return new Promise((resolve, reject) => {

        const req = unirest('GET', 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis');

        req.query({
          symbol,
        });

        req.headers({
          'x-rapidapi-host': RAPID_API_HOST,
          'x-rapidapi-key': RAPID_API_KEY,
          useQueryString: true,
        });

        req.end((res) => {
          if (res.error) reject(res.error);
          resolve(res.body);
        });
        
      });
    },
  });
});
