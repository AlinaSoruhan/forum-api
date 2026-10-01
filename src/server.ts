import express from 'express';

import { createPostRepository } from './domain/post/repository.js';
import { createPostService } from './domain/post/service.js';
import { createPostHandler } from './domain/post/handler.js';
import { createPostRouter } from './domain/post/router.js';

const app = express();
app.use(express.json());

// 9. COMPOSITION ROOT (Сборка зависимостей)
const postRepository = createPostRepository();
const postService = createPostService(postRepository); // передали репозиторий
const postHandler = createPostHandler(postService);       // передали сервис
const postRouter = createPostRouter(postHandler);         // передали хендлеры

// Подключаем готовый роутер к Express
app.use('/api/posts', postRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
