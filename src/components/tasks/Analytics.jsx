import React from 'react';
import { Card, CardContent, CardHeader as CardHeaderUI, CardTitle as CardTitleUI, CardDescription } from '@/components/ui/card';
import { CheckSquare, Users, TrendingUp, Clock, X } from 'lucide-react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell } from 'recharts';

const Analytics = ({ tasks, projects, completionRate, taskStats, priorityData, projectTaskData, onClose }) => (
  <div className="h-full flex flex-col">
    <div className="sticky top-0 z-10 bg-white border-b flex items-center justify-between px-6 py-4">
      <h2 className="text-xl font-bold">Analytics Dashboard</h2>
      <button
        className="text-gray-500 hover:text-gray-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckSquare className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{tasks.length}</p>
            <p className="text-sm text-gray-600">Total Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{projects.length}</p>
            <p className="text-sm text-gray-600">Active Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{completionRate}%</p>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">{taskStats.active}</p>
            <p className="text-sm text-gray-600">Active Tasks</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Priority Distribution */}
        <Card>
          <CardHeaderUI>
            <CardTitleUI>Task Priority Distribution</CardTitleUI>
            <CardDescription>Breakdown of tasks by priority level</CardDescription>
          </CardHeaderUI>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        {/* Project Tasks */}
        <Card>
          <CardHeaderUI>
            <CardTitleUI>Tasks by Project</CardTitleUI>
            <CardDescription>Task distribution across projects</CardDescription>
          </CardHeaderUI>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectTaskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#3b82f6" name="Total Tasks" />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Task Status Breakdown */}
      <Card>
        <CardHeaderUI>
          <CardTitleUI>Task Status Overview</CardTitleUI>
          <CardDescription>Current status of all tasks in the system</CardDescription>
        </CardHeaderUI>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{taskStats.todo}</p>
              <p className="text-sm text-red-700">To Do</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{taskStats.inProgress}</p>
              <p className="text-sm text-yellow-700">In Progress</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{taskStats.review}</p>
              <p className="text-sm text-blue-700">Review</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
              <p className="text-sm text-green-700">Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Analytics; 