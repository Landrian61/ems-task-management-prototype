import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  MessageSquare,
  Paperclip,
  Flag
} from 'lucide-react';
import KanbanBoard from './KanbanBoard';
import CreateTaskForm from './CreateTaskForm';

const TaskList = () => {
  const { user, hasPermission } = useAuth();
  const [view, setView] = useState('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Mock task data
  const tasks = [
    {
      id: 1,
      title: 'Update user interface design',
      description: 'Redesign the main dashboard with new color scheme and improved navigation',
      status: 'in-progress',
      priority: 'high',
      assignee: 'John Doe',
      assigneeId: 1,
      project: 'Mobile App Redesign',
      projectId: 1,
      deadline: '2024-07-25',
      estimatedHours: 16,
      trackedHours: 8.5,
      tags: ['UI/UX', 'Frontend'],
      comments: 3,
      attachments: 2,
      createdAt: '2024-07-15',
      updatedAt: '2024-07-20'
    },
    {
      id: 2,
      title: 'Database schema optimization',
      description: 'Optimize database queries and improve indexing for better performance',
      status: 'todo',
      priority: 'medium',
      assignee: 'Jane Smith',
      assigneeId: 2,
      project: 'Database Migration',
      projectId: 2,
      deadline: '2024-07-30',
      estimatedHours: 12,
      trackedHours: 0,
      tags: ['Backend', 'Database'],
      comments: 1,
      attachments: 0,
      createdAt: '2024-07-18',
      updatedAt: '2024-07-18'
    },
    {
      id: 3,
      title: 'API endpoint documentation',
      description: 'Create comprehensive documentation for all REST API endpoints',
      status: 'review',
      priority: 'low',
      assignee: 'Alice Johnson',
      assigneeId: 3,
      project: 'API Documentation',
      projectId: 3,
      deadline: '2024-08-05',
      estimatedHours: 8,
      trackedHours: 7.5,
      tags: ['Documentation', 'API'],
      comments: 5,
      attachments: 1,
      createdAt: '2024-07-10',
      updatedAt: '2024-07-19'
    },
    {
      id: 4,
      title: 'Security vulnerability assessment',
      description: 'Conduct thorough security audit and fix identified vulnerabilities',
      status: 'completed',
      priority: 'high',
      assignee: 'Bob Wilson',
      assigneeId: 4,
      project: 'Security Audit',
      projectId: 4,
      deadline: '2024-07-20',
      estimatedHours: 20,
      trackedHours: 18,
      tags: ['Security', 'Testing'],
      comments: 8,
      attachments: 3,
      createdAt: '2024-07-05',
      updatedAt: '2024-07-20'
    },
    {
      id: 5,
      title: 'Mobile responsive testing',
      description: 'Test application on various mobile devices and fix responsive issues',
      status: 'blocked',
      priority: 'medium',
      assignee: 'Carol Brown',
      assigneeId: 5,
      project: 'Mobile App Redesign',
      projectId: 1,
      deadline: '2024-07-28',
      estimatedHours: 10,
      trackedHours: 3,
      tags: ['Testing', 'Mobile'],
      comments: 2,
      attachments: 0,
      createdAt: '2024-07-16',
      updatedAt: '2024-07-21'
    }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'all' || task.assigneeId.toString() === assigneeFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <Flag className="h-3 w-3 text-red-600" />;
      case 'medium': return <Flag className="h-3 w-3 text-yellow-600" />;
      case 'low': return <Flag className="h-3 w-3 text-green-600" />;
      default: return null;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'todo': return <Clock className="h-4 w-4 text-gray-500" />;
      case 'in-progress': return <Play className="h-4 w-4 text-blue-500" />;
      case 'review': return <Eye className="h-4 w-4 text-yellow-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'blocked': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const uniqueAssignees = [...new Set(tasks.map(task => ({ id: task.assigneeId, name: task.assignee })))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your tasks
          </p>
        </div>
        {hasPermission('edit_own_tasks') && (
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new task
                </DialogDescription>
              </DialogHeader>
              <CreateTaskForm onClose={() => setShowCreateDialog(false)} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              {uniqueAssignees.map((assignee) => (
                <SelectItem key={assignee.id} value={assignee.id.toString()}>
                  {assignee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* View Toggle */}
      <Tabs value={view} onValueChange={setView}>
        <TabsList>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="mt-6">
          <KanbanBoard tasks={filteredTasks} />
        </TabsContent>

        <TabsContent value="table" className="mt-6">
          <div className="bg-white rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900">Task</th>
                    <th className="text-left p-4 font-medium text-gray-900">Status</th>
                    <th className="text-left p-4 font-medium text-gray-900">Priority</th>
                    <th className="text-left p-4 font-medium text-gray-900">Assignee</th>
                    <th className="text-left p-4 font-medium text-gray-900">Project</th>
                    <th className="text-left p-4 font-medium text-gray-900">Deadline</th>
                    <th className="text-left p-4 font-medium text-gray-900">Progress</th>
                    <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => {
                    const daysUntilDeadline = getDaysUntilDeadline(task.deadline);
                    const progressPercentage = task.estimatedHours > 0 
                      ? Math.min((task.trackedHours / task.estimatedHours) * 100, 100)
                      : 0;

                    return (
                      <tr key={task.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              {getPriorityIcon(task.priority)}
                              <span className="font-medium text-gray-900">{task.title}</span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {task.description}
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              {task.comments > 0 && (
                                <div className="flex items-center space-x-1">
                                  <MessageSquare className="h-3 w-3" />
                                  <span>{task.comments}</span>
                                </div>
                              )}
                              {task.attachments > 0 && (
                                <div className="flex items-center space-x-1">
                                  <Paperclip className="h-3 w-3" />
                                  <span>{task.attachments}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(task.status)}
                            <Badge className={getStatusColor(task.status)}>
                              {task.status.replace('-', ' ')}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-700">
                                {task.assignee.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span className="text-sm text-gray-900">{task.assignee}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-gray-600">{task.project}</span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className={`${
                              daysUntilDeadline < 3 ? 'text-red-600' : 
                              daysUntilDeadline < 7 ? 'text-yellow-600' : 
                              'text-gray-600'
                            }`}>
                              {new Date(task.deadline).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Overdue'}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="text-gray-900">
                              {task.trackedHours}h / {task.estimatedHours}h
                            </div>
                            <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                              <div 
                                className="bg-blue-600 h-1.5 rounded-full" 
                                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {hasPermission('edit_own_tasks') && (
                                <>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Task
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Task
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckSquare className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' || assigneeFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first task'
            }
          </p>
          {hasPermission('edit_own_tasks') && !searchQuery && statusFilter === 'all' && (
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;

