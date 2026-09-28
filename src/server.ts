import express from 'express';
import postRouter from './transport/routers/post.js';

const app = express();
const PORT = 6767;

app.use(express.json());
app.use(postRouter);

app.listen(PORT, () => {
  console.log(`[TypeScript] Server is running on http://localhost:${PORT}`);
});
