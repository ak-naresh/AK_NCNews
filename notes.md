# Requirements:

# Topics

    Each topic in the topics table should have:
    - `slug` field which is a unique string that acts as the table`s primary key (a slug is a term used in publishing to identify an article)
    - `description` field which is a string giving a brief description of a given topic
    - `img_url` field which contains a string containing a link to an image representing the topic

# Users

    Each user should have:
    - `username` which is the primary key & unique
    - `name`
    - `avatar_url`

# Articles

    Each article should have:
    - `article_id` which is the primary key
    - `title`
    - `topic` field which references the `slug` in the topics table
    - `author` field that references a user`s primary key (`username`)
    - `body`
    - `created_at` defaults to the current timestamp
    - `votes` defaults to 0
    - `article_img_url`

# Comments

    Each comment should have:
    - `comment_id` which is the primary key
    - `article_id` field that references an article`s primary key
    - `body`
    - `votes` defaults to 0
    - `author` field that references a user`s primary key (`username`)
    - `created_at` defaults to the current timestamp

---

# Order to create tables based on primary keys (PK) and foreign keys (FK):

1. topics //topics contains no foreign keys
2. users //`name` & `username` from Users used within `author` in Articles & Comments
3. articles //`authors` from Articles used within `author` in Comments, `votes` in Articles references `votes` in Comments, `topic` in Articles references `slug` in Topics
4. comments //`author` in Comments references `username` in Users, `topic` in Comments references `slug` in Topics, `votes` in Comments references `votes` in Articles

---

# When creating tables: npm run test-seed

## You should run `npm run test-seed` in terminal regularly to check your progress. Each passing test confirms that a part of your seed function is working as expected. If a test fails, use the error messages to debug your table structure or data insertion.

# When dropping tables:

When dropping tables in seed file, ensure to drop them in reverse order to avoid FK errors. (urghhh)
