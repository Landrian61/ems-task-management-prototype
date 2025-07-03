"use client"

import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Calendar, MessageSquare, Paperclip, MoreHorizontal, Flag, Plus, Link2 } from "lucide-react"

const KanbanBoard = ({ tasks, onTaskClick }) => {
  const { hasPermission } = useAuth()
  const [draggedTask, setDraggedTask] = useState(null)

  const columns = [
    {
      id: "todo",
      title: "OPEN",
      color: "bg-gray-50",
      headerColor: "bg-gray-100",
      textColor: "text-gray-700",
      borderColor: "border-gray-200",
    },
    {
      id: "pending",
      title: "PENDING",
      color: "bg-red-50",
      headerColor: "bg-red-500",
      textColor: "text-white",
      borderColor: "border-red-200",
    },
    {
      id: "in-progress",
      title: "IN PROGRESS",
      color: "bg-yellow-50",
      headerColor: "bg-yellow-500",
      textColor: "text-white",
      borderColor: "border-yellow-200",
    },
    {
      id: "review",
      title: "REVIEW",
      color: "bg-purple-50",
      headerColor: "bg-purple-500",
      textColor: "text-white",
      borderColor: "border-purple-200",
    },
    {
      id: "completed",
      title: "COMPLETED",
      color: "bg-green-50",
      headerColor: "bg-green-500",
      textColor: "text-white",
      borderColor: "border-green-200",
    },
  ]

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "text-red-600"
      case "high":
        return "text-orange-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getPriorityFlag = (priority) => {
    const colorClass = getPriorityColor(priority)
    return <Flag className={`h-3 w-3 ${colorClass} fill-current`} />
  }

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleDragStart = (e, task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e, newStatus) => {
    e.preventDefault()
    if (draggedTask && draggedTask.status !== newStatus) {
      console.log(`Moving task ${draggedTask.id} from ${draggedTask.status} to ${newStatus}`)
      draggedTask.status = newStatus
    }
    setDraggedTask(null)
  }

  const TaskCard = ({ task }) => {
    const daysUntilDeadline = getDaysUntilDeadline(task.deadline)

    // Generate consistent colors for assignees
    const getAssigneeColor = (name) => {
      const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-teal-500",
        "bg-orange-500",
        "bg-red-500",
      ]
      const index = name.charCodeAt(0) % colors.length
      return colors[index]
    }

    const assigneeColor = getAssigneeColor(task.assignee)
    const initials = task.assignee
      .split(" ")
      .map((n) => n[0])
      .join("")

    return (
      <div
        className="bg-white border border-gray-200 rounded-lg p-3 mb-2 cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:border-gray-300 transition-all duration-200 ease-in-out group"
        onClick={() => onTaskClick && onTaskClick(task)}
        draggable
        onDragStart={(e) => handleDragStart(e, task)}
      >
        {/* Task Title */}
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-900 leading-tight hover:text-blue-600 hover:underline cursor-pointer transition-colors duration-200">
            {task.title}
          </h4>
        </div>

        {/* Task Meta Information */}
        <div className="space-y-2">
          {/* Assignee and Due Date Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full ${assigneeColor} flex items-center justify-center`}>
                <span className="text-xs font-medium text-white">{initials}</span>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>
                {new Date(task.deadline).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Priority and Subtasks Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {getPriorityFlag(task.priority)}
              <span className={`text-xs font-medium capitalize ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>

            {task.subtasks && task.subtasks > 0 && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Link2 className="h-3 w-3" />
                <span>{task.subtasks} subtasks</span>
              </div>
            )}
          </div>

          {/* Comments and Attachments */}
          {(task.comments > 0 || task.attachments > 0) && (
            <div className="flex items-center space-x-3 pt-1">
              {task.comments > 0 && (
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <MessageSquare className="h-3 w-3" />
                  <span>{task.comments}</span>
                </div>
              )}
              {task.attachments > 0 && (
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Paperclip className="h-3 w-3" />
                  <span>{task.attachments}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.id)
        return (
          <div
            key={column.id}
            className={`flex-shrink-0 w-80 ${column.color} rounded-lg`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div
              className={`${column.headerColor} ${column.textColor} px-4 py-3 rounded-t-lg flex items-center justify-between`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold tracking-wide">{column.title}</span>
                <span className="bg-white bg-opacity-20 text-xs px-2 py-0.5 rounded-full">{columnTasks.length}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-current hover:bg-white hover:bg-opacity-20"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Tasks Container */}
            <div className="p-3 min-h-[400px]">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}

              {/* Add Task Button */}
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg py-6"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard
