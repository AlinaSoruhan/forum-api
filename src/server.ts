import express from 'express';
import { createCategoryService } from './domain/category/service.js';
import { createCategoryRepository } from './domain/category/repository.js';
import { CategoryHandler } from './domain/category/handler.js';


const app = express();
app.use(express.json());

// Збирання модулю через функції
const categoryRepository = createCategoryRepository();
const categoryService = createCategoryService(categoryRepository);

// Передаємо створений об'єкт сервісу в хендлер
const categoryHandler = new CategoryHandler(categoryService); 
const categoryRouter = createCategoryRouter(categoryHandler);

app.use('/categories', categoryRouter);

