# yahoo-finance-api-proxy
Yahoo Finance API proxy server

## 🏁 Run

clone 
```
git clone https://github.com/krjj/yahoo-finance-api-proxy
```

start server
```
yarn run start
```

Server will start listening on port `3000` and address `0.0.0.0`.


## 🔗 Endpoints

### 1. `/` 

Root endpoint

Sample response

```json
{
  "root": true,
  "info": "Yahoo Finance API Proxy",
  "cacheKeys": [
    "/yahoo-finance/stock/get-analysis?symbol=AAPL",
    "/yahoo-finance/stock/get-analysis?symbol=MSFT",
    "/yahoo-finance/stock/get-news?symbol=AAPL",
    "/yahoo-finance/stock/get-news?symbol=GOOG"
  ],
  "time": "6:34:47 pm"
}
```

### 2. `/yahoo-finance/stock/get-news?symbol=AAPL`

Requires symbol query parameter.


### 3. `/yahoo-finance/stock/get-analysis?symbol=AAPL`

Requires symbol query paramter.


#### Curl command for convenience

```
curl --request GET \
  --url http://localhost:3000/
  
curl --request GET \
  --url 'http://localhost:3000/yahoo-finance/stock/get-analysis?symbol=MSFT'
  
curl --request GET \
  --url 'http://0.0.0.0:3000/yahoo-finance/stock/get-news?symbol=GOOG'
```


## ⚡ Caching

For the purpose of this project  `node-cache` library is used for caching. It is recommended that standalone In-memory db/store (redis,memcached) be used in production mode.


## 🚤 Performance 

If the data already exists in the cache the time required to serve request will be in sub 100ms (excluding network latency). In all the other cases it depends on source api server/network speed/throttling/rate-limits imposed by rapidapi. 

By default caching ttl is 120 secs.

## 🤖 Environment variables

All the environment variables are store in .env file.

| Variable  | Description | Default value
| ------------- | ------------- | ------------- | 
| cache-expiry-ttl-secs  | Time to keep resource in cache  | 120
| x-rapidapi-key  | rapidapi key  | refer .env
| x-rapidapi-host  | rapidapi host  | apidojo-yahoo-finance-v1.p.rapidapi.com

## 🛠 Made using
- NodeJS
- Fastify
- Node-cache
