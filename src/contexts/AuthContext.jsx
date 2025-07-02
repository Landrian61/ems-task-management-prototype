import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data for demonstration
  const mockUsers = {
    employee: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'employee',
      avatar: '/api/placeholder/32/32'
    },
    manager: {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'manager',
      avatar: '/api/placeholder/32/32'
    },
    admin: {
      id: 3,
      name: 'Admin User',
      email: 'admin@company.com',
      role: 'admin',
      avatar: '/api/placeholder/32/32'
    }
  };

  useEffect(() => {
    // Simulate loading user data
    const savedUser = localStorage.getItem('ems_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Default to manager role for demo
      setUser(mockUsers.manager);
      localStorage.setItem('ems_user', JSON.stringify(mockUsers.manager));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password, role = 'manager') => {
    // Mock login logic
    const userData = mockUsers[role] || mockUsers.manager;
    setUser(userData);
    localStorage.setItem('ems_user', JSON.stringify(userData));
    return Promise.resolve(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ems_user');
  };

  const switchRole = (role) => {
    if (mockUsers[role]) {
      const userData = mockUsers[role];
      setUser(userData);
      localStorage.setItem('ems_user', JSON.stringify(userData));
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    
    const permissions = {
      employee: ['view_tasks', 'edit_own_tasks', 'track_time', 'add_comments'],
      manager: ['view_tasks', 'edit_own_tasks', 'track_time', 'add_comments', 'create_projects', 'assign_tasks', 'approve_tasks', 'view_reports'],
      admin: ['view_tasks', 'edit_own_tasks', 'track_time', 'add_comments', 'create_projects', 'assign_tasks', 'approve_tasks', 'view_reports', 'manage_users', 'system_config']
    };

    return permissions[user.role]?.includes(permission) || false;
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    switchRole,
    hasPermission,
    isEmployee: user?.role === 'employee',
    isManager: user?.role === 'manager',
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

