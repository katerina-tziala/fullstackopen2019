# Bloglist API

The *Bloglist API* contains the code for the developed API (backend side) of the *Bloglist App*. This app is build upon the
*Bloglist API* that was developed in [**part4**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part4/bloglist). 

## Bloglist API Endpoints

The following list presents the endpoints of the *PhoneBook API*.

- **POST /api/login :** To login in the *Bloglist App*

- **GET /api/users :** To retrieve all users from the *bloglist* database.

- **POST /api/users :** To create a user in the *bloglist* database.

- **GET /api/blogs :** To retrieve all blogs from the *bloglist* database.

- **POST /api/blogs :** To create a blog in the *bloglist* database.

- **GET /api/blogs/ID :** To retrieve a specified blog from the *bloglist* database.

- **PUT /api/blogs/ID :** To update a specified blog in the *bloglist* database.

- **DELETE /api/blogs/ID :** To delete a specified blog from the *bloglist* database.

## App Requirements

For the *Bloglist API* you need an account on [**MongoDb**](https://www.mongodb.com/cloud) to connect to the database. Read the [**README_DB_CONNECTION**](https://github.com/katerina-tziala/fullstackopen2019/blob/master/README_DB_CONNECTION.md) file in the root directory of this repository in order to: 

1. Create your own credentials (***YOUR_OWN_MONGODB_USERNAME***, ***YOUR_OWN_MONGODB_PASSWORD***) for the database access.

2. Create ***YOUR_OWN_MONGODB_URI***. Make sure that the name of the database is **bloglist**!

## Installation of the App

1. Fork and clone this repository.

2. To install the dependencies of the app, navigate from your terminal inside the ***fullstackopen2019/part5/bloglist/backend*** directory and run:

    ```
    npm install
    ````

    or

    ```
    npm i
    ````

## Running the App Locally

1. Make sure that all the dependencies of the *Bloglist API* are installed.

2. In the ***.env*** file set **YOUR_OWN_MONGODB_URI** as the value of the ***MONGODB_URI*** and ***TEST_MONGODB_URI*** variables:
   
    ```
    MONGODB_URI=...
    TEST_MONGODB_URI=...
    ```

3.  To initialize the database and create a user for the app navigate from your terminal inside the ***fullstackopen2019/part5/bloglist/backendt***  directory and run:
    ```
    npm run init-app-db
    ````
    The user that will be created is:
    ```javascript
    {
        name: 'The User',
        username: 'theuser',
        password: 'secretcode'
    }
    ```

    **Note:** You will need the username and password to login in the frontend of the app!

4. To start the server of the API, navigate from your terminal inside the ***fullstackopen2019/part5/bloglist/backend*** directory and run:

    ```
    npm run start
    ````

5. Access the server locally at: ```http://localhost:3003/```

## Linting the App

1. Make sure that all the dependencies of the *Bloglist API* are installed.

2. Navigate from your terminal inside the ***fullstackopen2019/part5/bloglist/backend*** directory and run:

    ```
    npm run lint
    ````

## Testing the App

Before running any tests make sure that:

1. All the dependencies of the *Bloglist API* are installed.

2. The ***MONGODB_URI*** and ***TEST_MONGODB_URI*** variables in the  ***.env*** file are correctly defined, as stated above.


### Unit Testing

In order to execute the unit tests on the app navigate from your terminal inside the ***fullstackopen2019/part5/bloglist/backend*** directory and run:

```
npm run unit-test
```

### Integration Testing

In order to execute the integration tests on the app navigate from your terminal inside the ***fullstackopen2019/part5/bloglist/backend*** directory and run:

```
npm run test-api
```

### Full Testing

In order to execute all tests on the app navigate from your terminal inside the ***fullstackopen2019/part5/bloglist/backend*** directory and run:

```
npm run test
```

### Running Tests of a Specific File

In order to execute the tests of a single file:

1. Define the path of the file you want to test in the ***test-file*** command  in ***package.json*** to execute the tests of the desired file.
    ```javascript
    "scripts": {
        ...
        "test-file": "cross-env NODE_ENV=test npx jest <PATH_OF_THE_FILE> --runInBand",
         ...
    },
    ```

    For example, if you want to execute the tests defined in the ***blog_creation.test*** file then the ***test-file*** command becomes:

    ```
    "test-file": "cross-env NODE_ENV=test npx jest tests/api/blog_creation.test --runInBand",
    ```

2. Navigate from your terminal inside the ***fullstackopen2019/part5/bloglist/backend*** directory and run:

    ```
    npm run test-file
    ```