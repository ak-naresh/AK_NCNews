/*
mapCommentTArticleId is needed as FK must reference the PK of another table ie article_id from articles table.

Seed data for comments uses article_title to indicate which article a comment belongs to, but  comments table in database uses article_id as FK instead.

Converted article_title to article_id before inserting comments, for mapping-  otherwise database is not linnking comments correctly to articles.
*/

function mapCommentToArticleId(comments, articles) {
  //Look-up from article.title to article_id
  const titleToId = {};

  for (let i = 0; i < articles.length; i++) {
    titleToId[articles[i].title] = articles[i].article_id;
  }
  //Map comment from article_title to  article_id
  const mappedComment = [];
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    mappedComment.push({
      article_id: titleToId[comment.article_title],
      body: comment.body,
      votes: comment.votes,
      author: comment.author,
      created_at: comment.created_at,
    });
  }
  return mappedComment;
}

module.exports = mapCommentToArticleId;
