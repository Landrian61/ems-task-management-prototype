"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Badge } from "../ui/badge"
import { cn } from "../../lib/utils"
import { format } from "date-fns"
import { CalendarIcon, X, Plus, Users, Tag, Clock, Flag } from "lucide-react"

const CreateTaskForm = ({ onClose, projectId }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    deadline: null,
    priority: "",
    estimatedHours: "",
    tags: [],
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newTag, setNewTag] = useState("")

  // Mock data
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@company.com", role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane.smith@company.com", role: "Designer" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@company.com", role: "QA Engineer" },
    { id: 4, name: "Bob Wilson", email: "bob.wilson@company.com", role: "DevOps" },
    { id: 5, name: "Carol Brown", email: "carol.brown@company.com", role: "Product Manager" },
  ]

  const commonTags = [
    "Frontend",
    "Backend",
    "UI/UX",
    "Database",
    "API",
    "Testing",
    "Documentation",
    "Security",
    "Mobile",
    "Performance",
    "Bug Fix",
    "Feature",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }))
    }
    setNewTag("")
  }

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleAddCustomTag = () => {
    if (newTag.trim()) {
      addTag(newTag.trim())
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Task description is required"
    }

    if (!formData.assignee) {
      newErrors.assignee = "Assignee is required"
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required"
    } else if (formData.deadline < new Date()) {
      newErrors.deadline = "Deadline cannot be in the past"
    }

    if (!formData.priority) {
      newErrors.priority = "Priority is required"
    }

    if (formData.estimatedHours && (isNaN(formData.estimatedHours) || formData.estimatedHours <= 0)) {
      newErrors.estimatedHours = "Estimated hours must be a positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const taskData = {
        ...formData,
        id: Date.now(), // Mock ID
        status: "todo",
        trackedHours: 0,
        projectId: Number.parseInt(projectId),
        subtasks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      console.log("Creating task:", taskData)

      // Show success message (in real app, would use toast notification)
      alert("Task created successfully!")

      onClose()
    } catch (error) {
      console.error("Error creating task:", error)
      alert("Error creating task. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-white border-b flex items-center justify-between px-6 py-4">
        <h2 className="text-xl font-bold">Create New Task</h2>
        <button
          className="text-gray-500 hover:text-gray-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Task Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Task Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter task title"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Task Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe the task requirements and objectives"
            rows={4}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Assignee */}
        <div className="space-y-2">
          <Label>Assignee *</Label>
          <Select value={formData.assignee} onValueChange={(value) => handleInputChange("assignee", value)}>
            <SelectTrigger className={errors.assignee ? "border-red-500" : ""}>
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select assignee" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.name}>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-gray-500">{user.role}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.assignee && <p className="text-sm text-red-600">{errors.assignee}</p>}
        </div>

        {/* Deadline, Priority, and Estimated Hours */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Deadline */}
          <div className="space-y-2">
            <Label>Deadline *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.deadline && "text-muted-foreground",
                    errors.deadline && "border-red-500",
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
                  onSelect={(date) => handleInputChange("deadline", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.deadline && <p className="text-sm text-red-600">{errors.deadline}</p>}
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label>Priority *</Label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
              <SelectTrigger className={errors.priority ? "border-red-500" : ""}>
                <Flag className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && <p className="text-sm text-red-600">{errors.priority}</p>}
          </div>

          {/* Estimated Hours */}
          <div className="space-y-2">
            <Label htmlFor="estimatedHours">Estimated Hours</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="estimatedHours"
                type="number"
                min="0"
                step="0.5"
                value={formData.estimatedHours}
                onChange={(e) => handleInputChange("estimatedHours", e.target.value)}
                placeholder="0"
                className={`pl-10 ${errors.estimatedHours ? "border-red-500" : ""}`}
              />
            </div>
            {errors.estimatedHours && <p className="text-sm text-red-600">{errors.estimatedHours}</p>}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>Tags</Label>

          {/* Selected Tags */}
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Common Tags */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Common tags:</p>
            <div className="flex flex-wrap gap-2">
              {commonTags
                .filter((tag) => !formData.tags.includes(tag))
                .slice(0, 8)
                .map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTag(tag)}
                    className="text-xs"
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    {tag}
                  </Button>
                ))}
            </div>
          </div>

          {/* Custom Tag Input */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add custom tag"
                className="pl-10"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddCustomTag()
                  }
                }}
              />
            </div>
            <Button type="button" variant="outline" onClick={handleAddCustomTag} disabled={!newTag.trim()}>
              Add
            </Button>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateTaskForm
