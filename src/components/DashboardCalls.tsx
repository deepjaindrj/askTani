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
import { 
  Phone, 
  Search, 
  Filter, 
  Download, 
  Play, 
  Clock, 
  Users,
  PhoneCall,
  RefreshCw,
  Trash2,
  X,
  User,
  Hash,
  MessageSquare
} from 'lucide-react';

export const DashboardCalls: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTime, setFilterTime] = useState('all-time');
  const [filterNotes, setFilterNotes] = useState('all-notes');
  const [filterPriority, setFilterPriority] = useState('all-priority');
  const [smartSearchActive, setSmartSearchActive] = useState(true);
  const [showPerPage, setShowPerPage] = useState('10');

  // Empty state - no calls yet
  const calls: any[] = [];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Call History</h1>
          <p className="text-muted-foreground">View and manage your recent calls</p>
        </div>
        
        {/* Header Actions */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Mark all 0 calls as unread</span>
          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="sm" className="gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Mark All Read
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Mark All Unread
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <RefreshCw className="h-3 w-3" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 text-red-500">
              <Trash2 className="h-3 w-3" />
              Delete All
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Calls</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">in your organization</p>
                </div>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <PhoneCall className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Duration</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">0m 0s</p>
                  <p className="text-sm text-muted-foreground">average call time</p>
                </div>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Unique Callers</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">unique phone numbers</p>
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <Button variant="default" className="rounded-full">
          All Calls
        </Button>
        <Button variant="outline" className="rounded-full">
          Incoming
        </Button>
        <Button variant="outline" className="rounded-full">
          Outgoing
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search names, numbers, or call conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-8"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filters:</span>
          
          <Select value={filterTime} onValueChange={setFilterTime}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterNotes} onValueChange={setFilterNotes}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Notes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-notes">All Notes</SelectItem>
              <SelectItem value="with-notes">With Notes</SelectItem>
              <SelectItem value="without-notes">Without Notes</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-priority">All Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Smart Search */}
      {smartSearchActive && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Search className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-blue-900">Smart Search Active - Enhanced</p>
                  <div className="flex items-center gap-6 mt-2">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700">Caller names</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Hash className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700">Phone numbers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700">Call transcripts</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSmartSearchActive(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calls Table */}
      <Card>
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="border-b">
            <div className="grid grid-cols-8 gap-4 p-4 text-sm font-medium text-muted-foreground">
              <div>Caller</div>
              <div>Number</div>
              <div>Date & Time ↑</div>
              <div>Duration</div>
              <div>Type</div>
              <div>Status</div>
              <div>Notes</div>
              <div>Actions</div>
            </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-16">
            <div className="p-4 bg-muted rounded-full mb-4">
              <Phone className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No call logs found</h3>
            <p className="text-muted-foreground">No calls have been made or received yet.</p>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Show</span>
          <Select value={showPerPage} onValueChange={setShowPerPage}>
            <SelectTrigger className="w-16 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span>calls per page</span>
        </div>
      </div>
    </div>
  );
};
