"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Clock, AlertTriangle, CheckCircle, Play, Flag, Target, Filter, SortAsc } from "lucide-react"

import ViewTaskDetails from "./TaskDetails"
import KanbanBoard from "./KanbanBoard"

const EnhancedTaskViews = ({ setActiveRoute }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [sortBy, setSortBy] = useState("deadline")
  const [selectedTask, setSelectedTask] = useState(null)
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false)

  // Mock task data
  const tasks = [
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
  ]

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "deadline":
        return new Date(a.deadline) - new Date(b.deadline)
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      case "title":
        return a.title.localeCompare(b.title)
      case "assignee":
        return a.assignee.localeCompare(b.assignee)
      default:
        return 0
    }
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "blocked":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <Flag className="h-3 w-3 text-red-600" />
      case "medium":
        return <Flag className="h-3 w-3 text-yellow-600" />
      case "low":
        return <Flag className="h-3 w-3 text-green-600" />
      default:
        return null
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "todo":
        return <Clock className="h-4 w-4 text-gray-500" />
      case "in-progress":
        return <Play className="h-4 w-4 text-blue-500" />
      case "review":
        return <Eye className="h-4 w-4 text-yellow-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "blocked":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getProgressPercentage = (task) => {
    return task.estimatedHours > 0 ? Math.min((task.trackedHours / task.estimatedHours) * 100, 100) : 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Aligned with Kanban boards */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
            <p className="text-gray-600 mt-1">
              {sortedTasks.length} tasks • {sortedTasks.filter((t) => t.status === "completed").length} completed
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-white"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40 bg-white">
                <Flag className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-white">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="assignee">Assignee</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        <KanbanBoard
          tasks={sortedTasks}
          onTaskClick={(task) => {
            setSelectedTask(task)
            setIsTaskDetailsOpen(true)
          }}
        />
      </div>

      {/* Task Details Modal */}
      <ViewTaskDetails task={selectedTask} isOpen={isTaskDetailsOpen} onClose={() => setIsTaskDetailsOpen(false)} />

      {/* Empty State */}
      {sortedTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || statusFilter !== "all" || priorityFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Get started by creating your first task"}
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </div>
      )}
    </div>
  )
}

export default EnhancedTaskViews
