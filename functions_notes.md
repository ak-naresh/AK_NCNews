## List of all functions (to avoid confusion again)

---

## articles.controller.js

- `getArticles(request, response, next)`
  Controller: Handles GET /api/articles, fetches all articles and sends as response.
- `getArticleById(request, response, next)`
  Controller: Handles GET /api/articles/:article_id, fetches a single article by ID.

---

## topics.controller.js

- `getTopics(request, response, next)`
  Controller: Handles GET /api/topics, fetches all topics and sends as response.

---

## users.controller.js

- `getUsers(request, response, next)`
  Controller: Handles GET /api/users, fetches all users and sends as response.

---

## articles.model.js

- `fetchArticles()`
  Model: Retrieves all articles with comment counts, excludes article body.
- `lookupArticleId(id)`
  Model: Retrieves a single article by article_id
- `fetchCommentsByDate(id)`
  Model: Retrieves all comments for a given article, ordered by date descending.

---

## topics.model.js

- `fetchTopics()`
  Model: Retrieves all topics from the database.

---

## users.model.js

- `selectUsers()`

---

## seed.js

- `seed({ topicData, userData, articleData, commentData })`

---

## utils.js

- `mapArticleTitleToId(comments, articles)`
- `module.exports = mapArticleTitleToId`

---
