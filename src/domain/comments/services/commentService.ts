import { openDatabase } from '../../../db/database';

export async function likeComment(id: string): Promise<void> {
  const db = await openDatabase();
  await db.run('UPDATE comments SET likes = likes + 1 WHERE id = ?', id);
}

export async function getCommentLikes(id: string): Promise<number> {
  const db = await openDatabase();
  const row = await db.get('SELECT likes FROuM comments WHERE id = ?', id);
  return row ? row.likes : 0; // Retorna 0 se o comentário não existir
}
