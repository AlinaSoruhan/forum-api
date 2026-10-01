import type{ Request, Response, NextFunction } from 'express';
import type { PostService } from './service.js';
import type { CreatePostDTO } from './entity.js';

export interface PostHandler {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
}


export function createPostHandler(postService: PostService): PostHandler {
  return {
    async getAll(req: Request, res: Response, next: NextFunction) {
      try {
        const posts = await postService.findAll();
        res.json(posts);
      } catch (error) {
        next(error);
      }
    },
    async create(req: Request, res: Response, next: NextFunction) {
      try {
        // Явная типизация входящих данных через DTO
        const dto: CreatePostDTO = req.body;
        
        const newPost = await postService.create(dto);
        res.status(201).json(newPost);
      } catch (error) {
        next(error);
      }
    },
  };
}
