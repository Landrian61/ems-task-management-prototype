import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Dashboard from '../dashboard/Dashboard';
import ProjectList from '../projects/ProjectList';
import TaskList from '../tasks/TaskList';
import TimeTracker from '../time-tracking/TimeTracker';
import Reports from '../reports/Reports';
import UserManagement from '../admin/UserManagement';
import Settings from '../settings/Settings';
import ProjectDetailPage from '../projects/ProjectDetailPage';
import ViewTaskDetails from '../tasks/TaskDetails';

const AppRouter = ({ activeRoute, setActiveRoute }) => {
  const { hasPermission } = useAuth();

  const mockTasks = [
    {
      id: 1,
      title: "Update user interface design",
      description: "Redesign the main dashboard with new color scheme and improved navigation",
      status: "in-progress",
      priority: "high",
      assignee: "John Doe",
      assigneeId: 1,
      project: "Mobile App Redesign",
      projectId: 1,
      deadline: "2024-07-25",
      estimatedHours: 16,
      trackedHours: 8.5,
      tags: ["UI/UX", "Frontend"],
      comments: 3,
      attachments: 2,
      createdAt: "2024-07-15",
      updatedAt: "2024-07-20",
    },
    {
      id: 2,
      title: "Database schema optimization",
      description: "Optimize database queries and improve indexing for better performance",
      status: "todo",
      priority: "medium",
      assignee: "Jane Smith",
      assigneeId: 2,
      project: "Database Migration",
      projectId: 2,
      deadline: "2024-07-30",
      estimatedHours: 12,
      trackedHours: 0,
      tags: ["Backend", "Database"],
      comments: 1,
      attachments: 0,
      createdAt: "2024-07-18",
      updatedAt: "2024-07-18",
    },
    {
      id: 3,
      title: "API endpoint documentation",
      description: "Create comprehensive documentation for all REST API endpoints",
      status: "review",
      priority: "low",
      assignee: "Alice Johnson",
      assigneeId: 3,
      project: "API Documentation",
      projectId: 3,
      deadline: "2024-08-05",
      estimatedHours: 8,
      trackedHours: 7.5,
      tags: ["Documentation", "API"],
      comments: 5,
      attachments: 1,
      createdAt: "2024-07-10",
      updatedAt: "2024-07-19",
    },
    {
      id: 4,
      title: "Security vulnerability assessment",
      description: "Conduct thorough security audit and fix identified vulnerabilities",
      status: "completed",
      priority: "high",
      assignee: "Bob Wilson",
      assigneeId: 4,
      project: "Security Audit",
      projectId: 4,
      deadline: "2024-07-20",
      estimatedHours: 20,
      trackedHours: 18,
      tags: ["Security", "Testing"],
      comments: 8,
      attachments: 3,
      createdAt: "2024-07-05",
      updatedAt: "2024-07-20",
    },
    {
      id: 5,
      title: "Mobile responsive testing",
      description: "Test application on various mobile devices and fix responsive issues",
      status: "blocked",
      priority: "medium",
      assignee: "Carol Brown",
      assigneeId: 5,
      project: "Mobile App Redesign",
      projectId: 1,
      deadline: "2024-07-28",
      estimatedHours: 10,
      trackedHours: 3,
      tags: ["Testing", "Mobile"],
      comments: 2,
      attachments: 0,
      createdAt: "2024-07-16",
      updatedAt: "2024-07-21",
    },
  ];

  const renderComponent = () => {
    if (activeRoute && activeRoute.startsWith('project-detail:')) {
      const id = activeRoute.split(':')[1];
      return <ProjectDetailPage projectId={id} setActiveRoute={setActiveRoute} />;
    }
    if (activeRoute && activeRoute.startsWith('task-detail:')) {
      const id = parseInt(activeRoute.split(':')[1], 10);
      const task = mockTasks.find(t => t.id === id);
      if (!task) return <div className="p-8">Task not found</div>;
      return <div className="p-8 max-w-4xl mx-auto"><ViewTaskDetails task={task} isOpen={true} onClose={() => setActiveRoute('tasks')} onUpdate={() => {}} /></div>;
    }
    switch (activeRoute) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectList setActiveRoute={setActiveRoute} />;
      case 'tasks':
        return <TaskList setActiveRoute={setActiveRoute} />;
      case 'time-tracking':
        if (hasPermission('track_time')) {
          return <TimeTracker />;
        }
        return <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
          <p className="text-gray-600 mt-2">You don't have permission to access time tracking.</p>
        </div>;
      case 'reports':
        if (hasPermission('view_reports')) {
          return <Reports />;
        }
        return <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
          <p className="text-gray-600 mt-2">You don't have permission to view reports.</p>
        </div>;
      case 'users':
        if (hasPermission('manage_users')) {
          return <UserManagement />;
        }
        return <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
          <p className="text-gray-600 mt-2">You don't have permission to manage users.</p>
        </div>;
      case 'settings':
        if (hasPermission('system_config')) {
          return <Settings />;
        }
        return <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
          <p className="text-gray-600 mt-2">You don't have permission to access settings.</p>
        </div>;
      default:
        return <Dashboard />;
    }
  };

  return renderComponent();
};

export default AppRouter;

