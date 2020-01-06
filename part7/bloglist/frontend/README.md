<h1>
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/react_logo.png" alt="react logo" width="50" height="50">
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/redux_logo.png" alt="redux logo" width="50" height="50">
Bloglist Frontend<br/>
</h1>

The *BlogList Frontend* contains the code for the frontend side of the *BlogList App*.  This app is build upon the *Bloglist Frontend* that was developed in [**part5**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part5/bloglist/frontend). In this version of the *Bloglist App*, 

utilizes the Redux-library for state mangement

## Installation of the App

**1.** Fork and clone this repository.

**2.** Navigate from your terminal inside the /part7/bloglist/frontend folder and run ***npm install*** or ***npm i*** to install the dependencies of the app.


## Running the App Locally

**1.** Make sure that all the dependencies of the *Bloglist App* are installed.

**2.** Navigate from your terminal inside the /part7/bloglist/frontend folder and run ***npm start***.

**3.** Login with the following credentials:

        username: theuser
        password: secretcode


## Linting the App

Navigate from your terminal inside the /part7/bloglist/frontend folder and run ***npm run eslint***.


## End to End Testing

To run the **End to End Testing** for the *Bloglist App*:

### Step A

**1.** Create your own account on [**MongoDb**](https://www.mongodb.com/cloud), add a user, and get your credentials for the database access.

**2.** In the **.env** file at the root of the project set the *'MONGODB_URI'* and *'TEST_MONGODB_URI'* variables with the connection string provided by [**MongoDb**](https://www.mongodb.com/cloud):
                
                MONGODB_URI=...
                TEST_MONGODB_URI=...

**Note:** Make sure that the name of the database is **bloglist**!


### Step B

Navigate from your terminal inside the /part7/bloglist/backend folder and:

**3.**  Run ***npm install*** or ***npm i*** to install the dependencies of the app.

**4.** Run ***npm run start:test*** to start the server of the  *Bloglist API* in testing mode.


### Step C

Open a new terminal, navigate from your terminal inside the /part7/bloglist/frontend folder and:

**1.**  Run ***npm install*** or ***npm i*** to install the dependencies of the app.

**2.**  Run ***npm start***.


### Step D

To execute the *End to End* testing:

**1.**  Open a new terminal, navigate from your terminal inside the /part7/bloglist/frontend folder and run ***npm run cypress:open***.

**2.**  On the *Cypress Panel* click ***Run all specs*** to execute the tests. <br/><br/>
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/cypress_panel.png" alt="cypess panel" width="auto" height="300">



