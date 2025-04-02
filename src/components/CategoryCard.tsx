
import { Link } from 'react-router-dom';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/shop?category=${category.name.toLowerCase()}`} className="block group">
      <div className="relative overflow-hidden rounded-lg h-60">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <h3 className="text-white text-xl font-serif font-semibold">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
