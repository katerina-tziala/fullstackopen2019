<h1>
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/GraphQL_logo.png" alt="graphql logo" width="50" height="50">
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/apollo_logo.png" alt="apollo logo" width="50" height="50">
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/mongoDB_logo.png" alt="mongoDB logo" width="50" height="50">
Library-GraphQl App - Backend<br/>
</h1>

The *Library-GraphQl App - Backend* contains the code for the developed API (backend side) of the *Library-GraphQl App*.

## Installation of the App
**1.** Fork and clone this repository.

**2.** Navigate from your terminal inside the /part8/library-graphql-backend folder and run ***npm install*** or ***npm i*** to install the dependencies of the app.

## Running the App Locally
**1.** Make sure that all the dependencies of the *Library-GraphQl App - Backend* are installed.

**2.** Create your own account on [**MongoDb**](https://www.mongodb.com/cloud), add a user, and set the your credentials for the database access in the ***'index.js'*** file.<br/><br/>
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/part8_mongodb_access.png" alt="code snippet in index,js" width="auto" height="60">

**3.** Navigate from your terminal inside the /part8/library-graphql-backend folder and run ***npm run start*** to start the backend server of the app.

**4.** Access the your [**GraphQL Playground**](http://localhost:4000/) and run the following mutation to create a user with username *'theuser'* and favorite genre *'nosql'*:

        mutation {
            createUser(username: "theuser", favoriteGenre: "nosql") {
                username 
                favoriteGenre
            }
        }

**Note:** You will need the username to login in the frontend of the app!
