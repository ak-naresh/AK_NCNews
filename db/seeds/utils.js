function mapArticleTitleToId(comments, articles) {
  //lookup from article.title to article_id
  const titleToId = {};

  for (let i = 0; i < articles.length; i++) {
    titleToId[articles[i].title] = articles[i].article_id;
  }

  //map comment from article_title to  article_id
  const mappedComment = [];
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    mappedComment.push({
      article_id: titleToId[comment.article_title], //default to undefined if no match found
      body: comment.body,
      votes: comment.votes,
      author: comment.author,
      created_at: comment.created_at,
    });
  }
  return mappedComment;
}

module.exports = mapArticleTitleToId;
