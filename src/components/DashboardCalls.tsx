import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Phone, Search, Filter, Download, Play, Clock } from 'lucide-react';

export const DashboardCalls: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const calls = [
    {
      id: '1',
      caller: 'Sarah Johnson',
      phone: '+1 (416) 555-0123',
      time: '2024-01-15 10:30 AM',
      duration: '3:24',
      type: 'Inbound',
      status: 'Completed',
      outcome: 'Appointment Scheduled',
      agent: 'Benny (Sarah Voice)',
    },
    {
      id: '2',
      caller: 'Mike Chen',
      phone: '+1 (647) 555-0456',
      time: '2024-01-15 10:05 AM',
      duration: '2:15',
      type: 'Inbound',
      status: 'Completed',
      outcome: 'Information Provided',
      agent: 'Benny (Sarah Voice)',
    },
    {
      id: '3',
      caller: 'Lisa Wong',
      phone: '+1 (905) 555-0789',
      time: '2024-01-15 09:45 AM',
      duration: '4:12',
      type: 'Inbound',
      status: 'Completed',
      outcome: 'Issue Resolved',
      agent: 'Benny (Alex Voice)',
    },
    {
      id: '4',
      caller: 'David Smith',
      phone: '+1 (416) 555-0321',
      time: '2024-01-15 09:20 AM',
      duration: '1:45',
      type: 'Inbound',
      status: 'Completed',
      outcome: 'Callback Requested',
      agent: 'Benny (Sarah Voice)',
    },
    {
      id: '5',
      caller: 'Emily Davis',
      phone: '+1 (647) 555-0654',
      time: '2024-01-15 08:55 AM',
      duration: '5:33',
      type: 'Inbound',
      status: 'Completed',
      outcome: 'Appointment Scheduled',
      agent: 'Benny (Sarah Voice)',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Completed': 'bg-success/10 text-success',
      'In Progress': 'bg-warning/10 text-warning',
      'Failed': 'bg-destructive/10 text-destructive',
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-muted text-muted-foreground';
  };

  const getOutcomeBadge = (outcome: string) => {
    const outcomeStyles = {
      'Appointment Scheduled': 'bg-primary/10 text-primary',
      'Information Provided': 'bg-accent/10 text-accent',
      'Issue Resolved': 'bg-success/10 text-success',
      'Callback Requested': 'bg-warning/10 text-warning',
    };
    return outcomeStyles[outcome as keyof typeof outcomeStyles] || 'bg-muted text-muted-foreground';
  };

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.caller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.phone.includes(searchTerm) ||
                         call.outcome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || call.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Call History</h1>
          <p className="text-muted-foreground">Manage and review all your AI agent calls</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Calls
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search calls by name, phone, or outcome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Calls</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Calls</p>
                <p className="text-2xl font-bold">{calls.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
                <p className="text-2xl font-bold">3:14</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-success rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">98%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-primary rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Appointments</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calls Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Calls ({filteredCalls.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Caller</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-medium">{call.caller}</TableCell>
                    <TableCell className="text-muted-foreground">{call.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{call.time}</TableCell>
                    <TableCell>{call.duration}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(call.status)}>
                        {call.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getOutcomeBadge(call.outcome)}>
                        {call.outcome}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{call.agent}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Play className="h-3 w-3" />
                        Play
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};