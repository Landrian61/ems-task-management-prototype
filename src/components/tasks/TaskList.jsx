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

const EnhancedTaskViews = () => {
  const [view, setView] = useState("cards")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

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
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Task
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

  // Timeline View Component
  const TimelineView = () => {
    const sortedTasks = [...filteredTasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline))

    return (
      <div className="space-y-6">
        {sortedTasks.map((task, index) => {
          const daysUntilDeadline = getDaysUntilDeadline(task.deadline)
          const progressPercentage = getProgressPercentage(task)

          return (
            <div key={task.id} className="relative">
              {index !== sortedTasks.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
              )}
              <div className="flex items-start space-x-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    task.status === "completed"
                      ? "bg-green-100"
                      : task.status === "in-progress"
                        ? "bg-blue-100"
                        : task.status === "blocked"
                          ? "bg-red-100"
                          : "bg-gray-100"
                  }`}
                >
                  {getStatusIcon(task.status)}
                </div>
                <Card className="flex-1 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getPriorityIcon(task.priority)}
                          <h3 className="font-semibold text-lg">{task.title}</h3>
                          <Badge className={getStatusColor(task.status)}>{task.status.replace("-", " ")}</Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{task.description}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Task
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {task.assignee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.assignee}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Project:</span> {task.project}
                      </div>
                      <div
                        className={`text-sm ${
                          daysUntilDeadline < 3
                            ? "text-red-600"
                            : daysUntilDeadline < 7
                              ? "text-yellow-600"
                              : "text-gray-600"
                        }`}
                      >
                        <Calendar className="h-3 w-3 inline mr-1" />
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          Progress: {task.trackedHours}h / {task.estimatedHours}h
                        </span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex space-x-4 text-sm text-gray-500">
                        {task.comments > 0 && (
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{task.comments} comments</span>
                          </div>
                        )}
                        {task.attachments > 0 && (
                          <div className="flex items-center space-x-1">
                            <Paperclip className="h-3 w-3" />
                            <span>{task.attachments} files</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Dashboard View Component
  const DashboardView = () => {
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1
      return acc
    }, {})

    const priorityCounts = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1
      return acc
    }, {})

    const totalHours = tasks.reduce((acc, task) => acc + task.trackedHours, 0)
    const totalEstimated = tasks.reduce((acc, task) => acc + task.estimatedHours, 0)

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600">{statusCounts["in-progress"] || 0}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Play className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{statusCounts["completed"] || 0}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hours Tracked</p>
                  <p className="text-3xl font-bold text-purple-600">{totalHours}h</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Priority Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(priorityCounts).map(([priority, count]) => (
                  <div key={priority} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(priority)}
                      <span className="capitalize font-medium">{priority}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            priority === "high"
                              ? "bg-red-500"
                              : priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${(count / tasks.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.slice(0, 4).map((task) => (
                  <div key={task.id} className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.status === "completed"
                          ? "bg-green-500"
                          : task.status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-gray-400"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                      <p className="text-xs text-gray-500">Updated {new Date(task.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <Badge className={getStatusColor(task.status)}>{task.status.replace("-", " ")}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layout className="h-5 w-5" />
              <span>All Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardGridView />
          </CardContent>
        </Card>
      </div>
    )
  }

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

      {/* View Toggle */}
      <Tabs value={view} onValueChange={setView}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center space-x-2">
            <Grid3X3 className="h-4 w-4" />
            <span>Cards</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center space-x-2">
            <CalendarDays className="h-4 w-4" />
            <span>Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center space-x-2">
            <Layout className="h-4 w-4" />
            <span>List</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <DashboardView />
        </TabsContent>

        <TabsContent value="cards" className="mt-6">
          <CardGridView />
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <TimelineView />
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const daysUntilDeadline = getDaysUntilDeadline(task.deadline)
              const progressPercentage = getProgressPercentage(task)

              return (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-3">
                          {getPriorityIcon(task.priority)}
                          <h3 className="font-semibold text-lg">{task.title}</h3>
                          <Badge className={getStatusColor(task.status)}>{task.status.replace("-", " ")}</Badge>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </div>

                        <p className="text-gray-600">{task.description}</p>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-xs">
                                {task.assignee
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{task.assignee}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Due {new Date(task.deadline).toLocaleDateString()}</span>
                          </div>
                          <span>{task.project}</span>
                          {task.comments > 0 && (
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{task.comments}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>
                                {task.trackedHours}h / {task.estimatedHours}h
                              </span>
                            </div>
                            <Progress value={progressPercentage} className="h-1.5" />
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {task.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Task
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Task
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

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
