import type { NextFunction, Request, Response } from "express";

interface CategoryService {
  getAllCategories(): Promise<unknown>;
  getCategoryById(id: string): Promise<unknown>;
  createCategory(category: { name: string }): Promise<unknown>;
}

export class CategoryHandler {
  constructor(private categoryService: CategoryService) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.json(categories);
    } catch (err) { next(err); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      if (typeof id !== 'string' || !id || id.trim() === '') {
        return res.status(400).json({ error: 'некоректний id або categoryId' });
      }
      
      const category = await this.categoryService.getCategoryById(id);
      res.json(category);
    } catch (err) { 
      next(err); 
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(422).json({ 
          error: 'Unprocessable Entity', 
          message: 'недопустимі поля' 
        });
      }
      
      const newCategory = await this.categoryService.createCategory({ name: name.trim() });
      res.status(201).json(newCategory);
    } catch (err) { 
  
      next(err); 
    }
  }
}
