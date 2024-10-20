import { Request, Response } from 'express';
import { likeComment, getCommentLikes } from '../services/commentService';

export async function likeCommentById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  await likeComment(id);
  const likes = await getCommentLikes(id);
  res.json({ likes });
}

export async function getCommentLikesById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const likes = await getCommentLikes(id);
  res.json({ likes });
}
