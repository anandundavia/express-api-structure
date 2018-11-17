## Structure

`src` contains the whole source code of the api.
Inside `src`, there are three directories: `api`, `config`, `constants` and one `index.js` file which will be the entry point to the application

### `constants` directory

`index.js` will export all the constants required in the api.

-   constants which are common across environments like dev and prod should be defined in `constants.common.js`

-   constants which are specific for environments should be defined in `constants.dev.js` or `constants.dev.js`. Make sure to have the same shape of constants in all the `constants.[env].js` files

*   > DO NOT include sensitive information like credentials of database in the constants, they should be defined in the .env file which is explained

### `config` directory

This directory will have self-contained config files for different modules in your api.
In the boilerplate, `express.js` and `session.js` are included which configures the appropriate modules.

While creating new config files, in the mind that self-contained config files will help in scaling the application as well as make it more maintainable,
For example, If in future you want to shift to sails from express, all you need to do is create one `sails.js` file, require it in the `src/index.js` and done!

You can even take this to one level further by doing `express.dev.js` and `express.prod.js` and require appropriate file in `src/index.js` based on the env. For the most applications however, that part will be taken care by constants. But if needed, above can be done as well

### `api` directory

This directory will be the one you will be working with most of the time
This directory contains more directories:

-   `controllers`
-   `middlewares`
-   `repository`
-   `routes`
-   `services`
-   `utils`
-   `validations`

#### controllers

A controller will have all the business logic related to one object or one api path ( `/v1/product` )

Naming convention: If your api is `/v1/product` then name your controller as `product.controller.js`
`product.controller.js` will have all the business logic that will be performed at `/v1/product/...` endpoints.
API and controller function mapping:

```
API                         | controller function
                            |
GET: /v1/product/all        | `exports.getAllProducts`
GET: /v1/product/:productID | `exports.getSingleProduct`
POST: /v1/product           | `exports.createProduct`
PUT: /v1/product/productID  | `exports.updateProduct`
```

A `product.controller.js` file should ideally use `product.service.js` and `response.service.js` files located in `api/services` directory

#### middlewares

Any common functions that are needed across routes should be inside this directory.
Middlewares with functionalities of error handling and authentication are the most common across routes and thus are included in this boilerplate

Convention: In case of express, all the middlewares should be a function which takes either (req, res, next) or (error, req, res, next) as argument

#### repository

All the queries to database should reside here. In this boilerplate, `mongo` directory is included as example. Which will have all the queries to the mongo database.

Convention:

-   A separate directory for each repository/database used. For example if you use `redis` and
    `mysql`, you will have two directories inside `repository`
-   Each database specific directory should have `[name-of-db].repository.js` file (`mongo.repository.js` is included in the example). This file should have logic to open and close the connection to
    the database. This files also multiplexes the queries fired on that database.
    You might want to have one more directory named `collection` or `table` inside each database specific directory. If you have two collection/table named `product` and `user` in your database, then `collection` directory should have `product.collection.js` and `user.collection.js` ( or `table` directory should have `product.table.js` and `user.table.js` ).
-   Each `[entity].collection.js` or `[entity].table.js` should at least export two members. A function named `setDatabase` and An object named `queries` containing all the query functions. Explore the boilerplate example for more information
-   All the queries should be exported in such a manner that a controller or a service using that query should not know on which database it is being fired. For example a controller should import a query like: `import { findUser, setSession } = require('../repository');` Chances are, `findUser` is exported by `mongo` and `setSession` is exported by `redis`. Use object destructuring at appropriate places to achieve the same

#### routes

All the API routes.

Convention:

-   Create version wise directories ( `v1`, `v2` )
-   Each version directory should have `index.js`.
-   If there are apis of `user` and `product`, the `v1` directory should have `user.route.js` and `product.route.js`

Look at the example given in the boilerplate and read the comments to get the better idea

#### services

A service should be created:

1. To increase code reuse ( `response.service.js` )
2. To encapsulate complex business logic which is outside of the scope of a controller
3. If you need to manage some sort of state in the API ( when was the last time some cron job ran )

> If a service maintains some state, it must be a singleton

#### utils

Utility classes and functions that are used frequently in the API ( which can not be inside middlewares or can not be a service on their own )

#### validations

Validations for each api.

Convention:

-   All the validations of `/v1/product/...` route should be inside `product.validation.js`
    Have a look at the `user.validation.js` included in the boilerplate example.

---

## Some Details combining everything together

To create a /v1/product/... API routes:

1. Create `product.controller.js` in `controllers`
2. Create `product.route.js` in `routes`
3. Create `product.validation.js` in `validations`
4. Create `product.collection.js` in `repository/mongo`
5. You might want to create `product.service.js` inside `services`

Inside the `routes/v1/index.js` file, the routes should be mounted like

```
const productRoutes = require('./product.route');
...
router.use('/product', productRoutes);
```

<br>
`product.route.js` should look like:

```
const validate = require('express-validation');

const controller = require('../../controllers/product.controller');
const validation = require('../../validations/product.validation');


...
router.route('/')
    .get(validate(validation.getProduct), controller.getProduct)
    .post(validate(validation.createProduct), controller.createProduct)
```

<br>
`product.controller.js` should make use of functions exported by `product.collection.js`

## Sensitive information and .env files

Sensitive information like database credentials and keys to sign cookies should not be included in
constants file. They should be in `.env` file

> `.env` must never be committed to version control. `.env.example` file should be committed to let other developers know what env variables should be defined

Checkout `.env.example` and `.env` to get the better idea
