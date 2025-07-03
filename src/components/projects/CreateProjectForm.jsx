import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Calendar } from '../ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import {
  CalendarIcon,
  X,
  Plus,
  Users
} from 'lucide-react';

const CreateProjectForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: null,
    priority: '',
    goals: '',
    members: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock users for member selection
  const availableUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@company.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@company.com', role: 'Designer' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@company.com', role: 'QA Engineer' },
    { id: 4, name: 'Bob Wilson', email: 'bob.wilson@company.com', role: 'DevOps' },
    { id: 5, name: 'Carol Brown', email: 'carol.brown@company.com', role: 'Product Manager' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const addMember = (user) => {
    if (!formData.members.find(member => member.id === user.id)) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, user]
      }));
    }
  };

  const removeMember = (userId) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== userId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Project deadline is required';
    } else if (formData.deadline < new Date()) {
      newErrors.deadline = 'Deadline cannot be in the past';
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority is required';
    }

    if (formData.members.length === 0) {
      newErrors.members = 'At least one team member is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Creating project:', formData);
      
      // Show success message (in real app, would use toast notification)
      alert('Project created successfully!');
      
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-white border-b flex items-center justify-between px-6 py-4">
        <h2 className="text-xl font-bold">New Project</h2>
        <button
          className="text-gray-500 hover:text-gray-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Project Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Project Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter project name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Project Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Project Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe the project goals and objectives"
            rows={4}
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Deadline and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Deadline */}
          <div className="space-y-2">
            <Label>Project Deadline *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.deadline && "text-muted-foreground",
                    errors.deadline && "border-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.deadline ? format(formData.deadline, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.deadline}
                  onSelect={(date) => handleInputChange('deadline', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.deadline && (
              <p className="text-sm text-red-600">{errors.deadline}</p>
            )}
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label>Priority *</Label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
              <SelectTrigger className={errors.priority ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-sm text-red-600">{errors.priority}</p>
            )}
          </div>
        </div>

        {/* Project Goals */}
        <div className="space-y-2">
          <Label htmlFor="goals">Project Goals & Objectives</Label>
          <Textarea
            id="goals"
            value={formData.goals}
            onChange={(e) => handleInputChange('goals', e.target.value)}
            placeholder="List the main goals and objectives for this project"
            rows={3}
          />
        </div>

        {/* Team Members */}
        <div className="space-y-2">
          <Label>Team Members *</Label>
          
          {/* Selected Members */}
          {formData.members.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.members.map((member) => (
                <Badge key={member.id} variant="secondary" className="flex items-center gap-1">
                  {member.name}
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Add Members */}
          <Select onValueChange={(value) => {
            const user = availableUsers.find(u => u.id === parseInt(value));
            if (user) addMember(user);
          }}>
            <SelectTrigger className={errors.members ? 'border-red-500' : ''}>
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Add team members" />
            </SelectTrigger>
            <SelectContent>
              {availableUsers
                .filter(user => !formData.members.find(member => member.id === user.id))
                .map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-gray-500">{user.role} • {user.email}</span>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          
          {errors.members && (
            <p className="text-sm text-red-600">{errors.members}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;

