<h1>
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/react_logo.png" alt="react logo" width="50" height="50">
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/redux_logo.png" alt="redux logo" width="50" height="50">
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/node_express.png" alt="node express logo" width="auto" height="60">
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/mongoDB_logo.png" alt="mongoDB logo" width="50" height="50">
Bloglist App<br/>
</h1>

The *BlogList App* is a simple React App, which allows users to save information about interesting blogs they have stumbled across on the internet. For each listed blog the app saves the author, the title, the url, and the amount of upvotes from users of the application.

++++++++++++++++

The *BlogList App* consists of two parts:

* [**backend**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part7/bloglist/backend)**:** This folder contains the code of the backend side of the app. 

* [**frontend**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part7/bloglist/frontend)**:** This folder contains the code of the frontend side of the app.



<h3>Running the App</h3>

To run the app locally, both parts of the app (backend and frontend) should run in parallel (different terminals). Follow the instructions in the *README* file, located in the root folder of each part, to compile and run the app locally.

**Note:** Make sure that you create a user according to the *README* file in [**backend**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part7/bloglist/backend) folder and you will use the credentials to login according to the *README* file in [**frontend**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part7/bloglist/frontend) folder.

+++




<h3>End to End Testing</h3>
++++


<h4>Setup Backend for Testing</h4>

Navigate from your terminal inside the /part7/bloglist/backend folder and:

**1.**  Run ***npm install*** or ***npm i*** to install the dependencies of the app.

**2.** Create your own account on [**MongoDb**](https://www.mongodb.com/cloud), add a user, and get your credentials for the database access.

**3.** In the **.env** file at the root of the project set the *'MONGODB_URI'* and *'TEST_MONGODB_URI'* variables with the connection string provided by [**MongoDb**](https://www.mongodb.com/cloud):
    
    MONGODB_URI=...
    TEST_MONGODB_URI=...

**Note:** Make sure that the name of the database is **bloglist**!

**4.** Run ***npm run start:test*** to start the server of the API in testing mode.


<h4>Setup Frontend for Testing</h4>

Open a new terminal, navigate from your terminal inside the /part7/bloglist/frontend folder and:

**1.**  Run ***npm install*** or ***npm i*** to install the dependencies of the app.

**2.**  Run ***npm start***.


<h4>Testing the App</h4>

To execute the *End to End* testing: 

**1.**  Open a new terminal, navigate from your terminal inside the /part7/bloglist/frontend folder and run ***npm run cypress:open***.

**2.**  On the *Cypress Panel* click ***Run all specs*** to execute the tests. <br/>
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/cypress_panel.pngg" alt="cypess panel" width="auto" height="80">


