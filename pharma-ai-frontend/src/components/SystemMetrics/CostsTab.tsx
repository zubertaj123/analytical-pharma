import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { DollarSign, CheckCircle } from 'lucide-react';
import { costBreakdown } from './data';
import { getTrendIcon } from './utils';

export function CostsTab() {
  const totalDailyCost = costBreakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Cost Breakdown</CardTitle>
          <CardDescription>Azure service costs for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-4 w-4 text-slate-600" />
                  <span className="text-sm">{item.category}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm">${item.amount}</div>
                    <div className="text-xs text-slate-500">{item.percentage}%</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(item.trend)}
                    <span className={`text-xs ${item.trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {item.trend > 0 ? '+' : ''}{item.trend}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Daily Cost</span>
                <span className="text-lg">${totalDailyCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
                <span>Monthly Projection</span>
                <span>${(totalDailyCost * 30).toFixed(0)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost Optimization</CardTitle>
          <CardDescription>Recommendations to reduce costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">Optimization Opportunity</span>
              </div>
              <p className="text-xs text-green-600">
                Consider implementing token caching to reduce GPT-4o usage by ~15%
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700">Reserved Instance Savings</span>
              </div>
              <p className="text-xs text-blue-600">
                Switch to reserved capacity for Cosmos DB to save $42/day
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}