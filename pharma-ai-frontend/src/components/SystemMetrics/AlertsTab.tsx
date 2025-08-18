import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { systemAlerts } from './data';
import { getAlertColor } from './utils';

export function AlertsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Alerts</CardTitle>
        <CardDescription>Current system alerts and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systemAlerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.level)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm">{alert.id}</h4>
                  <Badge variant="outline" className="text-xs capitalize">
                    {alert.level}
                  </Badge>
                </div>
                <Badge variant="outline" className="text-xs">
                  {alert.status}
                </Badge>
              </div>
              
              <p className="text-sm mb-2">{alert.message}</p>
              <p className="text-xs opacity-75">Component: {alert.component}</p>
              <p className="text-xs opacity-75">Time: {alert.timestamp}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}