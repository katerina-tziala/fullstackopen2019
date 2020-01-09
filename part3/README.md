# Part 3: Programming a Server with NodeJS and Express

In this part the focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. It covers the implementation of a simple REST API in Node.js by using the Express library, and the application's data are stored in a MongoDB database. Last but not least, a fully developed app is being deployed to the internet, on the [**Heroku Platform**](https://www.heroku.com/platform).

## Contents of Part3

* **Node.js and Express:** Simple web server, Express, Web and express, nodemon, REST, Fetching a single resource, Deleting resources, Postman, The Visual Studio Code REST client, Receiving data,About HTTP request types, Middleware

* **Deploying App to Internet:** Same origin policy and CORS, Application to the Internet, Frontend production build, Serving static files from the backend, Streamlining deploying of the frontend, Backend URLs, Proxy

* **Saving data to MongoDB:** Debugging Node applications, MongoDB, Schema, Creating and saving objects, Fetching objects from the database, Backend connected to a database, Database configuration into its own module, Other operations, Verifying frontend and backend integration, Error handling, Moving error handling into middleware, The order of middleware loading, Other operations

* **Validation and ESLint:** Promise chaining, Deploying the database backend to production, Lint


## Exercises of Part 3

This directory contains the series of exercises for *Part 3*. In this part the the *PhoneBook App* is developed. The *PhoneBook App* is a simple React App, a digital phonebook, where users can add and display phonenumbers of desired persons.

The *PhoneBook App* consists of two parts:

* [**phonebook_backend**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part3/phonebook_backend)**:** This directory contains the code of the *PhoneBook API* (backend side) of the app. 

* [**phonebook_frontend**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part3/phonebook_frontend)**:** This directory contains the code of the frontend side of the app.


## Running the App

To run the app locally, both parts of the app (backend and frontend) should run in parallel (different terminals). Follow the instructions in the *README* file, located in the root directory of each part, to compile and run the app locally.


## Deploying the App

The code of the developed App that was deployed on [**Heroku**](https://phonebook-app-kt.herokuapp.com/) can be found in [**phonebook_app repository**](https://github.com/katerina-tziala/phonebook_app), whilst the app can be accessed here: [**PhoneBook App**](https://phonebook-app-kt.herokuapp.com/).
