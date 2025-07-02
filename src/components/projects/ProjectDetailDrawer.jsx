import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { X, Users, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Progress } from '../ui/progress';

const ProjectDetailDrawer = ({ project, onClose }) => {
  if (!project) return null;
  const daysUntilDeadline = (() => {
    const today = new Date();
    const deadlineDate = new Date(project.deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  })();
  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-white border-b flex items-center justify-between px-6 py-4">
        <h2 className="text-xl font-bold truncate">{project.name}</h2>
        <button
          className="text-gray-500 hover:text-gray-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
    </div>
  );
};

export default ProjectDetailDrawer; 