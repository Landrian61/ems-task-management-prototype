import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { X, Users, Calendar, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Progress } from '../ui/progress';

const mockProjects = [
  {
    id: 1,
    name: 'Mobile App Redesign',
    description: 'Complete redesign of the mobile application with new UI/UX',
    manager: 'Jane Smith',
    deadline: '2024-08-15',
    progress: 75,
    status: 'active',
    members: 5,
    tasksTotal: 24,
    tasksCompleted: 18,
    priority: 'high'
  },
  {
    id: 2,
    name: 'Database Migration',
    description: 'Migrate legacy database to new cloud infrastructure',
    manager: 'John Doe',
    deadline: '2024-07-30',
    progress: 45,
    status: 'active',
    members: 3,
    tasksTotal: 16,
    tasksCompleted: 7,
    priority: 'medium'
  },
  {
    id: 3,
    name: 'API Documentation',
    description: 'Create comprehensive API documentation for developers',
    manager: 'Alice Johnson',
    deadline: '2024-09-01',
    progress: 90,
    status: 'review',
    members: 2,
    tasksTotal: 12,
    tasksCompleted: 11,
    priority: 'low'
  },
  {
    id: 4,
    name: 'Security Audit',
    description: 'Complete security audit and vulnerability assessment',
    manager: 'Bob Wilson',
    deadline: '2024-07-20',
    progress: 100,
    status: 'completed',
    members: 4,
    tasksTotal: 20,
    tasksCompleted: 20,
    priority: 'high'
  }
];

const ProjectDetailPage = ({ projectId, setActiveRoute }) => {
  const project = mockProjects.find(p => String(p.id) === String(projectId));
  if (!project) return <div className="p-8 text-center text-gray-500">Project not found.</div>;
  const daysUntilDeadline = (() => {
    const today = new Date();
    const deadlineDate = new Date(project.deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  })();
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center mb-8">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mr-4"
          onClick={() => setActiveRoute && setActiveRoute('projects')}
        >
          <ArrowLeft className="h-5 w-5 mr-1" /> Back to Projects
        </button>
        <h1 className="text-2xl font-bold flex-1 truncate">{project.name}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 font-medium">Manager:</span> {project.manager}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 font-medium">Deadline:</span> {project.deadline}
              <span className={daysUntilDeadline < 0 ? 'text-red-600' : daysUntilDeadline < 7 ? 'text-yellow-600' : 'text-gray-600'}>
                ({daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Overdue'})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-gray-600 font-medium">Status:</span> {project.status}
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-gray-600 font-medium">Priority:</span> {project.priority}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-medium">{project.tasksCompleted}</span> of{' '}
            <span className="font-medium">{project.tasksTotal}</span> tasks completed
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Team Members:</span> {project.members}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetailPage; 