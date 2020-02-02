# PhoneBook API

The *PhoneBook API* contains the code for the developed API (backend side) of the *PhoneBook App*.

## PhoneBook API Endpoints

The following list presents the endpoints of the *PhoneBook API*.

- **GET /api/info :** Get the info of the *phonebook* database

- **GET /api/persons :** To retrieve all persons from the *phonebook* database.

- **POST /api/persons :** To create a person in the *phonebook* database.

- **GET /api/persons/(ObjectID) :** To retrieve a specified person from the *phonebook* database.

- **DELETE /api/persons/(ObjectID) :** To delete a specified person from the *phonebook* database.

**Note:** Make sure that  you change the **(ObjectID)** part of the request with a **valid** id.

## App Requirements

For the *PhoneBook API* you need an account on [**MongoDb**](https://www.mongodb.com/cloud) to connect to the database. Read the [**README_DB_CONNECTION**](https://github.com/katerina-tziala/fullstackopen2019/blob/master/README_DB_CONNECTION.md) file in the root directory of this repository in order to: 

1. Create a database user and get your own credentials, ***YOUR_OWN_MONGODB_USERNAME*** and ***YOUR_OWN_MONGODB_PASSWORD***, for the database access.

2. Create ***YOUR_OWN_MONGODB_URI***. Make sure that the name of the database is **phonebook**!

## Installation of the App

1. Fork and clone this repository.

2. To install the dependencies of the app, navigate from your terminal inside the ***fullstackopen2019/part3/phonebook_backend*** directory and run:

    ```
    npm install
    ```

    or

    ```
    npm i
    ```

## Running the App Locally

1. Make sure that all the dependencies of the *PhoneBook API* are installed.

2. In the ***.env*** file set **YOUR_OWN_MONGODB_URI** as the value of the ***MONGODB_URI*** variable:
   
    ```
    MONGODB_URI=...
    ```

3. To start the server of the API, navigate from your terminal inside the ***fullstackopen2019/part3/phonebook_backend*** directory and run:

    ```
    npm run start
    ```

4. Access the server locally at: ```http://localhost:3001/```

## Linting the App

1. Make sure that all the dependencies of the *PhoneBook API* are installed.

2. Navigate from your terminal inside the ***fullstackopen2019/part3/phonebook_backend*** directory and run:

    ```
    npm run lint
    ```

## Command-line Database

1. Make sure that all the dependencies of the *PhoneBook API* are installed.

2. In the ***mongo.js*** file set **YOUR_OWN_MONGODB_USERNAME** as the value of the ***DB_USERNAME*** variable:

    ```javascript
    9. const DB_USERNAME = 'YOUR_OWN_MONGODB_USERNAME';
    ```

<br/>

The application works as follows:

1. Navigate from your terminal inside the ***fullstackopen2019/part3/phonebook_backend*** directory.

2. To display all of the entries in the phonebook database execute the command:
    ```
    node mongo.js "YOUR_OWN_MONGODB_PASSWORD"
    ```

3. To create an entry in the phonebook database:
    ```
    node mongo.js "YOUR_OWN_MONGODB_PASSWORD" "name" "number"
    ```

For example the command:

```
node mongo.js "YOUR_OWN_MONGODB_PASSWORD" Anna 040-1234556
```

will print:

```
added Anna number 040-1234556 to phonebook
```

And the new entry to the phonebook will be saved to the database.

Notice that if the name contains whitespace characters, it must be enclosed in quotes:

```
node mongo.js "YOUR_OWN_MONGODB_PASSWORD" "Arto Vihavainen" 040-1234556
```

## Testing the API

In order to test the endpoinds of the API make sure that the server is running locally, as stated above, before sending any request.

### Testing the API with POSTMAN:

If you test the *PhoneBook API* with [**Postman**](https://www.getpostman.com/):

* To retrieve the info of the *phonebook* database send a **GET** request to
    ```
    http://localhost:3001/api/info
    ```
    as illustrated in the following figure:
    <br/>
    <img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/part3_api_info.png" alt="get info reuest on postman" width="100%" height="auto">
    <br/>
    <br/>
* To retrieve the list of all persons in the database send a **GET** request to
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
* To retrieve a specified person from the database send a **GET** request to
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

If you use [**Visual Studio Code**](https://code.visualstudio.com/), install the [**VS Code REST client plugin**](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) and execute the requests in the ***requests*** directory.

**Note:** In order to execute the *delete_person* and *get_single_person* requests make sure that you change the **(ObjectID)** part of the request with a **valid** id.
