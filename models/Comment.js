class Comment {
  constructor(postId, text, author) {
    this.id = null;
    this.postId = postId;
    this.text = text;
    this.author = author;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Comment;
