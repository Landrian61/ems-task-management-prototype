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
import { CalendarIcon, X, Plus, Tag, Clock, Flag, Users } from "lucide-react"

const CreateSubTaskForm = ({ onClose, parentTask = null, subtask = null, onUpdate }) => {
  const [formData, setFormData] = useState(subtask ? {
    title: subtask.title || "",
    description: subtask.description || "",
    assignee: subtask.assignee || "",
    deadline: subtask.deadline ? new Date(subtask.deadline) : null,
    priority: subtask.priority || "",
    estimatedHours: subtask.estimatedHours || "",
    tags: subtask.tags || [],
    parentTaskId: subtask.parentTaskId || parentTask?.id || null,
  } : {
    title: "",
    description: "",
    assignee: "",
    deadline: null,
    priority: "",
    estimatedHours: "",
    tags: [],
    parentTaskId: parentTask?.id || null,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newTag, setNewTag] = useState("")

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

  const users = [
    { id: 1, name: "John Doe", email: "john.doe@company.com", role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane.smith@company.com", role: "Designer" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@company.com", role: "QA Engineer" },
    { id: 4, name: "Bob Wilson", email: "bob.wilson@company.com", role: "DevOps" },
    { id: 5, name: "Carol Brown", email: "carol.brown@company.com", role: "Product Manager" },
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
      newErrors.title = "Subtask title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Subtask description is required"
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
      if (subtask) {
        // Edit mode
        const updatedSubtask = {
          ...subtask,
          ...formData,
          deadline: formData.deadline,
          updatedAt: new Date().toISOString(),
        }
        onUpdate && onUpdate(updatedSubtask)
        alert("Subtask updated successfully!")
      } else {
        // Create mode
        const taskData = {
          ...formData,
          id: Date.now(),
          status: "todo",
          trackedHours: 0,
          comments: 0,
          attachments: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        alert("Subtask created successfully!")
      }
      onClose()
    } catch (error) {
      alert(subtask ? "Error updating subtask. Please try again." : "Error creating subtask. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-white border-b flex items-center justify-between px-8 py-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{subtask ? "Edit Subtask" : "Create New Subtask"}</h2>
          <p className="text-slate-600 mt-1">{subtask ? "Update the details for this subtask" : "Add a subtask to break down your main task"}</p>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8">
          {/* Parent Task Info */}
          {parentTask && (
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">Creating subtask for:</p>
                  <p className="text-lg font-semibold text-blue-900">{parentTask.title}</p>
                  <p className="text-sm text-blue-700 mt-1">{parentTask.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Subtask Title */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-base font-semibold text-slate-900">
              Subtask Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter a clear and specific subtask title"
              className={`text-lg h-12 ${errors.title ? "border-red-500" : "border-slate-300"}`}
            />
            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
          </div>

          {/* Subtask Description */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-base font-semibold text-slate-900">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe what needs to be done for this subtask..."
              rows={6}
              className={`text-base resize-none ${errors.description ? "border-red-500" : "border-slate-300"}`}
            />
            {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
          </div>

          {/* Assignee */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-slate-900">Assignee *</Label>
            <Select value={formData.assignee} onValueChange={(value) => handleInputChange("assignee", value)}>
              <SelectTrigger className={`h-12 text-base ${errors.assignee ? "border-red-500" : "border-slate-300"}`}>
                <Users className="mr-3 h-5 w-5" />
                <SelectValue placeholder="Select who will work on this subtask" />
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
            {errors.assignee && <p className="text-sm text-red-600 mt-1">{errors.assignee}</p>}
          </div>

          {/* Deadline and Priority Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Deadline */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900">Deadline *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-12 text-base",
                      !formData.deadline && "text-muted-foreground",
                      errors.deadline && "border-red-500",
                    )}
                  >
                    <CalendarIcon className="mr-3 h-5 w-5" />
                    {formData.deadline ? format(formData.deadline, "PPP") : "Select deadline date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.deadline}
                    onSelect={(date) => handleInputChange("deadline", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.deadline && <p className="text-sm text-red-600 mt-1">{errors.deadline}</p>}
            </div>

            {/* Priority */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900">Priority *</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger className={`h-12 text-base ${errors.priority ? "border-red-500" : "border-slate-300"}`}>
                  <Flag className="mr-3 h-5 w-5" />
                  <SelectValue placeholder="Select subtask priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      Low Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      Medium Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      High Priority
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && <p className="text-sm text-red-600 mt-1">{errors.priority}</p>}
            </div>
          </div>

          {/* Estimated Hours */}
          <div className="space-y-3">
            <Label htmlFor="estimatedHours" className="text-base font-semibold text-slate-900">
              Estimated Hours
            </Label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="estimatedHours"
                type="number"
                min="0"
                step="0.5"
                value={formData.estimatedHours}
                onChange={(e) => handleInputChange("estimatedHours", e.target.value)}
                placeholder="0"
                className={`pl-12 h-12 text-base ${errors.estimatedHours ? "border-red-500" : "border-slate-300"}`}
              />
            </div>
            {errors.estimatedHours && <p className="text-sm text-red-600 mt-1">{errors.estimatedHours}</p>}
            <p className="text-sm text-slate-500">Optional: Estimate how many hours this subtask will take</p>
          </div>

          {/* Tags Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-slate-900">Tags</Label>

            {/* Selected Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 p-4 bg-slate-50 rounded-lg border">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-2 px-3 py-1 text-sm">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:bg-gray-300 rounded-full p-1 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Common Tags */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Quick add tags:</p>
              <div className="flex flex-wrap gap-2">
                {commonTags
                  .filter((tag) => !formData.tags.includes(tag))
                  .map((tag) => (
                    <Button
                      key={tag}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTag(tag)}
                      className="text-sm hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      {tag}
                    </Button>
                  ))}
              </div>
            </div>

            {/* Custom Tag Input */}
            <div className="flex items-center space-x-3">
              <div className="relative flex-1">
                <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add custom tag"
                  className="pl-12 h-12 text-base"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddCustomTag()
                    }
                  }}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCustomTag}
                disabled={!newTag.trim()}
                className="h-12 px-6 bg-transparent"
              >
                Add Tag
              </Button>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="sticky bottom-0 bg-white border-t px-8 py-6">
          <div className="flex items-center justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-8 py-3 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? (subtask ? "Saving..." : "Creating Subtask...") : (subtask ? "Save Changes" : "Create Subtask")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateSubTaskForm
