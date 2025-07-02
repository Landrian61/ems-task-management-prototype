import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock, Calendar, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const TimeReport = ({ todayTime, workloadData, onClose }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
    <h2 className="text-2xl font-bold mb-4">Time Report</h2>
    <button
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      onClick={onClose}
      aria-label="Close"
    >
      ×
    </button>
    <div className="space-y-6">
      {/* Time Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{todayTime}</p>
            <p className="text-sm text-gray-600">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">32h 15m</p>
            <p className="text-sm text-gray-600">This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">4h 36m</p>
            <p className="text-sm text-gray-600">Daily Average</p>
          </CardContent>
        </Card>
      </div>
      {/* Weekly Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Time Distribution</CardTitle>
          <CardDescription>Hours tracked each day this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#3b82f6" name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default TimeReport; 