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


## Testing the API

In order to test the endpoinds of the API make sure that the server is running locally, as stated above, before sending any request.

### Testing the API with POSTMAN:

If you test the *PhoneBook API* with [**Postman**](https://www.getpostman.com/):

* To get the info of the *PhoneBook App* send a **GET** request to
    ```
        http://localhost:3001/api/info
    ```

* To get the list of all persons in the database send a **GET** request to
    ```
        http://localhost:3001/api/persons
    ```

* To create a person in the phonebook send a **POST** request to
    ```
        http://localhost:3001/api/persons
    ```

Make sure that the *Content-Type* header of the request is set with the appropriate value of *application/json*:

Make sure that the body of the request includes the correct data for the new person: 


* To get a specified person from the database send a **GET** request to
    ```
        http://localhost:3001/api/persons/ID
    ```

Make sure that the ***ID***part of the request contains a valid id!

* To delete a specified person from the database send a **DELETE** request to
    ```
        http://localhost:3001/api/persons/ID
    ```

Make sure that the ***ID*** part of the request contains a valid id!

<br/><br/>
### Testing the API on Visual Studio Code:

If you use [**Visual Studio Code**](https://code.visualstudio.com/), add the [**VS Code REST client plugin**](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) and execute the requests in the *'requests'* directory.

**Note:** In order to execute the *delete_person* and *get_single_person* requests make sure that you change the ***ID*** part of the request with a valid id.
