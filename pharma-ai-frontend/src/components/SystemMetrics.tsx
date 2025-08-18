import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PerformanceTab } from './SystemMetrics/PerformanceTab';
import { ResourcesTab } from './SystemMetrics/ResourcesTab';
import { CostsTab } from './SystemMetrics/CostsTab';
import { AlertsTab } from './SystemMetrics/AlertsTab';
import { TrendsTab } from './SystemMetrics/TrendsTab';
import { performanceMetrics, costBreakdown } from './SystemMetrics/data';

interface SystemStatus {
  overallHealth: number;
  activeProtocols: number;
  agentsRunning: number;
  hitlTasks: number;
  systemLoad: number;
}

interface SystemMetricsProps {
  systemStatus: SystemStatus;
}

export function SystemMetrics({ systemStatus }: SystemMetricsProps) {
  const [selectedTab, setSelectedTab] = useState('performance');
  const [realTimeData, setRealTimeData] = useState({
    currentLoad: systemStatus.systemLoad,
    activeRequests: 234,
    queueLength: 12
  });

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        currentLoad: Math.max(30, Math.min(95, prev.currentLoad + (Math.random() - 0.5) * 5)),
        activeRequests: Math.max(100, Math.min(500, prev.activeRequests + Math.floor((Math.random() - 0.5) * 20))),
        queueLength: Math.max(0, Math.min(50, prev.queueLength + Math.floor((Math.random() - 0.5) * 5)))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const totalDailyCost = costBreakdown.reduce((sum, item) => sum + item.amount, 0);
  const avgResponseTime = performanceMetrics.apiLatency.current;

  return (
    <div className="space-y-6">
      {/* Real-time System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700">System Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900">{realTimeData.currentLoad}%</div>
            <Progress value={realTimeData.currentLoad} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700">Active Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900">{realTimeData.activeRequests}</div>
            <p className="text-xs text-blue-600 mt-1">Per minute</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700">Queue Length</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900">{realTimeData.queueLength}</div>
            <p className="text-xs text-purple-600 mt-1">Pending tasks</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-700">Daily Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-900">${totalDailyCost.toFixed(0)}</div>
            <p className="text-xs text-orange-600 mt-1">Azure services</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <PerformanceTab avgResponseTime={avgResponseTime} />
        </TabsContent>

        <TabsContent value="resources">
          <ResourcesTab />
        </TabsContent>

        <TabsContent value="costs">
          <CostsTab />
        </TabsContent>

        <TabsContent value="alerts">
          <AlertsTab />
        </TabsContent>

        <TabsContent value="trends">
          <TrendsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}