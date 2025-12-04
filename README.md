# NC News Seeding

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

   ```
   PGDATABASE=nc_news_test
   ```

   - for `.env.development`- populate the file with the below for development-database

   ```
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

- If you see a prompt without errors, your connection is successful.
