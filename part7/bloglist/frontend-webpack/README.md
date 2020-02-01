# Bloglist Frontend

The *BlogList Frontend* contains the code for the frontend side of the *BlogList App*.  This app is build upon the *Bloglist Frontend* that was developed in [**part7**](https://github.com/katerina-tziala/fullstackopen2019/tree/master/part7/bloglist/frontend). The app still utilizes the Redux-library for state mangement, and is structured into three diffent views with the use of *React Router*. In this version of the *Bloglist App*, the Webpack module bundler is also utilized.

## Installation of the App

1. Fork and clone this repository.

2. To install the dependencies of the app, navigate from your terminal inside the ***fullstackopen2019/part7/bloglist/frontend-webpack*** directory and run:

    ```
    npm install
    ```

    or

    ```
    npm i
    ```

## Running the App Locally

1. Make sure that all the dependencies of the *Bloglist App* are installed.

2. Navigate from your terminal inside the ***fullstackopen2019/part7/bloglist/frontend-webpack*** directory and run:

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

2. Navigate from your terminal inside the ***fullstackopen2019/part7/bloglist/frontend-webpack*** directory and run:

    ```
    npm run lint
    ```

## Building and Running the App

1. Make sure that all the dependencies of the *Bloglist App* are installed.

2. To **build** the app navigate from your terminal inside the ***fullstackopen2019/part7/bloglist/frontend-webpack*** directory and run:

    ```
    npm run build
    ```

3. To inspect the bundled version of the app locally navigate from your terminal inside the ***fullstackopen2019/part7/bloglist/frontend-webpack/build*** directory and run:

    ```
    npx static-server
    ```