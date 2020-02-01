# Bloglist Frontend

The *BlogList Frontend* contains the code for the frontend side of the *BlogList App*.  This app is build upon the *Bloglist Frontend* that was developed in [**part5**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part5/bloglist/frontend). In this version of the *Bloglist App*, the app utilizes the Redux-library for state mangement and is structured into three diffent views with the use of *React Router*.

## Installation of the App

1. Fork and clone this repository.

2. To install the dependencies of the app, navigate from your terminal inside the ***fullstackopen2019/part7/bloglist/frontend*** directory and run:

    ```
    npm install
    ```

    or

    ```
    npm i
    ```

## Running the App Locally

1. Make sure that all the dependencies of the *Bloglist App* are installed.

2. Navigate from your terminal inside the ***fullstackopen2019/part7/bloglist/frontend*** directory and run:

    ```
    npm start
    ```
3. Access the app locally at: ```http://localhost:3000/```

4. Login with the following credentials:
    ```
    username: theuser
    password: secretcode
    ```

## Linting the App

1. Make sure that all the dependencies of the *Bloglist App* are installed.

2. Navigate from your terminal inside the ***fullstackopen2019/part7/bloglist/frontend*** directory and run:

    ```
    npm run lint
    ```

## End to End Testing

To run the **End to End Testing** for the *Bloglist App*:

### Step A:

1. Make sure that all the dependencies of the [**Bloglist API**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part7/bloglist/backend) are installed.

2. The ***MONGODB_URI*** and ***TEST_MONGODB_URI*** variables in the  ***.env*** file of the  [**backend**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part7/bloglist/backend) directory are correctly defined.

### Step B:

To start the server of the  *Bloglist API* in testing mode, navigate from your terminal inside the ***fullstackopen2019/part7/bloglist/backend*** directory and run:

    ```
    npm run start:test
    ```

### Step C:

Run the  *Bloglist App* locally (on a different terminal) as stated above.

### Step D:

To execute the ***End to End*** testing:

1. Open a new terminal, navigate from your terminal inside the ***fullstackopen2019/part7/bloglist/frontend*** directory and run:

    ```
    npm run cypress:open
    ```

2. On the ***Cypress Panel*** click ***Run all specs*** to execute the tests. <br/><br/>
<img src="https://raw.githubusercontent.com/katerina-tziala/fullstackopen2019/master/documentation_images/cypress_panel.png" alt="cypess panel" width="auto" height="300">