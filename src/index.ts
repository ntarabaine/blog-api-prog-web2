import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { openDatabase, createTables } from './db/database';

const app = express();
const port = 3000;

app.use(express.json());

createTables();

// rota para obter todas as postagens
app.get('/posts', async (req: Request, res: Response) => {
  const db = await openDatabase();
  const posts = await db.all('SELECT * FROM posts');
  res.json(posts);
});

// rota para obter uma postagem por ID
app.get('/posts/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await openDatabase();
  const post = await db.get('SELECT * FROM posts WHERE id = ?', id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});
// rota para criar uma nova postagem
app.post('/posts', async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const id = uuidv4();
  const db = await openDatabase();
  await db.run('INSERT INTO posts (id, title, content) VALUES (?, ?, ?)', [id, title, content]);
  res.status(201).json({ id, title, content });
});

// rota para adicionar um comentário a uma postagem
app.post('/posts/:id/comments', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  const commentId = uuidv4();
  const db = await openDatabase();
  const post = await db.get('SELECT * FROM posts WHERE id = ?', id);
  if (post) {
    await db.run('INSERT INTO comments (id, postId, content) VALUES (?, ?, ?)', [commentId, id, content]);
    res.status(201).json({ commentId, postId: id, content });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});
// rota para obter todos os comentários de uma postagem
app.get('/posts/:id/comments', async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await openDatabase();
  const comments = await db.all('SELECT * FROM comments WHERE postId = ?', id);
  res.json(comments);
});

// iniciando o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
