# NC News Backend

This project is a RESTful API for NC News platform, built with Node.js and Express. Providings endpoints for articles, topics, users, and comments, using PSQL for data storage, and the API supporting CRUD operations.

---

## Instructions:

1. You should have postgres installed on your machine...

2. Install dependencies listed in `package.json` with:

```sh
npm install
```

3. To setup the databases locally run the following script:

```sh
npm run setup-dbs
```

4. Generate 'env' files on root level of the project- one for each environment:

   - for `.env.test`- populate the file with the below for test-database

   ```sh
   PGDATABASE=nc_news_test
   ```

   - for `.env.development`- populate the file with the below for development-database

   ```sh
   PGDATABASE=nc_news
   ```

5. To seed the dev database run the following script:

```sh
npm run seed-dev
```

---

## Verifying Database Connection & Troubleshooting

- To verify your database connection, you can use the `psql` command-line tool:

```sh
psql -d nc_news
```

- Or for the test database:

```sh
psql -d nc_news_test
```

- If you see a prompt without errors, connection is successful.

---

## List of Endpoints:

1. app.get("/api/topics", getTopics); //responds with a list of topics

2. app.get("/api/articles", getArticles); //responds with a list of articles
3. app.get("/api/articles/:article_id", getArticleById); //responds with an article by article ID
4. app.get("/api/articles/:article_id/comments", getCommentsByArticleId); //responds with a list of comments by article ID
5. app.post("/api/articles/:article_id/comments", postCommentByArticleId); //add a comment to an article by article ID
6. app.patch("/api/articles/:article_id", patchArticleById); //updates an article by article ID

7. app.get("/api/users", getUsers); //responds with a list of users

---

## List of all functions

### articles.controller.js

- `getArticles(request, response, next)`
  Controller: Handles endpoint GET /api/articles, fetches all articles and sends as response.
- `getArticleById(request, response, next)`
  Controller: Handles endpoint GET /api/articles/:article_id, fetches a single article by ID.
- `getCommentsByArticleId(request, response, next)`
  Controller: Handles endpoint GET /api/articles/:article_id/comments, fetches all comments for a given article, ordered by most recent first.
- `postCommentByArticleId(request, response, next)`
  Controller: Handles endpoint POST /api/articles/:article_id/comments, adds a new comment to the specified article.
- `patchArticleById(request, response, next)`
  Controller: Handles endpoint PATCH /api/articles/:article_id, updates the votes property of an article_ID.

### topics.controller.js

- `getTopics(request, response, next)`
  Controller: Handles endpoint GET /api/topics, fetches all topics and sends as response.

### users.controller.js

- `getUsers(request, response, next)`
  Controller: Handles endpoint GET /api/users, fetches all users and sends as response.

### articles.model.js

- `fetchArticles()`
  Model: Retrieves all articles with comment counts, excludes article body.
- `lookupArticleId(id)`
  Model: Retrieves a single article by article_id
- `fetchCommentsByID(id)`
  Model: Retrieves all comments for a given article, ordered by date descending.
- `insertCommentByArticleId(article_id, username, body)`
  Model: Adds a new comment to the specified article after validating BOTH article and user exists.
- `updateArticleVotes(article_id, inc_votes)`
  Model: Updates votes property of article by article_id, incrementing or decrementing by inc_votes integer.

### topics.model.js

- `fetchTopics()`
  Model: Retrieves all topics from the database.

### users.model.js

- `selectUsers()`
  Model: Retrieves all users from the database.

### seed.js

- `seed({ topicData, userData, articleData, commentData })`
  DB Seeding: drop tables, creates tables, and inserts all provided data into tables

### utils.js

- `mapArticleTitleToId(comments, articles)`
  Utility: Maps comment.article_title to correct article_id for seeding comments

---

## Error Handling

### Unknown endpoints

- Unknown endpoints are handled by `handlePathNotFound`, returning 404 Not Found .

### Custom errors

- Custom errors are handled by `handleCustomErrors`.

### PSQL errors

- `22P02` are handled by `handleBadRequest`, returning 400 Bad Request.

### Server errors

- Unexpected errors are logged, returning 500 Internal Server Error via `handleServerErrors`.
