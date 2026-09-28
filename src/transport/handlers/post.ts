import type { Request, Response } from 'express';
import { postService } from '../../services/post.js';
import type { CreatePostDto, GetPostsQueryDto } from '../../dto/post.dto.js';

export const postHandler = {
  getPosts(req: Request<{}, {}, {}, GetPostsQueryDto>, res: Response): Response {
    const { category, take } = req.query;
    let parsedTake: number | undefined;

    if (take) {
      parsedTake = parseInt(take, 10);
      if (isNaN(parsedTake) || parsedTake <= 0) {
        return res.status(400).json({ error: 'take must be a positive number' });
      }
    }

    const posts = postService.getPosts(category, parsedTake);
    return res.status(200).json(posts);
  },

  getPostById(req: Request<{ id: string }>, res: Response): Response {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const post = postService.getPostById(id);
    if (!post) {
      return res.status(404).json({ error: `Post with id ${id} not found` });
    }

    return res.status(200).json(post);
  },

  async createPost(req: Request<{}, {}, CreatePostDto>, res: Response): Promise<Response> {
    const { title, content, author, category } = req.body;

    if (!title || !content || !author || !category) {
      return res.status(422).json({ 
        error: 'Validation failed.' 
      });
    }

    try {
      const newPost = await postService.createPost({ title, content, author, category });
      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
