"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Users, Calendar, CheckCircle, AlertCircle, ArrowLeft, Target, TrendingUp } from "lucide-react"
import { Progress } from "../ui/progress"

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

const ProjectDetailPage = ({ projectId, setActiveRoute }) => {
  const project = mockProjects.find((p) => String(p.id) === String(projectId))

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
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "review":
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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

        {/* Main Content Grid */}
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
      </div>
    </div>
  )
}

export default ProjectDetailPage
