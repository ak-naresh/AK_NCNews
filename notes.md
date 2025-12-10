# Requirements:

### Topics- Each topic in the topics table should have:

- `slug` field which is a unique string that acts as the table`s primary key (a slug is a term used in publishing to identify an article)
- `description` field which is a string giving a brief description of a given topic
- `img_url` field which contains a string containing a link to an image representing the topic

### Users- Each user should have:

- `username` which is the primary key & unique
- `name`
- `avatar_url`

### Articles- Each article should have:

- `article_id` which is the primary key
- `title`
- `topic` field which references the `slug` in the topics table
- `author` field that references a user's primary key - `username`
- `body`
- `created_at` defaults to the current timestamp
- `votes` defaults to 0
- `article_img_url`

### Comments- Each comment should have:

- `comment_id` which is the primary key
- `article_id` field that references an article`s primary key
- `body`
- `votes` defaults to 0
- `author` field that references a user's primary key -`username`
- `created_at` defaults to the current timestamp

---

mvc

Model:
The Model respresents the data and business logic of an application, handling the fetching, updating, creation and deletion of data. It is responsible for sending the relevant data in the required format to the Controller.

View:
The view is the interface that displays data from the Model to the user and sends user inputs to the Controller. Views will not be covered as part of the Back End block.

Controller:
The Controller handles the client request. Using the information contained on the request (path, params, queries and body), it will invoke the model that will interact with the dataset. The controller is also responsible for sending a response back to the client.

---

### Order to create tables based on primary keys (PK) and foreign keys (FK):

- 1 topics //topics contains no foreign keys = NO DEPENDENCIES
- 2 users //`name` & `username` from Users used within `author` in Articles & Comments = NO DEPENDENCIES
- 3 articles //`authors` from Articles used within `author` in Comments, `votes` in Articles references `votes` in Comments, `topic` in Articles references `slug` in Topics
- 4 comments //`author` in Comments references `username` in Users, `topic` in Comments references `slug` in Topics, `votes` in Comments references `votes` in Articles

---

### When creating tables: npm run test-seed

- You should run `npm run test-seed` in terminal regularly to check your progress. Each passing test confirms that a part of your seed function is working as expected. If a test fails, use the error messages to debug your table structure or data insertion.

---

## CRUD

### When dropping tables:

- When dropping tables in seed file, ensure to drop them in reverse order to avoid FK errors. (urghhh)

### When seeding data (after creating tables):

- When seeding data, ensure to seed tables in the correct order to avoid FK errors.
- Seeding maps each topic object to an array of values- then uses `pg-format` to generate bulk SQL insert statement, then executes the query to insert all topics at once.
- Double check data provided for each table. You might need to manipulate data so it's in the correct format for each insert. The keys on each object in the data may not line up with the column names you created on the previous task.
- Build a utils function in utils.js and fully test any functions created.
- Use utility functions to transform data for comments seeding table (i.e., mapping article titles to IDs for comments).

---

- Pool is used to keep connection open instead of reconnecting each time.

---

## Error Handling

### List of status codes

- `22P02`
  Status: PSQL error for invalid syntax, handled as 400 Bad Request
- `200 OK`
  Status: Successful GET request, returns data
- `201 Created`
  Status: Successful new comment created
- `400 Bad Request`
  Status: Invalid input, e.g. wrong data type
- `404 Not Found`
  Status: Resource not found or endpoint does not exist
- `500 Internal Server Error`
  Status: Unexpected server error

### Error-handling process

1. Request comes in and controller checks request
2. If something is wrong (like an invalid id), it creates an error object:
   - Sets `error.code` to identify specific type of error (e.g., "22P02" PSQL error for invalid id).
   - Sets `error.status` for intended HTTP status (e.g., 400 or 404).
   - Passes error to the next middleware with `next(error)`.
3. Error-handling middleware receives the error:
   - It looks at `error.code` to detect database errors.
   - It looks at `error.status` to tell middleware which HTTP status to use.
4. Middleware uses `response.status()` to send the HTTP status code to the client.

notes:

- removed all instances of '.catch(error) => { next(error); }' as Express 5 handles this automatically

notes concering incorre error-handling:

- Mixed ordering of error-handling middleware in Express causes errors

- More specific error handlers like for PSQL errors must come before general ones like custom or server error handlers.
- If a general 500 handler comes before a 400 invalid input, the specific error will never be caught and will return wrong status code.
- Always order: specific > general.

1. app.use(handlePathNotFound); //Handles unknown endpoints (404)
2. app.use(handleBadRequest); //Handles PSQL bad request errors (400)
3. app.use(handleCustomErrors); //Handles custom errors
4. app.use(handleServerErrors); //Handles all other server errors (500)

---

//article_id 3 is first because created_at changes order
//not one of the two but both articles and comments have a created_property

---

GET/POST/PATCH/DELETE = CRUD

GET = Read (retrieves data, e.g. list articles, get user)
POST = Create (adds new data, e.g. new article or comment)
PATCH/PUT = Update (modifies existing data, e.g. update votes)
DELETE = Delete (removes data, e.g. delete a comment or article)
