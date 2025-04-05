import { useState } from 'react';
import { toast } from 'sonner';
import { X } from 'lucide-react';

interface NewsletterSignupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterSignup = ({ isOpen, onClose }: NewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsSubmitting(true);
      // TODO: Implement newsletter signup API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
      onClose();
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-wood-800 text-white rounded-lg p-8 md:p-12">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-serif mb-4">
          Join Our Newsletter
        </h3>
        <p className="text-white/80 mb-6">
          Subscribe to receive updates about new collections, special offers, and wooden furniture care tips.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-wood-600 text-white rounded-lg font-medium hover:bg-wood-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        <p className="text-sm text-white/60 mt-4">
          By subscribing, you agree to receive marketing communications from Royal Traders.
          You can unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}; 