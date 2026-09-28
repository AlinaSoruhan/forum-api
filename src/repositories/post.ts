import type { IPost, CreatePostDto } from '../dto/post.dto.js';

const posts: IPost[] = [
  { id: 1, title: 'Learn JS', content: 'JS is awesome', author: 'Alex', category: 'programming' },
  { id: 2, title: 'Learn Node.js', content: 'Node.js is powerful', author: 'John', category: 'programming' },
  { id: 3, title: 'My Vacation', content: 'Had a great time at the beach', author: 'Emma', category: 'travel' }
];

export const postRepository = {
  getAll(category?: string, take?: number): IPost[] {
    let filteredPosts = [...posts];

    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    if (take) {
      filteredPosts = filteredPosts.slice(0, take);
    }

    return filteredPosts;
  },

  getById(id: number): IPost | undefined {
    return posts.find(post => post.id === id);
  },

  addPost(postData: CreatePostDto): Promise<IPost> {
    return new Promise((resolve) => {
      const newPost: IPost = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        ...postData
      };
      posts.push(newPost);
      resolve(newPost);
    });
  }
};
