import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Search, Phone, Clock, Calendar, Zap, Shield, MessageSquare } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  initialSearchQuery?: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ 
  isOpen, 
  onClose, 
  onComplete,
  initialSearchQuery = '' 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessSearch: initialSearchQuery,
    selectedBusiness: '',
    selectedVoice: '',
    callHandling: '',
    callSchedule: '',
    name: '',
    phone: '',
    email: '',
    termsAccepted: false,
    selectedPlan: '',
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const businessResults = [
    { id: '1', name: 'Maple Dental Clinic', address: '123 Main St, Toronto, ON', verified: true },
    { id: '2', name: 'Maple Medical Center', address: '456 Queen St, Toronto, ON', verified: false },
  ];

  const voices = [
    { id: 'sarah', name: 'Sarah - Professional', description: 'Warm and professional voice perfect for business' },
    { id: 'alex', name: 'Alex - Friendly', description: 'Casual and approachable voice for service businesses' },
  ];

  const callHandlingOptions = [
    { id: 'basic', title: 'Basic Voice Replacement', description: 'Handle basic inquiries and take messages', icon: Phone },
    { id: 'scheduling', title: 'Appointment Scheduling', description: 'Book appointments and manage calendar', icon: Calendar },
    { id: 'faq', title: 'FAQ Answering', description: 'Answer common questions about your business', icon: MessageSquare },
  ];

  const scheduleOptions = [
    { id: 'business', title: 'Business Hours Only', description: 'Monday-Friday, 9 AM - 5 PM', icon: Clock },
    { id: '24/7', title: '24/7 Coverage', description: 'Round-the-clock availability', icon: Zap },
    { id: 'custom', title: 'Custom Schedule', description: 'Set your own availability hours', icon: Shield },
  ];

  const plans = [
    { id: 'starter', name: 'Starter', price: '$29/month', features: ['100 calls/month', 'Basic handling'] },
    { id: 'professional', name: 'Professional', price: '$79/month', features: ['500 calls/month', 'Advanced AI'], popular: true },
    { id: 'enterprise', name: 'Enterprise', price: '$199/month', features: ['Unlimited calls', 'Custom training'] },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="business-search" className="text-base font-medium">Search for your business</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="business-search"
                  placeholder="Enter your business name"
                  value={formData.businessSearch}
                  onChange={(e) => updateFormData('businessSearch', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {formData.businessSearch && (
              <div className="space-y-3">
                <Label className="text-base font-medium">Select your business</Label>
                {businessResults.map((business) => (
                  <Card 
                    key={business.id} 
                    className={`cursor-pointer transition-all ${
                      formData.selectedBusiness === business.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                    }`}
                    onClick={() => updateFormData('selectedBusiness', business.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{business.name}</h4>
                          <p className="text-sm text-muted-foreground">{business.address}</p>
                        </div>
                        {business.verified && (
                          <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs">
                            Verified
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {formData.selectedBusiness && (
              <div className="space-y-4">
                <Button variant="cta" className="w-full">Train Benny</Button>
                <div className="space-y-3">
                  <Label className="text-base font-medium">Choose your voice</Label>
                  {voices.map((voice) => (
                    <Card 
                      key={voice.id}
                      className={`cursor-pointer transition-all ${
                        formData.selectedVoice === voice.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                      }`}
                      onClick={() => updateFormData('selectedVoice', voice.id)}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{voice.name}</h4>
                        <p className="text-sm text-muted-foreground">{voice.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">How should Benny handle your calls?</h3>
              <p className="text-muted-foreground">Choose the primary way you'd like your AI agent to assist</p>
            </div>
            
            <div className="space-y-4">
              {callHandlingOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Card 
                    key={option.id}
                    className={`cursor-pointer transition-all ${
                      formData.callHandling === option.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                    }`}
                    onClick={() => updateFormData('callHandling', option.id)}
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">{option.title}</h4>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">When should Benny answer your calls?</h3>
              <p className="text-muted-foreground">Set your availability preferences</p>
            </div>
            
            <div className="space-y-4">
              {scheduleOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Card 
                    key={option.id}
                    className={`cursor-pointer transition-all ${
                      formData.callSchedule === option.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                    }`}
                    onClick={() => updateFormData('callSchedule', option.id)}
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">{option.title}</h4>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
              <p className="text-muted-foreground">We'll need these details to set up your account</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="you@company.com"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => updateFormData('termsAccepted', checked)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Select Your Plan</h3>
              <p className="text-muted-foreground">Choose the plan that best fits your business needs</p>
            </div>
            
            <div className="space-y-4">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all relative ${
                    formData.selectedPlan === plan.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                  }`}
                  onClick={() => updateFormData('selectedPlan', plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-lg">{plan.name}</h4>
                      <span className="font-bold text-lg">{plan.price}</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
              <p className="text-muted-foreground">You're almost ready to get started!</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Choose a username"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                />
              </div>
              
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Setup Summary</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Business: {businessResults.find(b => b.id === formData.selectedBusiness)?.name}</li>
                <li>• Voice: {voices.find(v => v.id === formData.selectedVoice)?.name}</li>
                <li>• Plan: {plans.find(p => p.id === formData.selectedPlan)?.name}</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedBusiness && formData.selectedVoice;
      case 2:
        return formData.callHandling;
      case 3:
        return formData.callSchedule;
      case 4:
        return formData.name && formData.phone && formData.email && formData.termsAccepted;
      case 5:
        return formData.selectedPlan;
      case 6:
        return true;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to CallAgent Pro
          </DialogTitle>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </DialogHeader>
        
        <div className="py-6">
          {renderStep()}
        </div>
        
        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            variant={currentStep === totalSteps ? "cta" : "default"}
          >
            {currentStep === totalSteps ? 'Complete Setup' : 'Next'}
            {currentStep < totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};