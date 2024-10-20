import { Router } from 'express';
import { likePostById, getPostLikesById } from '../controllers/postController';

const router = Router();

// Rota para adicionar um like a uma postagem
router.post('/:id/like', likePostById);

// Rota para obter o número de likes de uma postagem
router.get('/:id/likes', getPostLikesById);

export default router;
