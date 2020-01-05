<h1>
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/node_express.png" alt="node express logo" width="auto" height="60">
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/mongoDB_logo.png" alt="mongoDB logo" width="50" height="50">
Bloglist API<br/>
</h1>

The *Bloglist API* contains the code for the developed API (backend side) of the *Bloglist App*.

## Installation of the App

**1.** Fork and clone this repository.

**2.** Navigate from your terminal inside the /part4/bloglist folder and run ***npm install*** or ***npm i*** to install the dependencies of the app.


## Running the App Locally

**1.** Make sure that all the dependencies of the *Bloglist API* are installed.

**2.** Create your own account on [**MongoDb**](https://www.mongodb.com/cloud), add a user, and get your credentials for the database access.

**2.** In the **.env** file at the root of the project set the *'MONGODB_URI'* and *'TEST_MONGODB_URI'* variables with the connection string provided by [**MongoDb**](https://www.mongodb.com/cloud):
    
    MONGODB_URI=...
    TEST_MONGODB_URI=...

**Note:** Make sure that the name of the database is **bloglist**!

**3.**  Navigate from your terminal inside the /part4/bloglist folder and run ***npm run start*** to start the server of the API.


## Testing the App

Before running any tests make sure that:

**1.** All the dependencies of the *Bloglist API* are installed.

**2.** You have access to a cluster on [**MongoDb**](https://www.mongodb.com/cloud). 

**3.** The *'MONGODB_URI'* and *'TEST_MONGODB_URI'* variables in the **.env** file are correctly defined, as stated before.


### Unit Testing

In order to execute the unit tests on the app navigate from your terminal inside the /part4/bloglist folder and run ***npm run unit-test***.


### Integration Testing

In order to execute the integration tests on the app navigate from your terminal inside the /part4/bloglist folder and run ***npm run unit-test***.


### Running Tests of a specific file

In order to execute the tests of a single file:

**1.** Define the path of the file you want to test in the *'npm script test-file'* command to execute the tests of the desired file.

         "scripts": {
            ...
            "test-file": "cross-env NODE_ENV=test npx jest <PATH_OF_THE_FILE> --runInBand",
            ...
        },

For example, if you want to execute the tests defined in the *'blog_creation.test'* file then the *'test-file'* command becomes:

        "test-file": "cross-env NODE_ENV=test npx jest tests/api/blog_creation.test --runInBand",


**2.** Navigate from your terminal inside the /part4/bloglist folder and run ***npm run test-file***.

