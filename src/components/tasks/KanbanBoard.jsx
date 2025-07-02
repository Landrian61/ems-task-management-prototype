import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Clock,
  User,
  Calendar,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  Flag,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const KanbanBoard = ({ tasks }) => {
  const { hasPermission } = useAuth();
  const [draggedTask, setDraggedTask] = useState(null);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-50 border-gray-200' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50 border-blue-200' },
    { id: 'review', title: 'Review', color: 'bg-yellow-50 border-yellow-200' },
    { id: 'blocked', title: 'Blocked', color: 'bg-red-50 border-red-200' },
    { id: 'completed', title: 'Completed', color: 'bg-green-50 border-green-200' }
  ];

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      // In a real application, this would update the task status via API
      console.log(`Moving task ${draggedTask.id} from ${draggedTask.status} to ${newStatus}`);
      
      // Update the task status locally (in real app, this would be handled by state management)
      draggedTask.status = newStatus;
    }
    setDraggedTask(null);
  };

  const TaskCard = ({ task }) => {
    const daysUntilDeadline = getDaysUntilDeadline(task.deadline);
    const progressPercentage = task.estimatedHours > 0 
      ? Math.min((task.trackedHours / task.estimatedHours) * 100, 100)
      : 0;

    return (
      <Card
        className="mb-3 cursor-move hover:shadow-md transition-shadow"
        draggable
        onDragStart={(e) => handleDragStart(e, task)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2 flex-1">
              {getPriorityIcon(task.priority)}
              <CardTitle className="text-sm font-medium line-clamp-2">
                {task.title}
              </CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-3 w-3" />
                  View Details
                </DropdownMenuItem>
                {hasPermission('edit_own_tasks') && (
                  <>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-3 w-3" />
                      Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-3">
          {/* Description */}
          <p className="text-xs text-gray-600 line-clamp-2">
            {task.description}
          </p>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                  {tag}
                </Badge>
              ))}
              {task.tags.length > 2 && (
                <Badge variant="outline" className="text-xs px-1 py-0">
                  +{task.tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* Priority */}
          <Badge className={`${getPriorityColor(task.priority)} text-xs w-fit`}>
            {task.priority}
          </Badge>

          {/* Progress Bar */}
          {task.estimatedHours > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600">
                <span>{task.trackedHours}h / {task.estimatedHours}h</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all" 
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Assignee */}
          <div className="flex items-center space-x-2">
            <User className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-600">{task.assignee}</span>
          </div>

          {/* Deadline */}
          <div className="flex items-center space-x-2">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span className={`text-xs ${
              daysUntilDeadline < 3 ? 'text-red-600' : 
              daysUntilDeadline < 7 ? 'text-yellow-600' : 
              'text-gray-600'
            }`}>
              {new Date(task.deadline).toLocaleDateString()}
              {daysUntilDeadline >= 0 && (
                <span className="ml-1">
                  ({daysUntilDeadline === 0 ? 'Today' : 
                    daysUntilDeadline === 1 ? 'Tomorrow' : 
                    `${daysUntilDeadline} days`})
                </span>
              )}
            </span>
          </div>

          {/* Comments and Attachments */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {task.comments > 0 && (
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{task.comments}</span>
                </div>
              )}
              {task.attachments > 0 && (
                <div className="flex items-center space-x-1">
                  <Paperclip className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{task.attachments}</span>
                </div>
              )}
            </div>

            {/* Time Tracking Actions (for current user's tasks) */}
            {hasPermission('track_time') && task.status === 'in-progress' && (
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Play className="h-3 w-3 text-green-600" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Pause className="h-3 w-3 text-gray-600" />
                </Button>
              </div>
            )}
          </div>

          {/* Project */}
          <div className="text-xs text-gray-500 border-t pt-2">
            Project: {task.project}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.id);
        
        return (
          <div
            key={column.id}
            className={`rounded-lg border-2 border-dashed p-4 min-h-96 ${column.color}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                <span>{column.title}</span>
                <Badge variant="secondary" className="text-xs">
                  {columnTasks.length}
                </Badge>
              </h3>
              
              {/* Column Actions */}
              {hasPermission('edit_own_tasks') && (
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>

            {/* Empty State */}
            {columnTasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-sm">No tasks</div>
                <div className="text-xs mt-1">Drag tasks here</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;

