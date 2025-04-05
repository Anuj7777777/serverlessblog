class Post {
  constructor(title, content, author) {
    this.id = null;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Post;
