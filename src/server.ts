import express from 'express';

import { createPostRepository } from './domain/post/repository.js';
import { createPostService } from './domain/post/service.js';
import { createPostHandler } from './domain/post/handler.js';
import { createPostRouter } from './domain/post/router.js';

const app = express();
app.use(express.json());


const postRepository = createPostRepository();
const postService = createPostService(postRepository);
const postHandler = createPostHandler(postService);     
const postRouter = createPostRouter(postHandler);       

app.use('/api/posts', postRouter);

const PORT = 6767;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
