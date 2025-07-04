import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  BarChart3,
  Users,
  Settings,
  Timer,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle, activeRoute, setActiveRoute }) => {
  const { user, hasPermission } = useAuth();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      permission: 'view_tasks',
      badge: null
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderOpen,
      permission: 'view_tasks',
      badge: null
    },
    {
      id: 'tasks',
      label: 'My Tasks',
      icon: CheckSquare,
      permission: 'view_tasks',
      badge: { count: 12, variant: 'default' }
    },
    {
      id: 'time-tracking',
      label: 'Time Tracking',
      icon: Timer,
      permission: 'track_time',
      badge: null
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      permission: 'view_reports',
      badge: null
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      permission: 'manage_users',
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      permission: 'system_config',
      badge: null
    }
  ];

  const visibleItems = navigationItems.filter(item => 
    hasPermission(item.permission)
  );

  const handleItemClick = (itemId) => {
    setActiveRoute(itemId);
  };

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40",
      isOpen ? "w-64" : "w-16"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EMS</span>
            </div>
            <span className="font-semibold text-gray-900">Task Manager</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-1.5"
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">
              {user?.name?.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-10",
                !isOpen && "justify-center px-2",
                isActive && "bg-blue-600 text-white hover:bg-blue-700"
              )}
              onClick={() => handleItemClick(item.id)}
            >
              <Icon className={cn("h-4 w-4", isOpen && "mr-3")} />
              {isOpen && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant={item.badge.variant}
                      className="ml-2 text-xs"
                    >
                      {item.badge.count}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Bell className="h-4 w-4 text-gray-500" />
          {isOpen && (
            <span className="text-sm text-gray-500">Notifications</span>
          )}
          <Badge variant="destructive" className="ml-auto">
            3
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

