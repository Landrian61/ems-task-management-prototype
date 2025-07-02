import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import {
  CheckSquare,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Timer,
  Target
} from 'lucide-react';

const Dashboard = () => {
  const { user, hasPermission } = useAuth();

  // Mock data for charts
  const taskStatusData = [
    { name: 'To Do', value: 12, color: '#ef4444' },
    { name: 'In Progress', value: 8, color: '#f59e0b' },
    { name: 'Review', value: 5, color: '#3b82f6' },
    { name: 'Completed', value: 25, color: '#10b981' }
  ];

  const workloadData = [
    { name: 'Mon', tasks: 4, completed: 3 },
    { name: 'Tue', tasks: 6, completed: 5 },
    { name: 'Wed', tasks: 8, completed: 6 },
    { name: 'Thu', tasks: 5, completed: 4 },
    { name: 'Fri', tasks: 7, completed: 6 },
    { name: 'Sat', tasks: 2, completed: 2 },
    { name: 'Sun', tasks: 1, completed: 1 }
  ];

  const performanceData = [
    { month: 'Jan', efficiency: 85 },
    { month: 'Feb', efficiency: 88 },
    { month: 'Mar', efficiency: 92 },
    { month: 'Apr', efficiency: 89 },
    { month: 'May', efficiency: 94 },
    { month: 'Jun', efficiency: 96 }
  ];

  // Role-specific dashboard content
  const getStatsCards = () => {
    const baseStats = [
      {
        title: 'Active Tasks',
        value: '12',
        description: 'Tasks assigned to you',
        icon: CheckSquare,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        title: 'Time Today',
        value: '6h 24m',
        description: 'Time tracked today',
        icon: Timer,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      }
    ];

    if (hasPermission('view_reports')) {
      baseStats.push(
        {
          title: 'Team Tasks',
          value: '48',
          description: 'Total team tasks',
          icon: Users,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50'
        },
        {
          title: 'Completion Rate',
          value: '94%',
          description: 'This month',
          icon: Target,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        }
      );
    }

    return baseStats;
  };

  const statsCards = getStatsCards();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your tasks today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="capitalize">
            {user?.role}
          </Badge>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Status Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Task Overview</CardTitle>
            <CardDescription>
              Current status of all tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend */}
              <div className="space-y-3">
                {taskStatusData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates on your tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Task completed',
                  task: 'Update user interface',
                  time: '2 hours ago',
                  type: 'success'
                },
                {
                  action: 'Task assigned',
                  task: 'Database optimization',
                  time: '4 hours ago',
                  type: 'info'
                },
                {
                  action: 'Deadline approaching',
                  task: 'Mobile app testing',
                  time: '6 hours ago',
                  type: 'warning'
                },
                {
                  action: 'Comment added',
                  task: 'API documentation',
                  time: '1 day ago',
                  type: 'info'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.action}</span>
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {activity.task}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Workload Chart (for managers/admins) */}
      {hasPermission('view_reports') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Workload</CardTitle>
              <CardDescription>
                Tasks assigned vs completed this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={workloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#3b82f6" name="Assigned" />
                    <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>
                Efficiency trend over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions for faster workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <CheckSquare className="h-6 w-6 mb-2" />
              <span className="text-sm">New Task</span>
            </Button>
            {hasPermission('create_projects') && (
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">New Project</span>
              </Button>
            )}
            <Button variant="outline" className="h-20 flex-col">
              <Clock className="h-6 w-6 mb-2" />
              <span className="text-sm">Time Report</span>
            </Button>
            {hasPermission('view_reports') && (
              <Button variant="outline" className="h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span className="text-sm">Analytics</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

