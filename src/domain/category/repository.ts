// Імпортуємо ваш інстанс Prisma
import { prisma } from '../../../../src/prisma/db'; 

export function createCategoryRepository() {
  async function findAll() {
    return prisma.category.findMany();
  }

  async function findById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  }

  async function findByName(name: string) {
    return prisma.category.findUnique({ where: { name } });
  }

  async function create(data: { name: string }) {
    return prisma.category.create({ data });
  }

  return {
    findAll,
    findById,
    findByName,
    create,
  };
}
