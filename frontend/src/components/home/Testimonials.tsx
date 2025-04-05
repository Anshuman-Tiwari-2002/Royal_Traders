import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Interior Designer',
    content: 'The quality of Royal Traders\' wooden furniture is exceptional. Each piece tells a story of craftsmanship and attention to detail.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Home Owner',
    content: 'I furnished my entire living room with pieces from Royal Traders. The durability and beauty of their products is unmatched.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Architect',
    content: 'As an architect, I appreciate the perfect blend of form and function in Royal Traders\' furniture. My clients are always impressed.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export const Testimonials = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
          <div className="flex gap-0.5 mb-3">
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="text-gray-600">{testimonial.content}</p>
        </div>
      ))}
    </div>
  );
}; 