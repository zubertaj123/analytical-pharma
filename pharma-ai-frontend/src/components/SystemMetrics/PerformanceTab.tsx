import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Activity, Zap } from 'lucide-react';
import { performanceMetrics } from './data';
import { getStatusIcon, getTrendIcon, formatMetricValue, formatMetricTarget } from './utils';

interface PerformanceTabProps {
  avgResponseTime: number;
}

export function PerformanceTab({ avgResponseTime }: PerformanceTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
          <CardDescription>Real-time system performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(performanceMetrics).map(([key, metric]) => (
              <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(metric.status)}
                  <div>
                    <h4 className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                    <p className="text-xs text-slate-600">
                      Target: {formatMetricTarget(key, metric.target)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg">
                    {formatMetricValue(key, metric.current)}
                  </div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-xs ${metric.trend > 0 ? 'text-green-600' : metric.trend < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {metric.trend > 0 ? '+' : ''}{metric.trend}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Health Overview</CardTitle>
          <CardDescription>Component status and diagnostics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl text-green-900">98.7%</div>
                <div className="text-xs text-green-600">Overall Health</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl text-blue-900">{avgResponseTime}ms</div>
                <div className="text-xs text-blue-600">Avg Response</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">API Gateway</span>
                <Badge variant="default" className="bg-green-100 text-green-700">Healthy</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">AI Services</span>
                <Badge variant="default" className="bg-green-100 text-green-700">Operational</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database</span>
                <Badge variant="default" className="bg-green-100 text-green-700">Online</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Storage</span>
                <Badge variant="outline" className="bg-orange-100 text-orange-700">High Usage</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}