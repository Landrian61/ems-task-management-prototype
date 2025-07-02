import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Dashboard from '../dashboard/Dashboard';
import ProjectList from '../projects/ProjectList';
import TaskList from '../tasks/TaskList';
import TimeTracker from '../time-tracking/TimeTracker';
import Reports from '../reports/Reports';
import UserManagement from '../admin/UserManagement';
import Settings from '../settings/Settings';

const AppRouter = ({ activeRoute, setActiveRoute }) => {
  const { hasPermission } = useAuth();

  const renderComponent = () => {
    switch (activeRoute) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectList />;
      case 'tasks':
        return <TaskList />;
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

