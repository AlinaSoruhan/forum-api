import type { Post } from './entity.js';

export interface IPostRepository {
  create(data: { title: string; content?: string }): Promise<Post>;
  getAll(): Promise<Post[]>;
}

class PrismaPostRepository implements IPostRepository {
  constructor(private db: any) {}

  async create(data: { title: string; content?: string }): Promise<Post> {
    const created = await this.db.post.create({
      data: {
        title: data.title,
        content: data.content,
      },
    });
    return created as Post;
  }

  async getAll(): Promise<Post[]> {
    const posts = await this.db.post.findMany();
    return posts as Post[];
  }
}

export const createPostRepository = (db: any): IPostRepository => {
  return new PrismaPostRepository(db);
};
