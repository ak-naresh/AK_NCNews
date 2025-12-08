const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("seed", () => {
  describe("topics table", () => {
    test("topics table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'topics'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });

    //1
    test("topics table has slug column as varying character", () => {
      return db
        .query(
          `SELECT *
            FROM information_schema.columns
            WHERE table_name = 'topics'
            AND column_name = 'slug';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("slug");
          expect(column.data_type).toBe("character varying");
        });
    });

    //2
    test("topics table has slug column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'topics';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("slug");
        });
    });

    //3
    test("topics table has description column as varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'topics'
            AND column_name = 'description';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("description");
          expect(column.data_type).toBe("character varying");
        });
    });

    //4
    test("topics table has img_url column of varying character of max length 1000", () => {
      return db
        .query(
          `SELECT column_name, data_type, character_maximum_length
            FROM information_schema.columns
            WHERE table_name = 'topics'
            AND column_name = 'img_url';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("img_url");
          expect(column.data_type).toBe("character varying");
          expect(column.character_maximum_length).toBe(1000);
        });
    });
  });

  describe("users table", () => {
    //1
    test("users table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'users'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });

    //2
    test("users table has username column of varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'username';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("username");
          expect(column.data_type).toBe("character varying");
        });
    });

    //3
    test("users table has username column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'users';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("username");
        });
    });

    //4
    test("users table has name column as varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'name';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("name");
          expect(column.data_type).toBe("character varying");
        });
    });

    //5
    test("users table has avatar_url column of varying character of max length 1000", () => {
      return db
        .query(
          `SELECT column_name, character_maximum_length
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'avatar_url';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("avatar_url");
          expect(column.character_maximum_length).toBe(1000);
        });
    });
  });

  describe("articles table", () => {
    //1
    test("articles table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'articles'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });

    //2
    test("articles table has article_id column as a serial", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'articles'
            AND column_name = 'article_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("article_id");
          expect(column.data_type).toBe("integer");
          expect(column.column_default).toBe(
            "nextval('articles_article_id_seq'::regclass)"
          );
        });
    });

    //3
    test("articles table has article_id column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'articles';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("article_id");
        });
    });

    //4
    test("articles table has title column as varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'articles'
            AND column_name = 'title';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("title");
          expect(column.data_type).toBe("character varying");
        });
    });

    //5
    test("articles table has topic column as varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'articles'
            AND column_name = 'topic';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("topic");
          expect(column.data_type).toBe("character varying");
        });
    });

    //6
    test("topic column references a slug from the topics table", () => {
      return db
        .query(
          `
        SELECT *
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = 'articles'
          AND kcu.column_name = 'topic'
          AND ccu.table_name = 'topics'
          AND ccu.column_name = 'slug';
      `
        )
        .then(({ rows }) => {
          expect(rows).toHaveLength(1);
        });
    });

    //7
    test("articles table has author column as varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'articles'
            AND column_name = 'author';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("author");
          expect(column.data_type).toBe("character varying");
        });
    });

    //8
    test("author column references a username from the users table", () => {
      return db
        .query(
          `
        SELECT *
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = 'articles'
          AND kcu.column_name = 'author'
          AND ccu.table_name = 'users'
          AND ccu.column_name = 'username';
      `
        )
        .then(({ rows }) => {
          expect(rows).toHaveLength(1);
        });
    });

    //9
    test("articles table has body column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type, character_maximum_length
              FROM information_schema.columns
              WHERE table_name = 'articles'
              AND column_name = 'body';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("body");
          expect(column.data_type).toBe("text");
        });
    });

    //10
    test("articles table has created_at column as timestamp", () => {
      return db
        .query(
          `SELECT column_name, data_type
              FROM information_schema.columns
              WHERE table_name = 'articles'
              AND column_name = 'created_at';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("created_at");
          expect(column.data_type).toBe("timestamp without time zone");
        });
    });

    //11
    test("created_at column has default value of the current timestamp", () => {
      return db
        .query(
          `SELECT column_default
        FROM information_schema.columns
        WHERE table_name = 'articles'
        AND column_name = 'created_at';`
        )
        .then(({ rows: [{ column_default }] }) => {
          expect(column_default).toBe("CURRENT_TIMESTAMP");
        });
    });

    //12
    test("articles table has votes column as integer", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'articles'
            AND column_name = 'votes';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("votes");
          expect(column.data_type).toBe("integer");
        });
    });

    //13
    test("votes column has default value of 0", () => {
      return db
        .query(
          `SELECT column_default
          FROM information_schema.columns
          WHERE table_name = 'articles'
          AND column_name = 'votes'`
        )
        .then(({ rows: [{ column_default }] }) => {
          expect(column_default).toBe("0");
        });
    });

    //14
    test("articles table has article_img_url column of varying character of max length 1000", () => {
      return db
        .query(
          `SELECT column_name, data_type, character_maximum_length
            FROM information_schema.columns
            WHERE table_name = 'articles'
            AND column_name = 'article_img_url';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("article_img_url");
          expect(column.data_type).toBe("character varying");
          expect(column.character_maximum_length).toBe(1000);
        });
    });
  });

  describe("comments table", () => {
    //1
    test("comments table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'comments'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });

    //2
    test("comments table has comment_id column as serial", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'comments'
            AND column_name = 'comment_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("comment_id");
          expect(column.data_type).toBe("integer");
          expect(column.column_default).toBe(
            "nextval('comments_comment_id_seq'::regclass)"
          );
        });
    });

    //3
    test("comments table has comment_id column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'comments';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("comment_id");
        });
    });

    //4
    test("comments table has article_id column as integer", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'comments'
            AND column_name = 'article_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("article_id");
          expect(column.data_type).toBe("integer");
        });
    });

    //5
    test("article_id column references an article from the articles table", () => {
      return db
        .query(
          `
        SELECT *
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = 'comments'
          AND kcu.column_name = 'article_id'
          AND ccu.table_name = 'articles'
          AND ccu.column_name = 'article_id';
      `
        )
        .then(({ rows }) => {
          expect(rows).toHaveLength(1);
        });
    });

    //6
    test("comments table has body column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'comments'
            AND column_name = 'body';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("body");
          expect(column.data_type).toBe("text");
        });
    });

    //7
    test("comments table has votes column as integer", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'comments'
            AND column_name = 'votes';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("votes");
          expect(column.data_type).toBe("integer");
        });
    });

    //8
    test("votes column has default value of 0", () => {
      return db
        .query(
          `SELECT column_default
          FROM information_schema.columns
          WHERE table_name = 'comments'
          AND column_name = 'votes'`
        )
        .then(({ rows: [{ column_default }] }) => {
          expect(column_default).toBe("0");
        });
    });

    //9
    test("comments table has an author column as varying character", () => {
      return db
        .query(
          `SELECT *
            FROM information_schema.columns
            WHERE table_name = 'comments'
            AND column_name = 'author';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("author");
          expect(column.data_type).toBe("character varying");
        });
    });

    //10
    test("author column references a username from the users table", () => {
      return db
        .query(
          `
        SELECT *
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = 'comments'
          AND kcu.column_name = 'author'
          AND ccu.table_name = 'users'
          AND ccu.column_name = 'username';
      `
        )
        .then(({ rows }) => {
          expect(rows).toHaveLength(1);
        });
    });

    //11
    test("comments table has created_at column as timestamp", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'comments'
            AND column_name = 'created_at';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("created_at");
          expect(column.data_type).toBe("timestamp without time zone");
        });
    });

    //12
    test("created_at column has default value of the current timestamp", () => {
      return db
        .query(
          `SELECT column_default
        FROM information_schema.columns
        WHERE table_name = 'comments'
        AND column_name = 'created_at';`
        )
        .then(({ rows: [{ column_default }] }) => {
          expect(column_default).toBe("CURRENT_TIMESTAMP");
        });
    });
  });
});

describe("data insertion", () => {
  //1
  test("topics data has been inserted correctly", () => {
    return db.query(`SELECT * FROM topics;`).then(({ rows: topics }) => {
      expect(topics).toHaveLength(3);
      topics.forEach((topic) => {
        expect(topic).toHaveProperty("slug");
        expect(topic).toHaveProperty("description");
        expect(topic).toHaveProperty("img_url");
      });
    });
  });

  //2
  test("users data has been inserted correctly", () => {
    return db.query(`SELECT * FROM users;`).then(({ rows: users }) => {
      expect(users).toHaveLength(4);
      users.forEach((user) => {
        expect(user).toHaveProperty("username");
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("avatar_url");
      });
    });
  });

  //3
  test("articles data has been inserted correctly", () => {
    return db.query(`SELECT * FROM articles;`).then(({ rows: articles }) => {
      expect(articles).toHaveLength(13);
      articles.forEach((article) => {
        expect(article).toHaveProperty("article_id");
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("body");
        expect(article).toHaveProperty("created_at");
        expect(article).toHaveProperty("votes");
        expect(article).toHaveProperty("article_img_url");
      });
    });
  });

  //4
  test("comments data has been inserted correctly", () => {
    return db.query(`SELECT * FROM comments;`).then(({ rows: comments }) => {
      expect(comments).toHaveLength(18);
      comments.forEach((comment) => {
        expect(comment).toHaveProperty("comment_id");
        expect(comment).toHaveProperty("body");
        expect(comment).toHaveProperty("article_id");
        expect(comment).toHaveProperty("author");
        expect(comment).toHaveProperty("votes");
        expect(comment).toHaveProperty("created_at");
      });
    });
  });
});
