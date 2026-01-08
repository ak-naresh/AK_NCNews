# NC News Backend

This project is a RESTful API for NC News platform, built with Node.js and Express. Providings endpoints for articles, topics, users, and comments, using PSQL for data storage, and the API supporting CRUD operations.

<hr/>

Instructions:

1. Install postgres
2. Install dependencies listed in `package.json` with:
<pre>
npm install
</pre>
3. To setup the databases locally run the following script:
<pre>
npm run setup-dbs
</pre>
4. Generate 'env' files on root level of the project- one for each environment:

- for `.env.test`- populate the file with the below for test-database
<pre>
   PGDATABASE=nc_news_test
</pre>
- for `.env.development`- populate the file with the below for development-database
<pre>
   PGDATABASE=nc_news
</pre>

5. To seed the dev database run the following script:
<pre>
npm run seed-dev
</pre>

<hr/>

Verifying Database Connection & Troubleshooting

- To verify your database connection, you can use the `psql` command-line tool:
<pre>
psql -d nc_news
</pre>

- Or for the test database:
<pre>
psql -d nc_news_test
</pre>
- If you see a prompt without errors, connection is successful.

<hr/>

List of Endpoints:

- app.get("/api/topics", getTopics);
- app.get("/api/articles", getArticles);
- app.get("/api/articles/:article_id", getArticleById);
- app.patch("/api/articles/:article_id", patchArticleById);
- app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
- app.post("/api/articles/:article_id/comments", postCommentByArticleId);
- app.delete("/api/comments/:comment_id", deleteCommentById);
- app.get("/api/users", getUsers);

<hr/>

List of functions

- `fetchTopics()`
- `selectUsers()`
- `seed({ topicData, userData, articleData, commentData })`
- `mapArticleTitleToId(comments, articles)`

<hr/>

<p>Error Handling</p>

- Unknown endpoints: handled by `handlePathNotFound`, returning 404 Not Found .
- Custom errors: handled by `handleCustomErrors`.
- PSQL errors: `22P02` are handled by `handleBadRequest`, returning 400 Bad Request.
- Server errors: Unexpected errors are logged, returning 500 Internal Server Error via `handleServerErrors`.
