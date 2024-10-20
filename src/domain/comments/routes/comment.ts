import { Router } from 'express';
import { likeCommentById, getCommentLikesById } from '../controllers/commentController';

const router = Router();

// Rota para adicionar um like a um comentário
router.post('/:id/like', likeCommentById);

// Rota para obter o número de likes de um comentário
router.get('/:id/likes', getCommentLikesById);

export default router;
