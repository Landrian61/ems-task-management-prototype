import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Clock,
  Tag,
  Save,
  Plus,
  X
} from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      taskAssignments: true,
      deadlineReminders: true,
      statusUpdates: false,
      weeklyReports: true
    },
    timeTracking: {
      screenshotInterval: 5,
      idleTimeout: 15,
      autoBreaks: true,
      workingHours: {
        start: '09:00',
        end: '17:00'
      }
    },
    system: {
      defaultTaskPriority: 'medium',
      autoAssignTasks: false,
      requireTimeEstimates: true,
      allowSubtasks: true
    }
  });

  const [customTags, setCustomTags] = useState([
    'Frontend', 'Backend', 'UI/UX', 'Database', 'API', 'Testing', 
    'Documentation', 'Security', 'Mobile', 'Performance'
  ]);
  const [newTag, setNewTag] = useState('');

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleNestedSettingChange = (category, parentSetting, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parentSetting]: {
          ...prev[category][parentSetting],
          [setting]: value
        }
      }
    }));
  };

  const addCustomTag = () => {
    if (newTag.trim() && !customTags.includes(newTag.trim())) {
      setCustomTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeCustomTag = (tagToRemove) => {
    setCustomTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Configure system preferences and defaults
          </p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="time-tracking">Time Tracking</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'emailNotifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="task-assignments">Task Assignments</Label>
                    <p className="text-sm text-gray-600">Notify when tasks are assigned to you</p>
                  </div>
                  <Switch
                    id="task-assignments"
                    checked={settings.notifications.taskAssignments}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'taskAssignments', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="deadline-reminders">Deadline Reminders</Label>
                    <p className="text-sm text-gray-600">Remind about upcoming deadlines</p>
                  </div>
                  <Switch
                    id="deadline-reminders"
                    checked={settings.notifications.deadlineReminders}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'deadlineReminders', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="status-updates">Status Updates</Label>
                    <p className="text-sm text-gray-600">Notify when task status changes</p>
                  </div>
                  <Switch
                    id="status-updates"
                    checked={settings.notifications.statusUpdates}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'statusUpdates', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports">Weekly Reports</Label>
                    <p className="text-sm text-gray-600">Receive weekly performance reports</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={settings.notifications.weeklyReports}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'weeklyReports', value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Time Tracking Tab */}
        <TabsContent value="time-tracking">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Time Tracking Settings</span>
              </CardTitle>
              <CardDescription>
                Configure time tracking and screenshot settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="screenshot-interval">Screenshot Interval (minutes)</Label>
                  <Select 
                    value={settings.timeTracking.screenshotInterval.toString()}
                    onValueChange={(value) => handleSettingChange('timeTracking', 'screenshotInterval', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 minute</SelectItem>
                      <SelectItem value="3">3 minutes</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idle-timeout">Idle Timeout (minutes)</Label>
                  <Select 
                    value={settings.timeTracking.idleTimeout.toString()}
                    onValueChange={(value) => handleSettingChange('timeTracking', 'idleTimeout', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="work-start">Work Start Time</Label>
                  <Input
                    id="work-start"
                    type="time"
                    value={settings.timeTracking.workingHours.start}
                    onChange={(e) => handleNestedSettingChange('timeTracking', 'workingHours', 'start', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="work-end">Work End Time</Label>
                  <Input
                    id="work-end"
                    type="time"
                    value={settings.timeTracking.workingHours.end}
                    onChange={(e) => handleNestedSettingChange('timeTracking', 'workingHours', 'end', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-breaks">Automatic Break Detection</Label>
                  <p className="text-sm text-gray-600">Automatically detect and exclude breaks</p>
                </div>
                <Switch
                  id="auto-breaks"
                  checked={settings.timeTracking.autoBreaks}
                  onCheckedChange={(value) => handleSettingChange('timeTracking', 'autoBreaks', value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5" />
                <span>System Settings</span>
              </CardTitle>
              <CardDescription>
                Configure default system behavior and requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="default-priority">Default Task Priority</Label>
                  <Select 
                    value={settings.system.defaultTaskPriority}
                    onValueChange={(value) => handleSettingChange('system', 'defaultTaskPriority', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-assign">Auto-assign Tasks</Label>
                    <p className="text-sm text-gray-600">Automatically assign tasks based on workload</p>
                  </div>
                  <Switch
                    id="auto-assign"
                    checked={settings.system.autoAssignTasks}
                    onCheckedChange={(value) => handleSettingChange('system', 'autoAssignTasks', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="require-estimates">Require Time Estimates</Label>
                    <p className="text-sm text-gray-600">Make time estimates mandatory for new tasks</p>
                  </div>
                  <Switch
                    id="require-estimates"
                    checked={settings.system.requireTimeEstimates}
                    onCheckedChange={(value) => handleSettingChange('system', 'requireTimeEstimates', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-subtasks">Allow Subtasks</Label>
                    <p className="text-sm text-gray-600">Enable creation of subtasks</p>
                  </div>
                  <Switch
                    id="allow-subtasks"
                    checked={settings.system.allowSubtasks}
                    onCheckedChange={(value) => handleSettingChange('system', 'allowSubtasks', value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tags Tab */}
        <TabsContent value="tags">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Tag className="h-5 w-5" />
                <span>Custom Tags</span>
              </CardTitle>
              <CardDescription>
                Manage custom tags available for tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Tag */}
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add new tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomTag();
                    }
                  }}
                />
                <Button onClick={addCustomTag} disabled={!newTag.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Existing Tags */}
              <div>
                <Label className="text-sm font-medium">Available Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {customTags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        onClick={() => removeCustomTag(tag)}
                        className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

