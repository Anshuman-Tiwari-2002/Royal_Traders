export interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export const mockCategories: Category[] = [
  {
    _id: '1',
    name: 'Furniture',
    description: 'Elegant furniture pieces for your home',
    slug: 'furniture',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Lighting',
    description: 'Beautiful lighting solutions for every room',
    slug: 'lighting',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    name: 'Decor',
    description: 'Stylish decorative items to enhance your space',
    slug: 'decor',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '4',
    name: 'Kitchen & Dining',
    description: 'Everything you need for your kitchen and dining area',
    slug: 'kitchen-dining',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '5',
    name: 'Bathroom',
    description: 'Luxury bathroom fixtures and accessories',
    slug: 'bathroom',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '6',
    name: 'Outdoor',
    description: 'Outdoor furniture and accessories for your garden',
    slug: 'outdoor',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]; 