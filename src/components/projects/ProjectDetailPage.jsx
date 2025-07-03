"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import {
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Target,
  TrendingUp,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  User,
  ChevronRight,
  ListTodo,
  Zap,
  Activity,
} from "lucide-react"
import { Progress } from "../ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import CreateTaskForm from "../tasks/CreateTaskForm"
import CreateSubTaskForm from "../tasks/CreateSubTaskForm"

const mockProjects = [
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
]

const mockTasks = [
  {
    id: 1,
    title: "Design new user interface",
    description: "Create wireframes and mockups for the new mobile interface",
    status: "in-progress",
    priority: "high",
    assignee: "Jane Smith",
    deadline: "2024-07-25",
    estimatedHours: 40,
    trackedHours: 25,
    tags: ["UI/UX", "Design", "Mobile"],
    projectId: 1,
    subtasks: [
      {
        id: 101,
        title: "Create wireframes",
        status: "completed",
        assignee: "Jane Smith",
        deadline: "2024-07-20",
        parentTaskId: 1,
      },
      {
        id: 102,
        title: "Design mockups",
        status: "in-progress",
        assignee: "Jane Smith",
        deadline: "2024-07-25",
        parentTaskId: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Implement authentication system",
    description: "Build secure login and registration functionality",
    status: "todo",
    priority: "high",
    assignee: "John Doe",
    deadline: "2024-08-01",
    estimatedHours: 32,
    trackedHours: 0,
    tags: ["Backend", "Security", "API"],
    projectId: 1,
    subtasks: [
      {
        id: 201,
        title: "Setup JWT authentication",
        status: "todo",
        assignee: "John Doe",
        deadline: "2024-07-28",
        parentTaskId: 2,
      },
      {
        id: 202,
        title: "Create user registration API",
        status: "todo",
        assignee: "John Doe",
        deadline: "2024-08-01",
        parentTaskId: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Database optimization",
    description: "Optimize database queries and improve performance",
    status: "completed",
    priority: "medium",
    assignee: "Alice Johnson",
    deadline: "2024-07-15",
    estimatedHours: 24,
    trackedHours: 28,
    tags: ["Database", "Performance", "Backend"],
    projectId: 1,
    subtasks: [],
  },
]

const ProjectDetailPage = ({ projectId, setActiveRoute }) => {
  const [activeTab, setActiveTab] = useState("details")
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showSubtaskForm, setShowSubtaskForm] = useState(false)
  const [selectedParentTask, setSelectedParentTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const project = mockProjects.find((p) => String(p.id) === String(projectId))
  const projectTasks = mockTasks.filter((task) => task.projectId === Number.parseInt(projectId))
  const allSubtasks = mockTasks.flatMap((task) =>
    task.subtasks.map((subtask) => ({
      ...subtask,
      parentTask: task.title,
    })),
  )

  if (!project) return <div className="p-8 text-center text-gray-500">Project not found.</div>

  const daysUntilDeadline = (() => {
    const today = new Date()
    const deadlineDate = new Date(project.deadline)
    const diffTime = deadlineDate - today
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  })()

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "review":
      case "todo":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 90) return "bg-green-500"
    if (progress >= 70) return "bg-blue-500"
    if (progress >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  const filteredTasks = projectTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredSubtasks = allSubtasks.filter((subtask) => {
    const matchesSearch = subtask.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || subtask.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateSubtask = (parentTask) => {
    setSelectedParentTask(parentTask)
    setShowSubtaskForm(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <button
            className="group flex items-center text-slate-600 hover:text-blue-600 font-medium mb-6 transition-colors duration-200"
            onClick={() => setActiveRoute && setActiveRoute("projects")}
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Projects
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{project.name}</h1>
              <p className="text-slate-600 text-lg">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={`${getStatusColor(project.status)} capitalize font-medium px-3 py-1`}>
                {project.status}
              </Badge>
              <Badge className={`${getPriorityColor(project.priority)} capitalize font-medium px-3 py-1`}>
                {project.priority} Priority
              </Badge>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-white shadow-sm border">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Project Details
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <ListTodo className="h-4 w-4" />
              Tasks ({projectTasks.length})
            </TabsTrigger>
            <TabsTrigger value="subtasks" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Subtasks ({allSubtasks.length})
            </TabsTrigger>
          </TabsList>

          {/* Project Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Progress Overview Card */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Progress Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Progress Bar Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                        <span className="text-2xl font-bold text-slate-900">{project.progress}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={project.progress} className="h-3 bg-slate-200" />
                        <div
                          className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(project.progress)}`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Task Statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-blue-700">Completed</p>
                            <p className="text-2xl font-bold text-blue-900">{project.tasksCompleted}</p>
                          </div>
                          <CheckCircle className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-700">Remaining</p>
                            <p className="text-2xl font-bold text-slate-900">
                              {project.tasksTotal - project.tasksCompleted}
                            </p>
                          </div>
                          <Target className="h-8 w-8 text-slate-600" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-green-700">Total Tasks</p>
                            <p className="text-2xl font-bold text-green-900">{project.tasksTotal}</p>
                          </div>
                          <AlertCircle className="h-8 w-8 text-green-600" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Project Details Sidebar */}
              <div className="space-y-6">
                {/* Project Info Card */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-slate-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-700">Project Manager</p>
                          <p className="text-slate-900 font-medium">{project.manager}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-700">Deadline</p>
                          <p className="text-slate-900 font-medium">{project.deadline}</p>
                          <p
                            className={`text-sm font-medium ${
                              daysUntilDeadline < 0
                                ? "text-red-600"
                                : daysUntilDeadline < 7
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          >
                            {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : "Overdue"}
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-slate-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-700">Team Size</p>
                          <p className="text-slate-900 font-medium">{project.members} members</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats Card */}
                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-white">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Completion Rate</span>
                        <span className="font-bold text-xl">
                          {Math.round((project.tasksCompleted / project.tasksTotal) * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Days Active</span>
                        <span className="font-bold text-xl">
                          {Math.abs(Math.ceil((new Date() - new Date("2024-01-01")) / (1000 * 60 * 60 * 24)))}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Team Efficiency</span>
                        <span className="font-bold text-xl">
                          {project.progress > 75 ? "High" : project.progress > 50 ? "Good" : "Fair"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            {/* Tasks Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Project Tasks</h2>
                <p className="text-slate-600">Manage and track all tasks for this project</p>
              </div>
              <Button
                onClick={() => setShowTaskForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Task
              </Button>
            </div>

            {/* Search and Filter */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <Filter className="h-4 w-4" />
                      Status: {statusFilter === "all" ? "All" : statusFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("todo")}>To Do</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>In Progress</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>

            {/* Tasks List */}
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card
                  key={task.id}
                  className="shadow-sm hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
                          <Badge className={`${getStatusColor(task.status)} text-xs`}>
                            {task.status.replace("-", " ")}
                          </Badge>
                          <Badge className={`${getPriorityColor(task.priority)} text-xs`}>{task.priority}</Badge>
                        </div>
                        <p className="text-slate-600 mb-3">{task.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {task.assignee}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {task.deadline}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {task.trackedHours}h / {task.estimatedHours}h
                          </div>
                          <div className="flex items-center gap-1">
                            <ListTodo className="h-4 w-4" />
                            {task.subtasks.length} subtasks
                          </div>
                        </div>

                        {task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {task.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleCreateSubtask(task)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Subtask
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete Task</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTasks.length === 0 && (
              <Card className="p-12 text-center bg-white/80 backdrop-blur-sm">
                <ListTodo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Get started by creating your first task for this project"}
                </p>
                {!searchTerm && statusFilter === "all" && (
                  <Button onClick={() => setShowTaskForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Task
                  </Button>
                )}
              </Card>
            )}
          </TabsContent>

          {/* Subtasks Tab */}
          <TabsContent value="subtasks" className="space-y-6">
            {/* Subtasks Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">All Subtasks</h2>
                <p className="text-slate-600">View and manage subtasks across all project tasks</p>
              </div>
            </div>

            {/* Search and Filter */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search subtasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <Filter className="h-4 w-4" />
                      Status: {statusFilter === "all" ? "All" : statusFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("todo")}>To Do</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>In Progress</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>

            {/* Subtasks List */}
            <div className="space-y-4">
              {filteredSubtasks.map((subtask) => (
                <Card
                  key={subtask.id}
                  className="shadow-sm hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{subtask.title}</h3>
                          <Badge className={`${getStatusColor(subtask.status)} text-xs`}>
                            {subtask.status.replace("-", " ")}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
                          <span>Parent Task:</span>
                          <ChevronRight className="h-4 w-4" />
                          <span className="font-medium">{subtask.parentTask}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {subtask.assignee}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {subtask.deadline}
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit Subtask</DropdownMenuItem>
                          <DropdownMenuItem>View Parent Task</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete Subtask</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSubtasks.length === 0 && (
              <Card className="p-12 text-center bg-white/80 backdrop-blur-sm">
                <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No subtasks found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Subtasks will appear here when you create them from the Tasks tab"}
                </p>
                <Button onClick={() => setActiveTab("tasks")}>
                  <ListTodo className="h-4 w-4 mr-2" />
                  Go to Tasks
                </Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Task Creation Form Modal */}
        {showTaskForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] overflow-hidden">
              <CreateTaskForm onClose={() => setShowTaskForm(false)} projectId={projectId} />
            </div>
          </div>
        )}

        {/* Subtask Creation Form Modal */}
        {showSubtaskForm && selectedParentTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] overflow-hidden">
              <CreateSubTaskForm
                onClose={() => {
                  setShowSubtaskForm(false)
                  setSelectedParentTask(null)
                }}
                parentTask={selectedParentTask}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetailPage
