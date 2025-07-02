import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Play,
  Pause,
  Square,
  Clock,
  Calendar,
  Target,
  TrendingUp,
  BarChart3,
  Timer,
  CheckCircle,
  AlertTriangle,
  Coffee,
  Camera
} from 'lucide-react';

const TimeTracker = () => {
  const { user } = useAuth();
  const [activeTask, setActiveTask] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [showStopDialog, setShowStopDialog] = useState(false);
  const [workNote, setWorkNote] = useState('');

  // Mock active tasks for the user
  const userTasks = [
    {
      id: 1,
      title: 'Update user interface design',
      project: 'Mobile App Redesign',
      estimatedHours: 16,
      trackedHours: 8.5,
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Database schema optimization',
      project: 'Database Migration',
      estimatedHours: 12,
      trackedHours: 0,
      status: 'todo'
    },
    {
      id: 5,
      title: 'Mobile responsive testing',
      project: 'Mobile App Redesign',
      estimatedHours: 10,
      trackedHours: 3,
      status: 'in-progress'
    }
  ];

  // Mock time tracking data
  const todayStats = {
    totalTime: '6h 24m',
    tasksWorked: 3,
    screenshotsTaken: 76,
    productivity: 94
  };

  const weeklyStats = [
    { day: 'Mon', hours: 8.2, target: 8 },
    { day: 'Tue', hours: 7.8, target: 8 },
    { day: 'Wed', hours: 8.5, target: 8 },
    { day: 'Thu', hours: 6.2, target: 8 },
    { day: 'Fri', hours: 6.4, target: 8 },
    { day: 'Sat', hours: 0, target: 0 },
    { day: 'Sun', hours: 0, target: 0 }
  ];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else if (!isTracking) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartTracking = (task) => {
    setActiveTask(task);
    setIsTracking(true);
    setStartTime(Date.now());
    setElapsedTime(0);
    console.log(`Started tracking time for task: ${task.title}`);
  };

  const handlePauseTracking = () => {
    setIsTracking(false);
    console.log('Paused time tracking');
  };

  const handleResumeTracking = () => {
    setIsTracking(true);
    setStartTime(Date.now() - elapsedTime);
    console.log('Resumed time tracking');
  };

  const handleStopTracking = () => {
    setShowStopDialog(true);
  };

  const handleConfirmStop = () => {
    const sessionTime = elapsedTime;
    console.log(`Stopped tracking. Session time: ${formatTime(sessionTime)}`);
    console.log(`Work note: ${workNote}`);
    
    // Reset state
    setIsTracking(false);
    setActiveTask(null);
    setElapsedTime(0);
    setStartTime(null);
    setWorkNote('');
    setShowStopDialog(false);
    
    // In real app, would save time entry to backend
    alert(`Time tracking stopped. Session: ${formatTime(sessionTime)}`);
  };

  const getProgressPercentage = (task) => {
    return task.estimatedHours > 0 ? Math.min((task.trackedHours / task.estimatedHours) * 100, 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Time Tracking</h1>
          <p className="text-gray-600 mt-1">
            Track your work time and monitor productivity
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Camera className="h-3 w-3" />
            <span>Screenshots: {todayStats.screenshotsTaken}</span>
          </Badge>
        </div>
      </div>

      {/* Active Timer */}
      {activeTask && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-blue-900">
                  Currently Tracking
                </CardTitle>
                <CardDescription className="text-blue-700">
                  {activeTask.title} • {activeTask.project}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                <span className="text-sm text-blue-700">
                  {isTracking ? 'Recording' : 'Paused'}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Timer Display */}
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-blue-900 mb-2">
                {formatTime(elapsedTime)}
              </div>
              <p className="text-sm text-blue-700">
                Session time
              </p>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center space-x-3">
              {!isTracking ? (
                <Button onClick={handleResumeTracking} className="bg-green-600 hover:bg-green-700">
                  <Play className="mr-2 h-4 w-4" />
                  Resume
                </Button>
              ) : (
                <Button onClick={handlePauseTracking} variant="outline">
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </Button>
              )}
              <Button onClick={handleStopTracking} variant="destructive">
                <Square className="mr-2 h-4 w-4" />
                Stop
              </Button>
            </div>

            {/* Task Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Task Progress</span>
                <span>{activeTask.trackedHours}h / {activeTask.estimatedHours}h</span>
              </div>
              <Progress value={getProgressPercentage(activeTask)} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Time Today</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.totalTime}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tasks Worked</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.tasksWorked}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Screenshots</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.screenshotsTaken}</p>
              </div>
              <Camera className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Productivity</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.productivity}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Tasks */}
      {!activeTask && (
        <Card>
          <CardHeader>
            <CardTitle>Available Tasks</CardTitle>
            <CardDescription>
              Select a task to start time tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.project}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="text-xs text-gray-500">
                        {task.trackedHours}h / {task.estimatedHours}h tracked
                      </div>
                      <Progress value={getProgressPercentage(task)} className="w-24 h-1" />
                    </div>
                  </div>
                  <Button onClick={() => handleStartTracking(task)}>
                    <Play className="mr-2 h-4 w-4" />
                    Start
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
          <CardDescription>
            Your time tracking progress this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyStats.map((day, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">
                  {day.day}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-900">
                      {day.hours}h {day.target > 0 && `/ ${day.target}h`}
                    </span>
                    {day.target > 0 && (
                      <span className={`text-xs ${
                        day.hours >= day.target ? 'text-green-600' : 
                        day.hours >= day.target * 0.8 ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {day.hours >= day.target ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <AlertTriangle className="h-3 w-3" />
                        )}
                      </span>
                    )}
                  </div>
                  <Progress 
                    value={day.target > 0 ? (day.hours / day.target) * 100 : 0} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stop Tracking Dialog */}
      <Dialog open={showStopDialog} onOpenChange={setShowStopDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stop Time Tracking</DialogTitle>
            <DialogDescription>
              Add a note about the work completed during this session
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-mono font-bold text-gray-900">
                {formatTime(elapsedTime)}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Session time for: {activeTask?.title}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workNote">Work Summary (Optional)</Label>
              <Textarea
                id="workNote"
                value={workNote}
                onChange={(e) => setWorkNote(e.target.value)}
                placeholder="Describe what you accomplished during this session..."
                rows={3}
              />
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowStopDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmStop}>
              Stop Tracking
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimeTracker;

