import { Router } from 'express';
import type { PostHandler } from './handler.js';

export function createPostRouter(postHandler: PostHandler): Router {
  const router = Router();

  router.get('/', postHandler.getAll);
  router.post('/', postHandler.create);

  return router;
}
