<h1>
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/node_express.png" alt="node express logo" width="auto" height="60">
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/mongoDB_logo.png" alt="mongoDB logo" width="50" height="50">
PhoneBook API<br/>
</h1>

The *PhoneBook API* contains the code for the developed API (backend side) of the *PhoneBook App*.


## Installation of the App

1. Fork and clone this repository.

2. Navigate from your terminal inside the /part3/phonebook_backend directory and run ***npm install*** or ***npm i*** to install the dependencies of the app.


## Running the App Locally

1. Make sure that all the dependencies of the *PhoneBook API* are installed.

2. Create your own account on [**MongoDb**](https://www.mongodb.com/cloud), add a user, and get your credentials for the database access.

3. In the **.env** file at the root of the project set the *'MONGODB_URI'* variable with the connection string provided by [**MongoDb**](https://www.mongodb.com/cloud):
    
    MONGODB_URI=...

    **Note:** Make sure that the name of the database is **phonebook**!

4. Navigate from your terminal inside the /part3/phonebook_backend directory and run ***npm run start*** to start the server of the API.


## Linting the App

1. Make sure that all the dependencies of the *PhoneBook API* are installed.

2. Navigate from your terminal inside the /part3/phonebook_backend directory and run ***npm run lint***.
