import { openDatabase } from '../../../db/database';

export async function likePost(id: string): Promise<void> {
  const db = await openDatabase();
  await db.run('UPDATE posts SET likes = likes + 1 WHERE id = ?', id);
}

export async function getPostLikes(id: string): Promise<number> {
  const db = await openDatabase();
  const row = await db.get('SELECT likes FROM posts WHERE id = ?', id);
  return row ? row.likes : 0; // Retorna 0 se o post não existir
}