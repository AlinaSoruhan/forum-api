import express from 'express';

// Виправлено імпорт: додано правильний шлях до файлу та імпортовано фабрику замість типу
import { createPostRepository } from './domain/post/repository.js';
import { createPostService } from './domain/post/service.js';
import { createPostHandler } from './domain/post/handler.js';
import { createPostRouter } from './domain/post/router.js';

class MockPrismaClient {
  post = {
    create: async (args: any) => ({
      id: Math.floor(Math.random() * 1000),
      title: args.data.title,
      content: args.data.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    findMany: async () => [
      { id: 1, title: 'Перший пост Prisma', content: 'Контент 1' },
      { id: 2, title: 'Другий пост Prisma', content: 'Контент 2' }
    ]
  };
}

const app = express();
app.use(express.json());

const db = new MockPrismaClient();


const postRepository = createPostRepository(db);
const postService = createPostService(postRepository);
const postHandler = createPostHandler(postService);     
const postRouter = createPostRouter(postHandler);       

app.use('/api/posts', postRouter);

const PORT = 6767;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
