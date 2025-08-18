import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Cpu } from 'lucide-react';
import { resourceUtilization } from './data';
import { formatResourceValue } from './utils';

export function ResourcesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Utilization</CardTitle>
        <CardDescription>Current usage across Azure services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {resourceUtilization.map((resource, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Cpu className="h-4 w-4 text-slate-600" />
                  <span className="text-sm">{resource.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600">
                    {formatResourceValue(resource.used)} / {formatResourceValue(resource.limit)}
                  </span>
                  <span className="text-sm text-green-600">${resource.cost}</span>
                </div>
              </div>
              <Progress 
                value={typeof resource.used === 'number' && typeof resource.limit === 'number' 
                  ? (resource.used / resource.limit) * 100 
                  : 0} 
                className="h-2" 
              />
              <div className="text-xs text-slate-500">
                {typeof resource.used === 'number' && typeof resource.limit === 'number' 
                  ? `${((resource.used / resource.limit) * 100).toFixed(1)}% utilized`
                  : 'N/A'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}