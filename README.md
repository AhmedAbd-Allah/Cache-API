# Cache-API

The target of this repo is to build a REST API that exposes methods to interact with a cache layer.

## Application overview

the app represents a caching layer for products DB saved in MongoDB, you will need to have mongoDB installed and runnning on your machine to test the app.

Application retrieves All products from database when it starts and then eventually, cache the data into a caching layer from which data is returned as response to all requests.


## Tech Stack
* NodeJs
* express
* MongoDB
* Mocha & Chai for testing

## How to Run
1- clone the project  
2- cd to project directory  
3- run `npm install`  
4- run `npm start` 


## Try the APP
1- to get all products IDs (all stored keys in the cache),
send a request to `/products` using HTTP method `GET`

2- to get a product details (the cached data for a given key)
send a request to `/products/:productId` using HTTP method `GET` where productId is the key for cached data

3- to create/update a product (creates/updates the data for a given key)
send a request to `/product/:productId` using HTTP method `POST` where productId is the key for cached data

4- to remove a product from caching layer (removes a given key from the cache)
send a request to `/product/cache/:productId` using HTTP method `DELETE` where productId is the key for cached data

5- to delete all products from caching layer (remove all keys from the cache)
send a request to `/products/cache/clear` using HTTP method `DELETE` where productId is the key for cached data


## Change Cache Properties
1- The number of entries allowed in the cache is limited and you can change it by changing the value of the environment variable named as `MAX_ENTRIES` in the `.env` file

2- Time To Live (TTL) for cached data is also limited and you can change it by changing the value of the `TTL` environment variable in the `.env` file (Value of TTL is set in seconds)

3- MongoDB connection URI is set as environment variable and you can change it by changing the value of `MONGO_URI` in the `.env` file

## How to Test
* run `npm test`

## If I have more time..

1- I would create docker file for this app

2- I would deploy the app 

## Contact Details
* Linkedin: https://www.linkedin.com/in/abdallah7/
* Stackoverflow: https://stackoverflow.com/users/9930813/ahmed-abdallah
