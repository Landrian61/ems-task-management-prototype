"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle,
  Play,
  MessageSquare,
  Paperclip,
  Flag,
  Grid3X3,
  BarChart3,
  CalendarDays,
  Layout,
  TrendingUp,
  Target,
} from "lucide-react"
import ViewTaskDetails from "./TaskDetails"

const EnhancedTaskViews = ({ setActiveRoute }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
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

  // Card Grid View Component
  const CardGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTasks.map((task) => {
        const daysUntilDeadline = getDaysUntilDeadline(task.deadline)
        const progressPercentage = getProgressPercentage(task)

        return (
          <Card key={task.id} className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getPriorityIcon(task.priority)}
                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setActiveRoute && setActiveRoute(`task-detail:${task.id}`)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-lg leading-tight">{task.title}</CardTitle>
              <CardDescription className="line-clamp-2">{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(task.status)}
                  <Badge className={getStatusColor(task.status)}>{task.status.replace("-", " ")}</Badge>
                </div>
                <span className="text-sm text-gray-500">{task.project}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {task.assignee
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">{task.assignee}</span>
                </div>
                <div
                  className={`text-sm ${
                    daysUntilDeadline < 3 ? "text-red-600" : daysUntilDeadline < 7 ? "text-yellow-600" : "text-gray-600"
                  }`}
                >
                  <Calendar className="h-3 w-3 inline mr-1" />
                  {daysUntilDeadline > 0 ? `${daysUntilDeadline}d` : "Overdue"}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">
                    {task.trackedHours}h / {task.estimatedHours}h
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex space-x-4 text-xs text-gray-500">
                  {task.comments > 0 && (
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{task.comments}</span>
                    </div>
                  )}
                  {task.attachments > 0 && (
                    <div className="flex items-center space-x-1">
                      <Paperclip className="h-3 w-3" />
                      <span>{task.attachments}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {task.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600 mt-1">Manage and track all your tasks with multiple view options</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
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
            <SelectTrigger className="w-32">
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
      </div>

      {/* Cards View Only */}
      <CardGridView />

      {/* Empty State */}
      {filteredTasks.length === 0 && (
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
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </div>
      )}
    </div>
  )
}

export default EnhancedTaskViews
