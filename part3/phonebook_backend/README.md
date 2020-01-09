# PhoneBook API

The *PhoneBook API* contains the code for the developed API (backend side) of the *PhoneBook App*.


## Installation of the App

1. Fork and clone this repository.

2. Navigate from your terminal inside the /part3/phonebook_backend directory and run ***npm install*** or ***npm i*** to install the dependencies of the app.


## Running the App Locally

1. Make sure that all the dependencies of the *PhoneBook API* are installed.

2. Create your own account on [**MongoDb**](https://www.mongodb.com/cloud), create a cluster, add a database user, and get your credentials for the database access.

3. In the **.env** file at the root of the project set the *'MONGODB_URI'* variable with the connection string provided by [**MongoDb**](https://www.mongodb.com/cloud):
    
    MONGODB_URI=...

    **Note:** Make sure that the name of the database is **phonebook**!

4. Navigate from your terminal inside the /part3/phonebook_backend directory and run ***npm run start*** to start the server of the API.


## Linting the App

1. Make sure that all the dependencies of the *PhoneBook API* are installed.

2. Navigate from your terminal inside the /part3/phonebook_backend directory and run ***npm run lint***.


## Command-line Database

1. Make sure that all the dependencies of the *PhoneBook API* are installed.

2. Create your own account on [**MongoDb**](https://www.mongodb.com/cloud), create a cluster, add a database user, and get your credentials for the database access (if you haven't done it yet).

3. In the **mongo.js** file at the root of the project set the *'DB_USERNAME'* variable with the username of the created database user, and the *'DB_URI'* variable with the part of the connection string provided by [**MongoDb**](https://www.mongodb.com/cloud) that starts with *@cluster*...:

    **Note:** Make sure that the name of the database is **phonebook**!


The application works as follows. Navigate from your terminal inside the /part3/phonebook_backend directory and execute the command:

* **node mongo.js *yourpassword*:** to display all of the entries in the phonebook database

* **node mongo.js *yourpassword* *name* *number*:** to create an entry in the phonebook database

For example the command

    ```
        node mongo.js *yourpassword* Anna 040-1234556
    ```
<br/>
will print:

    ```
        added Anna number 040-1234556 to phonebook
    ```
<br/>
And the new entry to the phonebook will be saved to the database. Notice that if the name contains whitespace characters, it must be enclosed in quotes:

    ```
        node mongo.js *yourpassword* "Arto Vihavainen" 040-1234556
    ```


## Testing the API

In order to test the endpoinds of the API make sure that the server is running locally, as stated above, before sending any request.

### Testing the API with POSTMAN:

If you test the *PhoneBook API* with [**Postman**](https://www.getpostman.com/):

* To get the info of the *PhoneBook App* send a **GET** request to
    ```
        http://localhost:3001/api/info
    ```
    as illustrated in the following figure:
    <br/>
    <img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/part3_api_info.png" alt="get info reuest on postman" width="100%" height="auto">
    <br/>
    <br/>
* To get the list of all persons in the database send a **GET** request to
    ```
        http://localhost:3001/api/persons
    ```
    as illustrated in the following figure:
    <br/>
    <img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/part3_api_persons.png" alt="get persons reuest on postman" width="100%" height="auto">
    <br/>
    <br/>
* To create a person in the phonebook send a **POST** request to
    ```
        http://localhost:3001/api/persons
    ```
    as illustrated in the following figure (make sure that the ***Content-Type*** header of the request is set with the appropriate value of ***application/json***):
    <br/>
    <img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/part3_api_create_person.png" alt="post reuest to create person on postman" width="100%" height="auto">
    <br/>
    Make sure that the body of the request includes the correct data for the new person as illustrated in the following figure:
    <br/>
    <img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/part3_api_create_person_data.png" alt="post reuest to create person on postman" width="100%" height="auto">
    <br/>
    <br/>
* To get a specified person from the database send a **GET** request to
    ```
        http://localhost:3001/api/persons/ID
    ```
    as illustrated in the following figure:
    <br/>
    <img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/part3_api_get_person.png" alt="get request for a specific on postman" width="100%" height="auto">
    Make sure that the ***ID*** part of the request contains a **valid** id!
    <br/>
    <br/>
* To delete a specified person from the database send a **DELETE** request to
    ```
        http://localhost:3001/api/persons/ID
    ```
    as illustrated in the following figure:
    <br/>
    <img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/part3_api_delete_person.png" alt="delete request for a specific on postman" width="100%" height="auto">
    Make sure that the ***ID*** part of the request contains a **valid** id!
    <br/><br/>
### Testing the API on Visual Studio Code:

If you use [**Visual Studio Code**](https://code.visualstudio.com/), add the [**VS Code REST client plugin**](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) and execute the requests in the *'requests'* directory.

**Note:** In order to execute the *delete_person* and *get_single_person* requests make sure that you change the ***ID*** part of the request with a **valid** id.
