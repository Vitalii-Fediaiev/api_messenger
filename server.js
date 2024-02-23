const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Парсинг тела запроса в формате JSON
app.use(bodyParser.json());

// Примеры данных для хранения пользователей, постов и комментариев
let users = [];
let posts = [];
let comments = [];

// Роут для регистрации нового пользователя
app.post('/api/users', (req, res) => {
    const { username, email } = req.body;
    const newUser = { id: users.length + 1, username, email };
    users.push(newUser);
    res.json(newUser);
});

// Роут для создания нового поста
app.post('/api/posts', (req, res) => {
    const { userId, content } = req.body;
    const newPost = { id: posts.length + 1, userId, content };
    posts.push(newPost);
    res.json(newPost);
});

// Роут для создания нового комментария
app.post('/api/comments', (req, res) => {
    const { userId, postId, content } = req.body;
    const newComment = { id: comments.length + 1, userId, postId, content };
    comments.push(newComment);
    res.json(newComment);
});

// Роут для удаления поста
app.delete('/api/posts/:postId', (req, res) => {
    const postId = parseInt(req.params.postId);
    posts = posts.filter(post => post.id !== postId);
    res.json({ message: 'Post deleted successfully' });
});

// Роут для удаления комментария
app.delete('/api/comments/:commentId', (req, res) => {
    const commentId = parseInt(req.params.commentId);
    comments = comments.filter(comment => comment.id !== commentId);
    res.json({ message: 'Comment deleted successfully' });
});

app.get ("/", (req, res) => {
  res.json({ msg: "Hello" })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
