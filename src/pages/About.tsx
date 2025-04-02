
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-semibold text-wood-800 mb-4">Our Story</h1>
          <Separator className="mx-auto w-24 mb-6 bg-wood-400" />
          <p className="text-gray-600">
            Crafting excellence in wood since 2005
          </p>
        </div>

        {/* Hero image */}
        <div className="mb-12 overflow-hidden rounded-lg">
          <img 
            src="https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80" 
            alt="Woodworkers at Royal Traders workshop" 
            className="w-full h-auto"
          />
        </div>

        {/* Content sections */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-serif font-medium text-wood-800 mb-4">Our Humble Beginnings</h2>
            <p className="text-gray-600 mb-4">
              Royal Traders began as a small family workshop in 2005, founded by master craftsman Robert Williams. 
              What started as a passion project in a modest garage has grown into one of the most respected wooden 
              furniture and home décor manufacturers in the region.
            </p>
            <p className="text-gray-600">
              Our commitment to quality and traditional woodworking techniques, combined with innovative designs, 
              quickly established our reputation for excellence. Year by year, our customer base grew through 
              word-of-mouth as clients experienced the difference that true craftsmanship makes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-medium text-wood-800 mb-4">Our Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-wood-50 p-6 rounded-lg">
                <h3 className="font-medium text-wood-800 mb-2">Sustainability</h3>
                <p className="text-gray-600 text-sm">
                  We believe in responsible sourcing and ensuring our practices contribute to forest conservation rather than depletion.
                </p>
              </div>
              <div className="bg-wood-50 p-6 rounded-lg">
                <h3 className="font-medium text-wood-800 mb-2">Craftsmanship</h3>
                <p className="text-gray-600 text-sm">
                  Every piece we create is a testament to the skill of our artisans and their dedication to perfection.
                </p>
              </div>
              <div className="bg-wood-50 p-6 rounded-lg">
                <h3 className="font-medium text-wood-800 mb-2">Longevity</h3>
                <p className="text-gray-600 text-sm">
                  We design and build products that are meant to last generations, not seasons.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-medium text-wood-800 mb-4">Our Workshop</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <p className="text-gray-600 mb-4">
                  Today, Royal Traders operates from a 15,000 square foot workshop equipped with both traditional 
                  woodworking tools and state-of-the-art technology. This blend allows us to honor time-tested 
                  techniques while meeting modern production demands.
                </p>
                <p className="text-gray-600">
                  Our team of 25 skilled artisans brings diverse expertise in woodworking, from intricate carving 
                  to precision joinery. Many of our craftspeople have been with us for over a decade, allowing us 
                  to maintain consistent quality and pass along traditional skills to the next generation.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3024&q=80" 
                  alt="Wood workshop" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-medium text-wood-800 mb-4">Our Commitment to Quality</h2>
            <p className="text-gray-600 mb-4">
              At Royal Traders, quality isn't just a buzzword—it's the foundation of everything we do. From 
              selecting the finest materials to applying traditional finishing techniques, we ensure each 
              product meets our exacting standards before it leaves our workshop.
            </p>
            <p className="text-gray-600">
              We stand behind our work with pride, offering guarantees on our craftsmanship that reflect our 
              confidence in the durability and quality of our products. When you choose Royal Traders, you're 
              not just buying furniture; you're investing in pieces that will become part of your family's story.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
