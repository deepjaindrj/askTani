import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, PhoneIncoming, Clock, TrendingUp, Users, Calendar } from 'lucide-react';

export const DashboardHome: React.FC = () => {
  const stats = [
    { title: 'Total Calls Today', value: '24', change: '+12%', icon: Phone, color: 'text-primary' },
    { title: 'Missed Calls Saved', value: '18', change: '+25%', icon: PhoneIncoming, color: 'text-accent' },
    { title: 'Average Response Time', value: '2.3s', change: '-15%', icon: Clock, color: 'text-success' },
    { title: 'Customer Satisfaction', value: '4.8/5', change: '+5%', icon: TrendingUp, color: 'text-warning' },
  ];

  const recentCalls = [
    { id: 1, caller: 'Sarah Johnson', time: '10 minutes ago', duration: '3:24', type: 'Appointment', status: 'Scheduled' },
    { id: 2, caller: 'Mike Chen', time: '25 minutes ago', duration: '2:15', type: 'Inquiry', status: 'Answered' },
    { id: 3, caller: 'Lisa Wong', time: '1 hour ago', duration: '4:12', type: 'Support', status: 'Resolved' },
    { id: 4, caller: 'David Smith', time: '2 hours ago', duration: '1:45', type: 'Booking', status: 'Scheduled' },
  ];

  const upcomingAppointments = [
    { id: 1, client: 'Emily Davis', time: '2:00 PM', service: 'Consultation', duration: '30 min' },
    { id: 2, client: 'Robert Wilson', time: '3:30 PM', service: 'Follow-up', duration: '15 min' },
    { id: 3, client: 'Maria Garcia', time: '4:15 PM', service: 'New Client', duration: '45 min' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
        <p className="text-muted-foreground">Here's what's happening with your AI call agent today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className={`text-sm ${stat.color} font-medium`}>{stat.change} from yesterday</p>
                  </div>
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Calls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Recent Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div key={call.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{call.caller}</p>
                    <p className="text-sm text-muted-foreground">{call.time} • {call.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{call.type}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      call.status === 'Scheduled' ? 'bg-primary/10 text-primary' :
                      call.status === 'Answered' ? 'bg-accent/10 text-accent' :
                      'bg-success/10 text-success'
                    }`}>
                      {call.status}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Calls
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{appointment.client}</p>
                    <p className="text-sm text-muted-foreground">{appointment.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{appointment.time}</p>
                    <p className="text-xs text-muted-foreground">{appointment.duration}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Add New Contact</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Appointment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Phone className="h-6 w-6" />
              <span>Test Call Agent</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};