# NC News Backend API

## RESTful API for NC News platform, built with **Node.js**, **Express**, and **PostgreSQL**. This API provides endpoints for managing articles, topics, users, and comments with full CRUD support.

---

## API Endpoints

### **Topics**

- `GET /api/topics` - Get all topics

### **Articles**

- `GET /api/articles` - Get all articles (sorted by date, includes comment count)
- `GET /api/articles/:article_id` - Get a specific article by ID
- `PATCH /api/articles/:article_id` - Update article vote count
- `GET /api/articles/:article_id/comments` - Get all comments for an article
- `POST /api/articles/:article_id/comments` - Add a comment to an article

### **Comments**

- `DELETE /api/comments/:comment_id` - Delete a comment by ID

### **Users**

- `GET /api/users` - Get all users

For detailed request/response examples, see the API documentation page at `/` or refer to `public/index.html`.

---

## Error Handling

The API implements comprehensive error handling:

- **400 Bad Request**: Invalid input data or malformed requests (PSQL error code `22P02`)
- **404 Not Found**: Resource not found or invalid endpoints
- **500 Internal Server Error**: Unexpected server errors

**Error Handler Functions**:

- `handlePathNotFound` - Catches unknown endpoints
- `handleCustomErrors` - Processes custom application errors
- `handleBadRequest` - Handles PSQL validation errors
- `handleServerErrors` - Catches all other server errors

---

## Testing

Tests are written using **Jest** and **Supertest**, with additional matchers from **jest-extended** and **jest-sorted**.

---

## Key Functions

### **Model Functions**

- `fetchTopics()` - Retrieves all topics
- `fetchArticles()` - Retrieves all articles with comment counts
- `lookupArticleId(article_id)` - Finds article by ID
- `fetchCommentsByID(article_id)` - Gets comments for an article
- `insertCommentByArticleId(article_id, username, body)` - Creates a new comment
- `removeCommentById(comment_id)` - Deletes a comment
- `updateArticleVotes(article_id, inc_votes)` - Updates article votes
- `selectUsers()` - Retrieves all users

### **Seed Functions**

- `seed({ topicData, userData, articleData, commentData })` - Populates database
- `mapArticleTitleToId(comments, articles)` - Maps article titles to IDs
