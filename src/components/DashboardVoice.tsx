import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Mic, 
  Play, 
  Volume2, 
  Globe, 
  User, 
  Heart,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const DashboardVoices: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [textToConvert, setTextToConvert] = useState("Hello, I'm Benny, your AI assistant. How can I help you today?");
  const [selectedLanguage, setSelectedLanguage] = useState('all-languages');

  const voiceData = [
    {
      language: 'Brazilian Portuguese',
      count: 1,
      voices: [{ name: 'Jennifer', gender: 'Female' }]
    },
    {
      language: 'Canadian English', 
      count: 1,
      voices: [{ name: 'Abraham', gender: 'Male' }]
    },
    {
      language: 'Bulgarian',
      count: 5,
      voices: [{ name: 'Danielle', gender: 'Female' }],
      hasMore: 4
    },
    {
      language: 'British English',
      count: 3,
      voices: [
        { name: 'Samara', gender: 'Female' },
        { name: 'Blondie', gender: 'Female' },
        { name: 'Lucy', gender: 'Female' }
      ]
    },
    {
      language: 'French',
      count: 12,
      voices: [
        { name: 'Felix', gender: 'Male' },
        { name: 'Skel', gender: 'Male' },
        { name: 'Nova', gender: 'Male' }
      ],
      hasMore: 9
    },
    {
      language: 'English',
      count: 22,
      voices: [
        { name: 'Mark', gender: 'Male' },
        { name: 'Sam', gender: 'Male' },
        { name: 'Chris', gender: 'Male' },
        { name: 'Jessica', gender: 'Female' },
        { name: 'Eve', gender: 'Female' },
        { name: 'Adeline', gender: 'Female' },
        { name: 'Juniper', gender: 'Female' },
        { name: 'Hope', gender: 'Female' },
        { name: 'Arabella', gender: 'Female' },
        { name: 'Alexandra', gender: 'Female' },
        { name: 'Ivanna', gender: 'Female' },
        { name: 'Brad', gender: 'Male' },
        { name: 'Brayden', gender: 'Male' },
        { name: 'Andrew', gender: 'Male' },
        { name: 'Adam', gender: 'Male' }
      ],
      hasMore: 7
    },
    {
      language: 'German',
      count: 3,
      voices: [
        { name: 'Ben', gender: 'Male' },
        { name: 'Mark', gender: 'Male' },
        { name: 'Yvonne', gender: 'Female' }
      ]
    },
    {
      language: 'Indian English',
      count: 1,
      voices: [{ name: 'Lucas', gender: 'Male' }]
    },
    {
      language: 'Korean',
      count: 10,
      voices: [{ name: 'Monika', gender: 'Female' }],
      hasMore: 9
    },
    {
      language: 'Nigerian English',
      count: 2,
      voices: [
        { name: 'Ololade', gender: 'Female' },
        { name: 'Bukola', gender: 'Female' }
      ]
    },
    {
      language: 'Spanish',
      count: 5,
      voices: [
        { name: 'Marcela', gender: 'Female' },
        { name: 'Santiago', gender: 'Male' },
        { name: 'Agustin', gender: 'Male' },
        { name: 'Gaby', gender: 'Female' },
        { name: 'Carolina', gender: 'Female' }
      ]
    },
    {
      language: 'Polish',
      count: 9,
      voices: [{ name: 'Alexandre', gender: 'Male' }],
      hasMore: 8
    },
    {
      language: 'Portuguese',
      count: 6,
      voices: [{ name: 'Charlotte', gender: 'Female' }],
      hasMore: 5
    },
    {
      language: 'Swedish',
      count: 1,
      voices: [{ name: 'Archer', gender: 'Male' }]
    },
    {
      language: 'Turkish',
      count: 5,
      voices: [{ name: 'Gozde', gender: 'Female' }],
      hasMore: 4
    }
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Voice Selection</h1>
        <p className="text-muted-foreground mt-1">
          Experiment with different voices for your AI assistant. Generate audio previews and set your preferred default voice.
        </p>
      </div>

      {/* Configure & Generate Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Configure & Generate</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter text and choose a voice model to generate a preview.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Text to Convert</Label>
              <Textarea
                value={textToConvert}
                onChange={(e) => setTextToConvert(e.target.value)}
                className="min-h-20"
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground">Maximum 200 characters.</p>
            </div>

            <div className="space-y-2">
              <Label>Filter by Language</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-languages">All languages</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Voice Model</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Listen to previews before setting your default.
              </p>
              <Button variant="outline" className="w-full justify-between">
                <span>Choose a voice from the list</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Button className="w-full" disabled={!selectedVoice}>
              <Play className="h-4 w-4 mr-2" />
              Generate Voice Preview
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Preview & Details</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select a voice to view details
            </p>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="text-center">
              <Mic className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Select a voice model</h3>
              <p className="text-muted-foreground">
                Choose a voice from the list on the left to see details and generate a preview.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Voice Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Voice Gallery by Language</CardTitle>
          <p className="text-sm text-muted-foreground">
            Explore all available voices grouped by their primary language.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {voiceData.map((languageGroup, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{languageGroup.language}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {languageGroup.count} voice{languageGroup.count !== 1 ? 's' : ''}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {languageGroup.voices.slice(0, 6).map((voice, voiceIndex) => (
                    <div
                      key={voiceIndex}
                      className="flex items-center justify-between p-2 rounded border hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedVoice(`${languageGroup.language}-${voice.name}`)}
                    >
                      <div className="flex items-center gap-2">
                        <User className={`h-4 w-4 ${voice.gender === 'Female' ? 'text-pink-500' : 'text-blue-500'}`} />
                        <span className="text-sm font-medium">{voice.name}</span>
                        <span className="text-xs text-muted-foreground">({voice.gender})</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  
                  {languageGroup.hasMore && (
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs">
                        +{languageGroup.hasMore}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* About Voice Technology */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Volume2 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                About Our Voice Technology
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Leveraging state-of-the-art AI for natural speech synthesis.
              </p>
              
              <p className="text-sm mb-4">
                Our premium voice technology utilizes advanced neural networks to generate exceptionally natural-sounding speech. 
                It captures emotional nuances, appropriate emphasis, and adapts intelligently to various contexts, providing a 
                seamless and engaging auditory experience across multiple languages.
              </p>
              
              <div>
                <h4 className="font-semibold mb-2">Key Capabilities:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Create engaging audio content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-blue-500" />
                    <span>Personalize your brand's voice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-green-500" />
                    <span>Build accessible voice interfaces</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-purple-500" />
                    <span>Support 30+ languages fluently</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-orange-500" />
                    <span>Reach global audiences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-pink-500" />
                    <span>Natural emotional expression</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
