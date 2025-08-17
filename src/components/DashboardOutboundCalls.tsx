import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { 
  PhoneOutgoing,
  BarChart3,
  List,
  Plus,
  Calendar,
  Clock,
  Users,
  Target,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  AlertCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const DashboardOutbound: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState('');
  const [recipients, setRecipients] = useState('');

  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      name: 'Summer Promotion',
      status: 'Completed',
      recipients: 150,
      completed: 147,
      success: 85,
      created: '2024-01-10',
      lastRun: '2024-01-15'
    },
    {
      id: 2,
      name: 'Follow-up Calls',
      status: 'In Progress',
      recipients: 80,
      completed: 45,
      success: 32,
      created: '2024-01-12',
      lastRun: '2024-01-16'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'In Progress':
        return <Play className="h-4 w-4 text-green-500" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Paused':
        return <Pause className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Scheduled': 'bg-blue-50 text-blue-600 border-blue-200',
      'In Progress': 'bg-green-50 text-green-600 border-green-200',
      'Completed': 'bg-green-50 text-green-600 border-green-200',
      'Failed': 'bg-red-50 text-red-600 border-red-200',
      'Paused': 'bg-orange-50 text-orange-600 border-orange-200',
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <PhoneOutgoing className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-red-700">Outbound Calls</h1>
              <Badge className="bg-red-100 text-red-600 text-xs px-2 py-1">ALPHA</Badge>
            </div>
            <p className="text-muted-foreground">AI-powered batch calling campaigns</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid grid-cols-3 w-auto">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create
            </TabsTrigger>
          </TabsList>

          {activeTab === 'list' && (
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          )}
        </div>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Campaigns</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">All campaigns</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-full">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Campaigns</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Currently running</p>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-full">
                    <Play className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Recipients</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Across all campaigns</p>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-full">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold">0.0%</p>
                      <p className="text-sm text-muted-foreground">Average across</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-red-500">Needs improvement</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-full">
                    <Target className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Status Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <Clock className="h-5 w-5" />
                  Campaign Status Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Scheduled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">0</span>
                    <span className="text-sm text-blue-500">0%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Play className="h-4 w-4 text-green-500" />
                    <span className="font-medium">In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">0</span>
                    <span className="text-sm text-green-500">0%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">0</span>
                    <span className="text-sm text-green-500">0%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="font-medium">Failed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">0</span>
                    <span className="text-sm text-red-500">0%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Pause className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">Paused</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">0</span>
                    <span className="text-sm text-orange-500">0%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <BarChart3 className="h-5 w-5" />
                  Call Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Overall Completion Rate</span>
                    <span className="text-sm font-medium">0 / 0 calls</span>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold">0.0%</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-3xl font-bold">0.0%</p>
                    <p className="text-sm text-muted-foreground mt-1">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground mt-1">Total Calls</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold">0m</p>
                    <p className="text-sm text-muted-foreground mt-1">Avg. Duration</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground mt-1">Total Recipients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* List Tab */}
        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign List</CardTitle>
            </CardHeader>
            <CardContent>
              {campaigns.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="p-4 bg-muted rounded-full mb-4">
                    <PhoneOutgoing className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No campaigns found</h3>
                  <p className="text-muted-foreground mb-4">Create your first outbound calling campaign to get started.</p>
                  <Button onClick={() => setActiveTab('create')} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Campaign
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead>Success Rate</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last Run</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                          <TableCell className="font-medium">{campaign.name}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(campaign.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(campaign.status)}
                                {campaign.status}
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell>{campaign.recipients}</TableCell>
                          <TableCell>{campaign.completed}</TableCell>
                          <TableCell>{Math.round((campaign.success / campaign.recipients) * 100)}%</TableCell>
                          <TableCell>{campaign.created}</TableCell>
                          <TableCell>{campaign.lastRun}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
              <p className="text-sm text-muted-foreground">Set up a new outbound calling campaign for your business.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name *</Label>
                  <Input
                    id="campaign-name"
                    placeholder="Enter campaign name"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-type">Campaign Type *</Label>
                  <Select value={campaignType} onValueChange={setCampaignType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales Outreach</SelectItem>
                      <SelectItem value="followup">Follow-up Calls</SelectItem>
                      <SelectItem value="survey">Customer Survey</SelectItem>
                      <SelectItem value="appointment">Appointment Reminders</SelectItem>
                      <SelectItem value="promotion">Promotional Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-description">Campaign Description</Label>
                <Textarea
                  id="campaign-description"
                  placeholder="Describe the purpose of this campaign..."
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients *</Label>
                <Textarea
                  id="recipients"
                  placeholder="Enter phone numbers (one per line) or upload a CSV file..."
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  className="min-h-32"
                />
                <p className="text-xs text-muted-foreground">
                  You can enter phone numbers manually or upload a CSV file with contact information.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="call-script">Call Script</Label>
                <Textarea
                  id="call-script"
                  placeholder="Enter the script your AI agent will use for this campaign..."
                  className="min-h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="schedule-date">Schedule Date</Label>
                  <Input
                    id="schedule-date"
                    type="datetime-local"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-attempts">Max Attempts per Recipient</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 attempt</SelectItem>
                      <SelectItem value="2">2 attempts</SelectItem>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Campaign
                </Button>
                <Button variant="outline">Save as Draft</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
