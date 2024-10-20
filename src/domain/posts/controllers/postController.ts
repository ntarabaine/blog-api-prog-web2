import { Request, Response } from 'express';
import { likePost, getPostLikes } from '../services/postService';

export async function likePostById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  await likePost(id);
  const likes = await getPostLikes(id);
  res.json({ likes });
}

export async function getPostLikesById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const likes = await getPostLikes(id);
  res.json({ likes });
}
