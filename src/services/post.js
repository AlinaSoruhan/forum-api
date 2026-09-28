import { postRepository } from '../repositories/post.js';

export const postService = {
  getPosts(category, take) {
    return postRepository.getAll(category, take);
  },

  getPostById(id) {
    return postRepository.getById(id);
  },

  async createPost(postData) {
    return await postRepository.addPost(postData);
  }
};
