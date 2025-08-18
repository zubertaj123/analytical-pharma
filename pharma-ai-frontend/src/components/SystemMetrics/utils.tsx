import React from 'react';
import { CheckCircle, AlertTriangle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

export const getAlertColor = (level: string) => {
  switch (level) {
    case 'error': return 'bg-red-100 text-red-700 border-red-200';
    case 'warning': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'info': return 'bg-blue-100 text-blue-700 border-blue-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'good': return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'excellent': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default: return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

export const getTrendIcon = (trend: number) => {
  if (trend > 0) return <TrendingUp className="h-3 w-3 text-green-500" />;
  if (trend < 0) return <TrendingDown className="h-3 w-3 text-red-500" />;
  return <div className="w-3 h-3" />;
};

export const formatResourceValue = (value: number | string, isLimit: boolean = false) => {
  if (typeof value === 'number' && value > 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value;
};

export const formatMetricValue = (key: string, value: number) => {
  switch (key) {
    case 'uptime':
    case 'errorRate':
      return `${value}%`;
    case 'apiLatency':
      return `${value}ms`;
    case 'throughput':
      return `${value} req/s`;
    default:
      return value.toString();
  }
};

export const formatMetricTarget = (key: string, target: number) => {
  switch (key) {
    case 'uptime':
    case 'errorRate':
      return `${target}%`;
    case 'apiLatency':
      return `${target}ms`;
    case 'throughput':
      return `${target} req/s`;
    default:
      return target.toString();
  }
};