import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp } from 'lucide-react';

export function TrendsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>7-day performance trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Response Time</span>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3 text-red-500" />
                <span className="text-sm text-red-600">+8.3ms</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Request Volume</span>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-sm text-green-600">+24%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Error Rate</span>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-sm text-green-600">-0.15%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">System Uptime</span>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-sm text-green-600">+0.02%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Analytics</CardTitle>
          <CardDescription>User activity and system usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Daily Active Users</span>
              <span className="text-sm">247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Peak Concurrent Users</span>
              <span className="text-sm">89</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Protocols Generated</span>
              <span className="text-sm">47 today</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">AI Agent Utilization</span>
              <span className="text-sm">78%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}