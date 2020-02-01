# MongoDB Connection

1. Create your own account on [**MongoDb**](https://www.mongodb.com/cloud).

2. Create a cluster [**MongoDb**](https://www.mongodb.com/cloud).

3. Add a database user on [**MongoDb**](https://www.mongodb.com/cloud) with read and write privileges to any database.  The **username** and the **password** of the created user are the credentials you need for the database access. The **username**  will be referred from now on as ***YOUR_OWN_MONGODB_USERNAME***, whilst the **password** will be referred from now on as ***YOUR_OWN_MONGODB_PASSWORD***.

4. Create your own connection links for the database connection according to the following form:

   ```
   mongodb+srv://<username>:<password>@cluster0-xq5jf.mongodb.net/<database>?retryWrites=true"&"w=majority
   ```

This connection link is required to connect the app with the database and will be referred from now on as ***YOUR_OWN_MONGODB_URI***.
   
**Notes:**

- Make sure that you use the correct credentials (**username** and **password**) in the connection link.

- Make sure that you use the correct database name in the connection link.