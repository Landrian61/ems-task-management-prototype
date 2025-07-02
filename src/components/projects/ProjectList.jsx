"use client"

import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  FolderOpen,
  AlertTriangle,
} from "lucide-react"
import CreateProjectForm from "./CreateProjectForm"

const ProjectList = ({ setActiveRoute }) => {
  const { hasPermission } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    manager: "",
    deadline: "",
    status: "",
    priority: "",
    members: "",
  })

  // Mock project data
  const projects = [
    {
      id: 1,
      name: "Mobile App Redesign",
      description: "Complete redesign of the mobile application with new UI/UX",
      manager: "Jane Smith",
      deadline: "2024-08-15",
      progress: 75,
      status: "active",
      members: 5,
      tasksTotal: 24,
      tasksCompleted: 18,
      priority: "high",
    },
    {
      id: 2,
      name: "Database Migration",
      description: "Migrate legacy database to new cloud infrastructure",
      manager: "John Doe",
      deadline: "2024-07-30",
      progress: 45,
      status: "active",
      members: 3,
      tasksTotal: 16,
      tasksCompleted: 7,
      priority: "medium",
    },
    {
      id: 3,
      name: "API Documentation",
      description: "Create comprehensive API documentation for developers",
      manager: "Alice Johnson",
      deadline: "2024-09-01",
      progress: 90,
      status: "review",
      members: 2,
      tasksTotal: 12,
      tasksCompleted: 11,
      priority: "low",
    },
    {
      id: 4,
      name: "Security Audit",
      description: "Complete security audit and vulnerability assessment",
      manager: "Bob Wilson",
      deadline: "2024-07-20",
      progress: 100,
      status: "completed",
      members: 4,
      tasksTotal: 20,
      tasksCompleted: 20,
      priority: "high",
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "review":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "on-hold":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleEditProject = (project) => {
    setSelectedProject(project)
    setEditFormData({
      name: project.name,
      description: project.description,
      manager: project.manager,
      deadline: project.deadline,
      status: project.status,
      priority: project.priority,
      members: project.members.toString(),
    })
    setShowEditDialog(true)
  }

  const handleDeleteProject = (project) => {
    setSelectedProject(project)
    setShowDeleteDialog(true)
  }

  const handleEditFormChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveEdit = () => {
    // Here you would typically make an API call to update the project
    console.log("Saving project:", selectedProject.id, editFormData)
    setShowEditDialog(false)
    setSelectedProject(null)
  }

  const handleConfirmDelete = () => {
    // Here you would typically make an API call to delete the project
    console.log("Deleting project:", selectedProject.id)
    setShowDeleteDialog(false)
    setSelectedProject(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage and track all your projects</p>
        </div>

        {hasPermission("create_projects") && (
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Fill in the details to create a new project</DialogDescription>
              </DialogHeader>
              <CreateProjectForm onClose={() => setShowCreateDialog(false)} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="review">In Review</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const daysUntilDeadline = getDaysUntilDeadline(project.deadline)

          return (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">{project.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2 mt-3">
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{project.members} members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span
                      className={`${
                        daysUntilDeadline < 7
                          ? "text-red-600"
                          : daysUntilDeadline < 14
                            ? "text-yellow-600"
                            : "text-gray-600"
                      }`}
                    >
                      {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : "Overdue"}
                    </span>
                  </div>
                </div>

                {/* Tasks Summary */}
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{project.tasksCompleted}</span> of{" "}
                  <span className="font-medium">{project.tasksTotal}</span> tasks completed
                </div>

                {/* Manager */}
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Manager:</span> {project.manager}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setActiveRoute(`project-detail:${project.id}`)}
                  >
                    <Eye className="mr-2 h-3 w-3" />
                    View
                  </Button>
                  {hasPermission("create_projects") && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleEditProject(project)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Get started by creating your first project"}
          </p>
          {hasPermission("create_projects") && !searchQuery && statusFilter === "all" && (
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          )}
        </div>
      )}

      {/* Edit Project Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update the project details below</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={editFormData.name}
                onChange={(e) => handleEditFormChange("name", e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={editFormData.description}
                onChange={(e) => handleEditFormChange("description", e.target.value)}
                className="col-span-3"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-manager" className="text-right">
                Manager
              </Label>
              <Input
                id="edit-manager"
                value={editFormData.manager}
                onChange={(e) => handleEditFormChange("manager", e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-deadline" className="text-right">
                Deadline
              </Label>
              <Input
                id="edit-deadline"
                type="date"
                value={editFormData.deadline}
                onChange={(e) => handleEditFormChange("deadline", e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select value={editFormData.status} onValueChange={(value) => handleEditFormChange("status", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-priority" className="text-right">
                Priority
              </Label>
              <Select value={editFormData.priority} onValueChange={(value) => handleEditFormChange("priority", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-members" className="text-right">
                Members
              </Label>
              <Input
                id="edit-members"
                type="number"
                value={editFormData.members}
                onChange={(e) => handleEditFormChange("members", e.target.value)}
                className="col-span-3"
                min="1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Project Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Project
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="py-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{selectedProject.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{selectedProject.description}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span>Manager: {selectedProject.manager}</span>
                  <span>•</span>
                  <span>{selectedProject.members} members</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProjectList
