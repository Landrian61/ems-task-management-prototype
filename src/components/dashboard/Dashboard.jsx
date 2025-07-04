"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { CheckSquare, Clock, Users, TrendingUp, AlertTriangle, Calendar, Timer, Target, Play, Pause, Square } from 'lucide-react';
import CreateTaskForm from '@/components/tasks/CreateSubTaskForm';
import CreateProjectForm from '@/components/projects/CreateProjectForm';
import TimeReport from '@/components/tasks/TimeReport';
import Analytics from '@/components/tasks/Analytics';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

const Dashboard = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    role: "manager",
    permissions: ["view_reports", "create_projects", "manage_team"]
  };

  const hasPermission = (permission) => {
    return user.permissions.includes(permission);
  };

  // State for modals
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isTimeReportOpen, setIsTimeReportOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Task and Project Management State
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Update user interface",
      description: "Redesign the main dashboard",
      status: "completed",
      priority: "high",
      projectId: "1",
      assignee: "John Doe",
      dueDate: "2024-01-15",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-14"
    },
    {
      id: "2",
      title: "Database optimization",
      description: "Improve query performance",
      status: "inProgress",
      priority: "medium",
      projectId: "1",
      assignee: "John Doe",
      dueDate: "2024-01-20",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-15"
    },
    {
      id: "3",
      title: "Mobile app testing",
      description: "Test new features on mobile",
      status: "review",
      priority: "high",
      projectId: "2",
      assignee: "John Doe",
      dueDate: "2024-01-18",
      createdAt: "2024-01-13",
      updatedAt: "2024-01-16"
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete overhaul of company website",
      status: "active",
      createdAt: "2024-01-01",
      members: ["John Doe", "Jane Smith"]
    },
    {
      id: "2",
      name: "Mobile App",
      description: "New mobile application development",
      status: "active",
      createdAt: "2024-01-05",
      members: ["John Doe", "Bob Johnson"]
    }
  ]);

  // Time Tracking State
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [todayTime, setTodayTime] = useState("0h 0m");
  const [startTime, setStartTime] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const intervalRef = useRef(null);

  // Form states
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    projectId: "",
    assignee: "John Doe",
    dueDate: ""
  });

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    status: "active",
    members: ["John Doe"]
  });

  // Time tracking effect
  useEffect(() => {
    if (isTracking && startTime) {
      intervalRef.current = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        setCurrentTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTracking, startTime]);

  // Update today's total time
  useEffect(() => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    setTodayTime(`${hours}h ${minutes}m`);
  }, [totalSeconds]);

  // Time tracking functions
  const startTimer = () => {
    setStartTime(new Date());
    setIsTracking(true);
  };

  const pauseTimer = () => {
    if (startTime) {
      const now = new Date();
      const sessionSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setTotalSeconds(prev => prev + sessionSeconds);
    }
    setIsTracking(false);
    setCurrentTime("00:00:00");
  };

  const stopTimer = () => {
    if (startTime) {
      const now = new Date();
      const sessionSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setTotalSeconds(prev => prev + sessionSeconds);
    }
    setIsTracking(false);
    setCurrentTime("00:00:00");
    setStartTime(null);
  };

  // Task management functions
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const addProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setProjects(prev => [...prev, newProject]);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;

    addTask(taskForm);
    setTaskForm({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      projectId: "",
      assignee: "John Doe",
      dueDate: ""
    });
    setIsNewTaskOpen(false);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!projectForm.name.trim()) return;

    addProject(projectForm);
    setProjectForm({
      name: "",
      description: "",
      status: "active",
      members: ["John Doe"]
    });
    setIsNewProjectOpen(false);
  };

  // Calculate stats
  const getTaskStats = () => {
    return {
      todo: tasks.filter(t => t.status === 'todo').length,
      inProgress: tasks.filter(t => t.status === 'inProgress').length,
      review: tasks.filter(t => t.status === 'review').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      active: tasks.filter(t => t.status !== 'completed').length
    };
  };

  const taskStats = getTaskStats();

  const taskStatusData = [
    { name: 'To Do', value: taskStats.todo, color: '#ef4444' },
    { name: 'In Progress', value: taskStats.inProgress, color: '#f59e0b' },
    { name: 'Review', value: taskStats.review, color: '#3b82f6' },
    { name: 'Completed', value: taskStats.completed, color: '#10b981' }
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

  const priorityData = [
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length, color: '#10b981' }
  ];

  const projectTaskData = projects.map(project => ({
    name: project.name,
    tasks: tasks.filter(t => t.projectId === project.id).length,
    completed: tasks.filter(t => t.projectId === project.id && t.status === 'completed').length
  }));

  const getStatsCards = () => {
    const baseStats = [
      {
        title: 'Active Tasks',
        value: taskStats.active.toString(),
        description: 'Tasks assigned to you',
        icon: CheckSquare,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        title: 'Time Today',
        value: todayTime,
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
          value: tasks.length.toString(),
          description: 'Total team tasks',
          icon: Users,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50'
        },
        {
          title: 'Completion Rate',
          value: `${Math.round((taskStats.completed / tasks.length) * 100) || 0}%`,
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

  const recentActivities = tasks.slice(-4).reverse().map(task => ({
    action: task.status === 'completed' ? 'Task completed' : 'Task updated',
    task: task.title,
    time: new Date(task.updatedAt).toLocaleString(),
    type: task.status === 'completed' ? 'success' : 'info'
  }));

  const completionRate = tasks.length > 0 ? Math.round((taskStats.completed / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6 p-6">
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
          <div className="flex items-center space-x-2">
            {isTracking ? (
              <Button onClick={pauseTimer} variant="outline" size="sm">
                <Pause className="mr-2 h-4 w-4" />
                Pause ({currentTime})
              </Button>
            ) : (
              <Button onClick={startTimer} variant="outline" size="sm">
                <Play className="mr-2 h-4 w-4" />
                Start Timer
              </Button>
            )}
            {isTracking && (
              <Button onClick={stopTimer} variant="outline" size="sm">
                <Square className="mr-2 h-4 w-4" />
                Stop
              </Button>
            )}
          </div>
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
            <Card key={index} className="hover:shadow-md transition-shadow">
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
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
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
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
              )}
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

      {/* New Task Drawer */}
      <Drawer open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen} direction="right">
        <DrawerContent className="w-full max-w-2xl">
          <CreateTaskForm onClose={() => setIsNewTaskOpen(false)} />
        </DrawerContent>
      </Drawer>

      {/* New Project Drawer */}
      <Drawer open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen} direction="right">
        <DrawerContent className="w-full max-w-2xl">
          <CreateProjectForm onClose={() => setIsNewProjectOpen(false)} />
        </DrawerContent>
      </Drawer>

      {/* Time Report Drawer */}
      <Drawer open={isTimeReportOpen} onOpenChange={setIsTimeReportOpen} direction="right">
        <DrawerContent className="w-full max-w-2xl">
          <TimeReport
            todayTime={todayTime}
            workloadData={workloadData.map(day => ({ ...day, hours: Math.random() * 8 + 2 }))}
            onClose={() => setIsTimeReportOpen(false)}
          />
        </DrawerContent>
      </Drawer>

      {/* Analytics Drawer */}
      <Drawer open={isAnalyticsOpen} onOpenChange={setIsAnalyticsOpen} direction="right">
        <DrawerContent className="w-full max-w-3xl">
          <Analytics
            tasks={tasks}
            projects={projects}
            completionRate={completionRate}
            taskStats={taskStats}
            priorityData={priorityData}
            projectTaskData={projectTaskData}
            onClose={() => setIsAnalyticsOpen(false)}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Dashboard;