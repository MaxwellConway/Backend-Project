# ReadMe

## Function

This repo includes a file named `script.js`. This file contains the information necessary to run a local server. There are also `models` and `migrations` that can be used to create a database. Several files within the `routes` folder contain routes that can be run in browser to perform CRUD on the database. The default page is `/login`. This page includes a login form and a button to allow a user to sign up. Logging in takes the user to the home page where a search can be performed using the Ticketmaster Discovery API. Search results can then be added to the logged-in user's home page. The user can also see the usernames of other users that have added the same results to their home page.

## Tables

There are three tables outlined in the `models` folder. These tables are named `Concerts`, `Users`, and `linkedUserConcerts`. Both the `Concerts` and `Users` tables have a one-to-many relationship with the `linkedUserConcerts` table. The `linkedUserConcerts` table includes a userId column from the `Users` table and a concertId column from the `Concerts` table.

## Dependencies

To link a database, one must include a `config.json` file within the `config` folder with the proper database credentials.

Here is a list of dependencies used in this project:

- "bcrypt": "^5.1.0",
- "body-parser": "^1.20.2",
- "connect-session-sequelize": "^7.1.7",
- "cookie-parser": "^1.4.6",
- "dotenv": "^16.1.4",
- "ejs": "^3.1.9",
- "express": "^4.18.2",
- "express-session": "^1.17.3",
- "jose": "^4.14.4",
- "jsonwebtoken": "^9.0.0",
- "jwt-decode": "^3.1.2",
- "passport": "^0.6.0",
- "passport-local": "^1.0.0",
- "pg": "^8.11.0",
- "sequelize": "^6.32.0",
- "sequelize-cli": "^6.6.0"
