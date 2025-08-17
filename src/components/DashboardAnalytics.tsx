import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  PhoneCall, 
  Clock, 
  TrendingUp, 
  Phone
} from 'lucide-react';

export const DashboardAnalytics: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Calls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Calls</p>
                <p className="text-4xl font-bold mb-1">0</p>
                <p className="text-xs text-muted-foreground">0 calls this week</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <PhoneCall className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Minutes Used */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Minutes Used</p>
                <p className="text-4xl font-bold mb-1">
                  <span>0</span>
                  <span className="text-lg text-muted-foreground"> / 300</span>
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Usage</span>
                  <span className="font-bold">0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
              <div className="p-3 bg-red-50 rounded-full ml-4">
                <Clock className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avg. Duration */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Duration</p>
                <p className="text-4xl font-bold mb-1">0m 0s</p>
                <p className="text-xs text-muted-foreground">0% answer rate</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <Clock className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                <p className="text-4xl font-bold mb-1">0%</p>
                <p className="text-xs text-muted-foreground">0 unique callers</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <TrendingUp className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Volume Trends */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Call Volume Trends</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Daily distribution and average duration
                </p>
              </div>
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                Peak: 0:00 - 1:00
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="h-64">
            {/* Empty Chart Area with Axes */}
            <div className="relative h-full w-full">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground py-4">
                <span>4</span>
                <span>3</span>
                <span>2</span>
                <span>1</span>
                <span>0</span>
              </div>
              
              {/* Chart area */}
              <div className="ml-8 h-full border-b border-l border-gray-200 relative">
                {/* Grid lines */}
                <div className="absolute inset-0">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-full border-t border-gray-100"
                      style={{ top: `${(i + 1) * 20}%` }}
                    />
                  ))}
                </div>
                
                {/* No data message */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">No data available</p>
                </div>
                
                {/* Duration labels on right */}
                <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground py-4">
                  <span>4m</span>
                  <span>3m</span>
                  <span>2m</span>
                  <span>1m</span>
                  <span>0m</span>
                </div>
              </div>
              
              {/* X-axis labels */}
              <div className="ml-8 mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Call Categories</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Topic distribution analysis
            </p>
          </CardHeader>
          <CardContent className="h-64">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground text-lg font-medium">No call data available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
