# EMS Task Management System - Frontend Mockup

A comprehensive frontend mockup for an Employee Management System (EMS) Task Management feature, built with React, Vite, and modern UI components.

## 🚀 Features Implemented

### 🔐 Authentication & Authorization
- **Role-Based Access Control (RBAC)** with three user roles:
  - **Employee**: Basic task management and time tracking
  - **Manager**: Project creation, task assignment, and team oversight
  - **Admin**: Full system access including user management and settings
- **Dynamic UI** that adapts based on user permissions
- **Role switching** for demonstration purposes

### 📊 Dashboard
- **Personalized welcome** with role-specific content
- **Key metrics cards** showing active tasks, time tracked, team performance
- **Interactive charts** using Recharts:
  - Task status distribution (pie chart)
  - Weekly workload trends (bar chart)
  - Team performance metrics (line chart)
- **Recent activity feed** with real-time updates
- **Quick action buttons** for common tasks

### 📁 Project Management
- **Project creation form** with comprehensive fields:
  - Project name, description, goals
  - Deadline selection with date picker
  - Priority levels (High, Medium, Low)
  - Team member assignment with search functionality
- **Project list view** with filtering and sorting:
  - Filter by status, manager, deadline
  - Progress indicators and completion rates
  - Team member count and deadline warnings
- **Project cards** with visual progress bars and status badges

### ✅ Task Management
- **Dual view modes**:
  - **Kanban Board**: Drag-and-drop task management across status columns
  - **Table View**: Detailed task list with sortable columns
- **Comprehensive task creation**:
  - Task title, description, and project assignment
  - Assignee selection with user search
  - Priority levels with visual indicators
  - Estimated hours and deadline setting
  - Custom tags with auto-suggestions
  - Subtask creation capability
- **Advanced filtering**:
  - Search by keywords, tags, or descriptions
  - Filter by status, priority, assignee, project
  - Date range filtering for deadlines
- **Task status management**:
  - To Do, In Progress, Review, Blocked, Completed
  - Visual status indicators and color coding
  - Progress tracking with time estimates

### ⏱️ Time Tracking
- **Real-time timer** with start, pause, resume, and stop functionality
- **Active task display** with session time tracking
- **Screenshot integration** indicators (simulated)
- **Daily and weekly statistics**:
  - Total time tracked
  - Tasks worked on
  - Productivity metrics
  - Screenshot count
- **Work session notes** for completed time entries
- **Weekly overview** with target vs. actual hours
- **Idle time detection** and break management

### 📈 Reports & Analytics
- **Comprehensive reporting dashboard** with multiple tabs:
  - **Overview**: Task completion trends and status distribution
  - **Team Performance**: Comparative team metrics and efficiency
  - **Time Tracking**: Daily hours vs. productive time analysis
  - **Productivity**: Individual employee performance metrics
- **Interactive charts and visualizations**:
  - Bar charts for task completion trends
  - Pie charts for status and priority distribution
  - Area charts for time tracking analysis
  - Performance comparison tables
- **Export functionality** for CSV and PDF reports
- **Advanced filtering** by date range, project, and team

### 👥 User Management (Admin Only)
- **User account management**:
  - Add new users with role assignment
  - Edit user information and roles
  - Activate/deactivate user accounts
  - Delete user accounts with confirmation
- **User statistics** and activity tracking
- **Role management** with permission-based access
- **User invitation system** (simulated)

### ⚙️ Settings & Configuration
- **Notification preferences**:
  - Email notifications toggle
  - Task assignment alerts
  - Deadline reminders
  - Status update notifications
  - Weekly report subscriptions
- **Time tracking settings**:
  - Screenshot interval configuration
  - Idle timeout settings
  - Working hours definition
  - Automatic break detection
- **System configuration**:
  - Default task priority settings
  - Auto-assignment preferences
  - Time estimate requirements
  - Subtask permissions
- **Custom tag management**:
  - Add/remove custom tags
  - Tag organization and categorization

### 🎨 UI/UX Features
- **Responsive design** that works on desktop, tablet, and mobile
- **Modern component library** using Radix UI and Tailwind CSS
- **Consistent design language** with proper color schemes and typography
- **Interactive elements**:
  - Hover states and transitions
  - Loading states and animations
  - Toast notifications for user feedback
  - Modal dialogs for forms and confirmations
- **Accessibility features**:
  - Keyboard navigation support
  - Screen reader compatibility
  - High contrast color schemes
  - Focus management

### 🔔 Notification System
- **In-app notifications** with unread count badges
- **Notification center** with categorized alerts
- **Real-time updates** for task assignments and status changes
- **Toast notifications** for immediate feedback
- **Microsoft Teams integration** (conceptual UI)

## 🏗️ Technical Architecture

### Frontend Stack
- **React 19.1.0** with modern hooks and functional components
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible component primitives
- **Recharts** for data visualization
- **Lucide React** for consistent iconography
- **React Hook Form** for form management
- **Date-fns** for date manipulation

### Component Structure
```
src/
├── components/
│   ├── admin/
│   │   └── UserManagement.jsx
│   ├── dashboard/
│   │   └── Dashboard.jsx
│   ├── layout/
│   │   ├── AppRouter.jsx
│   │   ├── Header.jsx
│   │   ├── MainLayout.jsx
│   │   └── Sidebar.jsx
│   ├── projects/
│   │   ├── CreateProjectForm.jsx
│   │   └── ProjectList.jsx
│   ├── reports/
│   │   └── Reports.jsx
│   ├── settings/
│   │   └── Settings.jsx
│   ├── tasks/
│   │   ├── CreateTaskForm.jsx
│   │   ├── KanbanBoard.jsx
│   │   └── TaskList.jsx
│   ├── time-tracking/
│   │   └── TimeTracker.jsx
│   └── ui/ (Radix UI components)
├── contexts/
│   └── AuthContext.jsx
└── lib/
    └── utils.js
```

### State Management
- **React Context** for authentication and user state
- **Local state** with useState and useEffect hooks
- **Form state** managed with controlled components
- **Mock data** for demonstration purposes

## 🎯 Role-Based Features

### Employee Role
- View and manage assigned tasks
- Track time with timer functionality
- Add comments and attachments to tasks
- View personal dashboard and statistics
- Update task status and progress

### Manager Role
- All employee features plus:
- Create and manage projects
- Assign tasks to team members
- View team performance reports
- Approve task completions
- Access team analytics and insights

### Admin Role
- All manager features plus:
- Manage user accounts and roles
- Configure system settings
- Access comprehensive reports
- Manage custom tags and categories
- System-wide configuration options

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser with ES6+ support

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ems-task-management

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Demo Usage
1. The application starts with a **Manager** role by default
2. Use the **role switcher** in the header dropdown to test different permissions
3. Navigate through different sections using the sidebar
4. Create projects, tasks, and test the time tracking functionality
5. Explore the reports and analytics features

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+): Full feature set with sidebar navigation
- **Tablet** (768px-1199px): Collapsible sidebar with touch-friendly interface
- **Mobile** (320px-767px): Mobile-first design with bottom navigation

## 🔧 Customization

### Theming
- Tailwind CSS configuration for easy color scheme changes
- CSS custom properties for consistent spacing and typography
- Dark mode support (can be easily implemented)

### Component Extension
- Modular component architecture for easy feature additions
- Consistent prop interfaces across components
- Reusable UI components with variant support

## 📋 Future Enhancements

### Planned Features
- **Real-time collaboration** with WebSocket integration
- **File upload and attachment** management
- **Advanced search** with full-text indexing
- **Calendar integration** for deadline management
- **Mobile app** with React Native
- **Offline support** with service workers
- **Advanced analytics** with custom metrics
- **Integration APIs** for third-party tools

### Technical Improvements
- **State management** with Redux Toolkit or Zustand
- **API integration** with React Query
- **Testing suite** with Jest and React Testing Library
- **Storybook** for component documentation
- **Performance optimization** with code splitting
- **PWA features** for mobile experience

## 🤝 Contributing

This is a frontend mockup designed to demonstrate the complete feature set of an EMS Task Management System. The implementation focuses on UI/UX excellence and comprehensive functionality demonstration.

## 📄 License

This project is created as a demonstration mockup for the EMS Task Management System requirements.

---

**Note**: This is a frontend mockup with simulated data and functionality. In a production environment, this would be connected to a backend API for data persistence and real-time features.

