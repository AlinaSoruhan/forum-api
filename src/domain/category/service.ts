interface CategoryRepository {
  findAll(): Promise<unknown[]>;
  findById(id: string): Promise<unknown | null>;
  findByName(name: string): Promise<unknown | null>;
  create(data: { name: string }): Promise<unknown>;
}

export function createCategoryService(categoryRepo: CategoryRepository) {
  async function getAllCategories() {
    return categoryRepo.findAll();
  }

  async function getCategoryById(id: string) {
    const category = await categoryRepo.findById(id);
    

    if (!category) {
      throw { status: 404, message: 'не знайдено Post або Category' };
    }
    return category;
  }

  async function createCategory(data: { name: string }) {
    const exists = await categoryRepo.findByName(data.name);
  
    if (exists) {
      throw { status: 409, message: 'повторна назва Category' };
    }
    return categoryRepo.create(data);
  }

  return {
    getAllCategories,
    getCategoryById,
    createCategory,
  };
}
