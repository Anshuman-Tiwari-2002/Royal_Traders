import { api } from '@/services/api';

export interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export const categoryService = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response;
  },

  // Get a single category
  getCategory: async (id: string): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response;
  },

  // Get category by slug
  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const response = await api.get(`/categories/slug/${slug}`);
    return response;
  }
}; 