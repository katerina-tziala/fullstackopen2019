<h1>
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/part8_logo.png" alt="part logo" width="80" height="80" align="left" >
<br/>Part 8: GraphQL<br/>
</h1>

This part of the course is about GraphQL, Facebook's alternative to REST for communication between browser and a server.


## Contents of Part 8

* **GraphQL-Server:** Schemas and queries, Apollo server, GraphQL-playground, Parameters of a resolver, The default resolver, Object within an object, Mutations, Error handling, Enum, Updating data

* **React and GraphQL:** Apollo client, Query-component, Named queries and variables, Cache, Mutation-component, Updating the cache, Handling mutation error messages, Updating data, Apollo Client and the applications state, Render props, Apollo with hooks

* **Database and User Administration:** Mongoose and Apollo, Validation, User and log in, Friends list

* **Login and Updating the Cache:** User log in, Adding a token to a header, Updating cache

* **Fragments and Subscriptions:** Fragments, Subscriptions, Subscriptions on the server, Subscriptions on the client, n+1-problem


## Exercises of Part 8

This directory contains the series of exercises for *Part 8*. In this part the *Library-GraphQl App* was developed, which displays information about books and authors. When users are logged in, they can add books, see reccomendations based on their favorite genre, and update the birth year of the authors.

The *Library-GraphQl App* consists of two parts:

* [**library-graphql-backend**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part8/library-graphql-backend)**:** This directory contains the code of the  *Library-GraphQl API*  (backend side) of the app. 

* [**library-graphql-frontend**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part8/library-graphql-frontend)**:** This directory contains the code of the frontend side of the app.


## Running the App

To run the app locally, both parts of the app (backend and frontend) should run in parallel (different terminals). Follow the instructions in the *README* file, located in the root directory of each part, to compile and run the app locally.

**Note:** Make sure that you create a user according to the *README* file in [**library-graphql-backend**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part8/library-graphql-backend) directory and you will use the credentials to login according to the *README* file in [**library-graphql-frontend**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part8/library-graphql-frontend) directory.