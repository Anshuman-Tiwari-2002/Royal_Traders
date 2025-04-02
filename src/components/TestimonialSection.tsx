
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Interior Designer',
    content: 'The quality of wooden furniture from Royal Traders is exceptional. Each piece showcases incredible craftsmanship that my clients absolutely love.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
  },
  {
    id: 2,
    name: 'Michael Williams',
    role: 'Homeowner',
    content: 'I purchased a dining table set last month, and I could not be happier with my decision. The attention to detail and solid construction are remarkable.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Architect',
    content: 'As someone who appreciates fine craftsmanship, I'm thoroughly impressed with Royal Traders. Their wooden products are both beautiful and functional.',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Restaurant Owner',
    content: 'The custom tables we ordered for our restaurant receive compliments daily. Royal Traders delivered exactly what we needed and on time.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-wood-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold text-wood-800 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their experience with Royal Traders.
          </p>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2">
                <Card className="border-0 shadow-md h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-wood-800">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 flex-grow">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="mr-2" />
            <CarouselNext className="ml-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;
