import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import featureAutomation from '@/assets/feature-automation.jpg';
import featureAvailability from '@/assets/feature-availability.jpg';
import featureScheduling from '@/assets/feature-scheduling.jpg';
import featureAnalytics from '@/assets/feature-analytics.jpg';

const features = [
  {
    title: 'AI-Powered Call Handling',
    description: 'Smart automation that understands your business and customers, providing natural conversations.',
    image: featureAutomation,
  },
  {
    title: '24/7 Availability',
    description: 'Never miss a call again. Your AI agent works around the clock, even when you can\'t.',
    image: featureAvailability,
  },
  {
    title: 'Smart Scheduling',
    description: 'Automatically book appointments, meetings, and consultations directly in your calendar.',
    image: featureScheduling,
  },
  {
    title: 'Business Insights',
    description: 'Get detailed analytics and insights about your calls, customers, and business performance.',
    image: featureAnalytics,
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need for
            <br />
            <span className="text-primary">Professional Call Management</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI agent seamlessly integrates with your business, providing intelligent call handling 
            that feels natural and professional.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="mb-6 mx-auto w-20 h-20 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};