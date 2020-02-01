# DataForCountries App

The *DataForCountries App* is a simple React App, which displays information for various countries.

## APIs Used for the App

- [**REST COUNTRIES**](https://restcountries.eu)**:** A REST API to retrieve information about all countries.
- [**weatherstack**](https://weatherstack.com/)**:** A Real-Time & Historical World Weather Data API, to retrieve instant, accurate weather information for any country in lightweight JSON format.

## App Requirements

In order to run the *DataForCountries App* you need to get your own **API key** from [**weatherstack**](https://weatherstack.com/),  referred from now on as **YOUR_OWN_API_KEY**.

## Installation of the App

1. Fork and clone this repository.

2. To install the dependencies of the app, navigate from your terminal inside the ***fullstackopen2019/part2/dataforcountries*** directory and run:

    ```
    npm install
    ````

    or

    ```
    npm i
    ````

## Running the App Locally

1. Make sure that all the dependencies of the *DataForCountries App* are installed.

2. In the ***CountryDetails.js*** file set **YOUR_OWN_API_KEY** as the value of the ***apiKey*** variable:

    ```javascript
    9. const apiKey = '_API_KEY_';
    ```

3. Navigate from your terminal inside the ***fullstackopen2019/part2/dataforcountries*** directory and run:

    ```
    npm start
    ````

4. Access the app locally at: ```http://localhost:3000/```
