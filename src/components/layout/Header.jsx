import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Timer,
  Play,
  Pause
} from 'lucide-react';

const Header = ({ onMenuClick }) => {
  const { user, logout, switchRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerTime, setTimerTime] = useState('00:00:00');

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'Task assigned',
      message: 'New task "Update user interface" has been assigned to you',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      title: 'Task completed',
      message: 'John Doe completed "Database optimization"',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      title: 'Project deadline',
      message: 'Project "Mobile App" deadline is approaching',
      time: '2 hours ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleTimerToggle = () => {
    setIsTimerActive(!isTimerActive);
    // In a real app, this would start/stop the actual timer
  };

  const handleRoleSwitch = (role) => {
    switchRole(role);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          {/* Search */}
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks, projects, or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Timer (for employees) */}
          {user?.role === 'employee' && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
              <Timer className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-mono text-gray-900">{timerTime}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleTimerToggle}
                className="p-1"
              >
                {isTimerActive ? (
                  <Pause className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
              </Button>
            </div>
          )}

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Notifications</h4>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Mark all read
                  </Button>
                </div>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {notification.message}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name?.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {user?.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* Role Switcher (for demo purposes) */}
              <DropdownMenuLabel className="text-xs text-gray-500">
                Switch Role (Demo)
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleRoleSwitch('employee')}>
                <User className="mr-2 h-4 w-4" />
                Employee
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleSwitch('manager')}>
                <User className="mr-2 h-4 w-4" />
                Manager
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleSwitch('admin')}>
                <User className="mr-2 h-4 w-4" />
                Admin
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

