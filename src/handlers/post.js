import { postService } from '../services/post.js';

export const postHandler = {
  getPosts(req, res) {
    const { category, take } = req.query;
    
    if (take && (isNaN(take) || parseInt(take, 10) <= 0)) {
      return res.status(400).json({ error: 'Query parameter "take" must be a positive number' });
    }

    const posts = postService.getPosts(category, take);
    return res.status(200).json(posts);
  },

  getPostById(req, res) {
    const { id } = req.params;
    const post = postService.getPostById(id);

    if (!post) {
      return res.status(404).json({ error: `Post with id ${id} not found` });
    }

    return res.status(200).json(post);
  },

  async createPost(req, res) {
    const { title, content, author, category } = req.body;

    if (!title || !content || !author || !category) {
      return res.status(422).json({ 
        error: 'Validation failed. Fields "title", "content", "author", and "category" are required.' 
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
