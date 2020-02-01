# Library-GraphQl API

The *Library-GraphQl API* contains the code for the developed API (backend side) of the *Library-GraphQl App*.

## App Requirements

For the *Library-GraphQl API* you need an account on [**MongoDb**](https://www.mongodb.com/cloud) to connect to the database. Read the [**README_DB_CONNECTION**](https://github.com/katerina-tziala/fullstackopen2019/blob/master/README_DB_CONNECTION.md) file in the root directory of this repository in order to: 

1. Create a database user and get your own credentials (***YOUR_OWN_MONGODB_USERNAME***, ***YOUR_OWN_MONGODB_PASSWORD***) for the database access.


## Installation of the App

1. Fork and clone this repository.

2. To install the dependencies of the app, navigate from your terminal inside the ***fullstackopen2019/part8/library-graphql-backend*** directory and run:

    ```
    npm install
    ```

    or

    ```
    npm i
    ```

## Running the App Locally

1. Make sure that all the dependencies of the *Library-GraphQl API* are installed.

2. In the ***index.js*** file set **YOUR_OWN_MONGODB_USERNAME** as the value of the ***MONGO_DB_USER*** variable, and **YOUR_OWN_MONGODB_PASSWORD** as the value of the ***MONGO_DB_ACCESS_KEY***:

    ```javascript
    14. const MONGO_DB_USER = 'YOUR_OWN_MONGODB_USERNAME';
    15. const MONGO_DB_ACCESS_KEY = 'YOUR_OWN_MONGODB_PASSWORD';
    ```

3. To start the server of the API, navigate from your terminal inside the ***fullstackopen2019//part8/library-graphql-backend*** directory and run:

    ```
    npm run start
    ```

4. Access the your [**GraphQL Playground**](http://localhost:4000/) and run the following mutation to create a user with username ***theuser*** and favorite genre ***nosql***:

        mutation {
            createUser(username: "theuser", favoriteGenre: "nosql") {
                username 
                favoriteGenre
            }
        }

**Note:** You will need the username to login in the frontend of the app!
