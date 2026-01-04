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

1. app.get("/api/topics", getTopics);
2. app.get("/api/articles", getArticles);
3. app.get("/api/articles/:article_id", getArticleById);
4. app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
5. app.post("/api/articles/:article_id/comments", postCommentByArticleId);
6. app.patch("/api/articles/:article_id", patchArticleById);
7. app.get("/api/users", getUsers);

---

## List of functions

- `getArticles(request, response, next)`
- `getArticleById(request, response, next)`
- `getCommentsByArticleId(request, response, next)`
- `postCommentByArticleId(request, response, next)`
- `patchArticleById(request, response, next)`

- `getTopics(request, response, next)`

- `getUsers(request, response, next)`

- `fetchArticles()`
- `lookupArticleId(id)`
- `fetchCommentsByID(id)`
- `insertCommentByArticleId(article_id, username, body)`
- `updateArticleVotes(article_id, inc_votes)`

- `fetchTopics()`
- `selectUsers()`
- `seed({ topicData, userData, articleData, commentData })`
- `mapArticleTitleToId(comments, articles)`

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
