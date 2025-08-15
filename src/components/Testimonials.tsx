import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    title: 'Owner, Maple Dental Clinic',
    location: 'Toronto, ON',
    rating: 5,
    text: 'CallAgent Pro has transformed our appointment booking. We never miss calls anymore, and our patients love the professional service. Highly recommended!',
  },
  {
    name: 'Mike Thompson',
    title: 'Manager, Thompson Plumbing',
    location: 'Vancouver, BC',
    rating: 5,
    text: 'The 24/7 coverage is a game-changer. Emergency calls are handled professionally even when we\'re not available. Our customers appreciate the quick response.',
  },
  {
    name: 'Lisa Rodriguez',
    title: 'Director, Summit Legal Services',
    location: 'Calgary, AB',
    rating: 5,
    text: 'The AI understands our business perfectly. It schedules consultations, answers FAQs, and maintains our professional image. Worth every penny.',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Trusted by Canadian
            <br />
            <span className="text-primary">Businesses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what our customers across Canada are saying about CallAgent Pro.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-warning fill-current" />
                  ))}
                </div>
                
                <p className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  <p className="text-sm text-primary">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};