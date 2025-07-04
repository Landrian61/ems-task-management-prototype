"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Play,
  MessageSquare,
  Paperclip,
  Flag,
  X,
  Plus,
  Download,
  Eye,
  User,
  Tag,
  Activity,
  FileText,
  Send,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const ViewTaskDetails = ({ task, isOpen, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock comments data
  const comments = [
    {
      id: 1,
      author: "John Doe",
      authorId: 1,
      content: "Started working on the wireframes. The new design looks promising!",
      timestamp: "2024-07-20T10:30:00Z",
      edited: false,
    },
    {
      id: 2,
      author: "Jane Smith",
      authorId: 2,
      content: "Great progress! I've reviewed the initial mockups and they align well with our brand guidelines.",
      timestamp: "2024-07-20T14:15:00Z",
      edited: false,
    },
    {
      id: 3,
      author: "Alice Johnson",
      authorId: 3,
      content: "Added some feedback in the Figma file. Please check the annotations on the header section.",
      timestamp: "2024-07-21T09:45:00Z",
      edited: true,
    },
  ]

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "status_change",
      author: "John Doe",
      description: "changed status from To Do to In Progress",
      timestamp: "2024-07-20T09:00:00Z",
    },
    {
      id: 2,
      type: "comment",
      author: "Jane Smith",
      description: "added a comment",
      timestamp: "2024-07-20T14:15:00Z",
    },
    {
      id: 3,
      type: "time_logged",
      author: "John Doe",
      description: "logged 4.5 hours",
      timestamp: "2024-07-21T17:30:00Z",
    },
    {
      id: 4,
      type: "attachment",
      author: "Alice Johnson",
      description: "added 2 attachments",
      timestamp: "2024-07-21T11:20:00Z",
    },
  ]

  // Mock attachments data
  const attachments = [
    {
      id: 1,
      name: "wireframes_v2.fig",
      size: "2.4 MB",
      type: "figma",
      uploadedBy: "John Doe",
      uploadedAt: "2024-07-20T10:30:00Z",
    },
    {
      id: 2,
      name: "design_specs.pdf",
      size: "1.8 MB",
      type: "pdf",
      uploadedBy: "Alice Johnson",
      uploadedAt: "2024-07-21T11:20:00Z",
    },
  ]

  if (!task) return null

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
        return <Flag className="h-4 w-4 text-red-600" />
      case "medium":
        return <Flag className="h-4 w-4 text-yellow-600" />
      case "low":
        return <Flag className="h-4 w-4 text-green-600" />
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

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const handleSave = () => {
    onUpdate?.(editedTask)
    setIsEditing(false)
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log("Adding comment:", newComment)
      setNewComment("")
    }
  }

  const daysUntilDeadline = getDaysUntilDeadline(task.deadline)
  const progressPercentage = getProgressPercentage(task)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="relative w-[95vw] max-w-7xl h-[90vh] bg-white rounded-xl shadow-2xl border border-gray-200 flex overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Left Panel - Task Details */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 pr-12">{task.title}</h1>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="comments" className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Comments ({comments.length})</span>
                </TabsTrigger>
                <TabsTrigger value="attachments" className="flex items-center space-x-2">
                  <Paperclip className="h-4 w-4" />
                  <span>Files ({attachments.length})</span>
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Activity</span>
                </TabsTrigger>
              </TabsList>

              <div className="space-y-6">
                <TabsContent value="overview" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                      <Card className="shadow-none border bg-gray-50">
                        <CardHeader>
                          <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {isEditing ? (
                            <Textarea
                              value={editedTask.description}
                              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                              className="min-h-[100px]"
                              placeholder="Task description..."
                            />
                          ) : (
                            <p className="text-gray-700 leading-relaxed">{task.description}</p>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="shadow-none border bg-gray-50">
                        <CardHeader>
                          <CardTitle>Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>Time Tracked</span>
                              <span className="font-medium">
                                {task.trackedHours}h / {task.estimatedHours}h ({Math.round(progressPercentage)}%)
                              </span>
                            </div>
                            <Progress value={progressPercentage} className="h-3" />
                            <div className="text-xs text-gray-500">
                              {task.estimatedHours - task.trackedHours > 0
                                ? `${task.estimatedHours - task.trackedHours}h remaining`
                                : "Time exceeded"}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-none border bg-gray-50">
                        <CardHeader>
                          <CardTitle>Tags</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {task.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="flex items-center space-x-1">
                                <Tag className="h-3 w-3" />
                                <span>{tag}</span>
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      <Card className="shadow-none border bg-gray-50">
                        <CardHeader>
                          <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Status</label>
                            {isEditing ? (
                              <Select
                                value={editedTask.status}
                                onValueChange={(value) => setEditedTask({ ...editedTask, status: value })}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="todo">To Do</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="review">Review</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="blocked">Blocked</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <div className="flex items-center space-x-2 mt-1">
                                {getStatusIcon(task.status)}
                                <Badge className={getStatusColor(task.status)}>{task.status.replace("-", " ")}</Badge>
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-600">Priority</label>
                            {isEditing ? (
                              <Select
                                value={editedTask.priority}
                                onValueChange={(value) => setEditedTask({ ...editedTask, priority: value })}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <div className="flex items-center space-x-2 mt-1">
                                {getPriorityIcon(task.priority)}
                                <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-600">Assignee</label>
                            <div className="flex items-center space-x-2 mt-1">
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
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-600">Project</label>
                            <p className="text-sm mt-1">{task.project}</p>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-600">Deadline</label>
                            {isEditing ? (
                              <Input
                                type="date"
                                value={editedTask.deadline}
                                onChange={(e) => setEditedTask({ ...editedTask, deadline: e.target.value })}
                                className="mt-1"
                              />
                            ) : (
                              <div className="mt-1">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm">{new Date(task.deadline).toLocaleDateString()}</span>
                                </div>
                                <div
                                  className={`text-xs mt-1 ${
                                    daysUntilDeadline < 3
                                      ? "text-red-600"
                                      : daysUntilDeadline < 7
                                        ? "text-yellow-600"
                                        : "text-gray-600"
                                  }`}
                                >
                                  {daysUntilDeadline > 0 ? `${daysUntilDeadline} days remaining` : "Overdue"}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="space-y-4 mt-0">
                  <Card className="shadow-none border bg-gray-50">
                    <CardHeader>
                      <CardTitle>Add Comment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-sm">You</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <Textarea
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[80px]"
                          />
                          <div className="flex justify-end">
                            <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                              <Send className="h-4 w-4 mr-2" />
                              Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {comments.map((comment) => (
                    <Card key={comment.id} className="shadow-none border bg-white">
                      <CardContent>
                        <div className="flex space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-sm">
                              {comment.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm">{comment.author}</span>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span>{formatTimestamp(comment.timestamp)}</span>
                                {comment.edited && <span>(edited)</span>}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="attachments" className="space-y-4 mt-0">
                  <Card className="shadow-none border bg-gray-50">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Attachments ({attachments.length})</CardTitle>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add File
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
                        {attachments.map((attachment) => (
                          <Card key={attachment.id} className="shadow-none border bg-white">
                            <CardContent>
                              <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Paperclip className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm">{attachment.name}</h4>
                                    <p className="text-xs text-gray-500">{attachment.size}</p>
                                    <p className="text-xs text-gray-500">
                                      Uploaded by {attachment.uploadedBy} on{" "}
                                      {new Date(attachment.uploadedAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4 mt-0">
                  <Card className="shadow-none border bg-gray-50">
                    <CardHeader>
                      <CardTitle>Activity Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activities.map((activity, index) => (
                          <div key={activity.id} className="flex space-x-3">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              {index !== activities.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-sm">{activity.author}</span>
                                <span className="text-sm text-gray-600">{activity.description}</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{formatTimestamp(activity.timestamp)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Right Panel - Activity */}
        <div className="w-80 border-l border-gray-200 flex flex-col bg-gray-50">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="text-lg font-semibold">Activity</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.map((comment, index) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                    {comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">{formatTimestamp(comment.timestamp)}</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex space-x-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="text-xs">You</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-2"
                />
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTaskDetails
