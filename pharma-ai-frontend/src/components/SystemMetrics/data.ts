export const performanceMetrics = {
  apiLatency: {
    current: 142,
    target: 200,
    trend: -5.3,
    status: 'good'
  },
  throughput: {
    current: 847,
    target: 800,
    trend: 12.4,
    status: 'excellent'
  },
  errorRate: {
    current: 0.23,
    target: 0.5,
    trend: -0.12,
    status: 'good'
  },
  uptime: {
    current: 99.97,
    target: 99.9,
    trend: 0.02,
    status: 'excellent'
  }
};

export const resourceUtilization = [
  { name: 'GPT-4o Tokens', used: 2134567, limit: 3000000, cost: 213.45 },
  { name: 'Azure AI Search', used: 1247, limit: 2000, cost: 89.30 },
  { name: 'Cosmos DB RUs', used: 3456, limit: 5000, cost: 145.20 },
  { name: 'App Service CPU', used: 67, limit: 100, cost: 67.80 },
  { name: 'Storage (TB)', used: 2.3, limit: 5.0, cost: 34.50 }
];

export const systemAlerts = [
  {
    id: 'ALERT-001',
    level: 'warning',
    component: 'Literature Research Agent',
    message: 'High API usage approaching rate limit',
    timestamp: '2024-01-15 14:45:22',
    status: 'active'
  },
  {
    id: 'ALERT-002',
    level: 'info',
    component: 'Protocol Generation',
    message: 'New template version deployed successfully',
    timestamp: '2024-01-15 13:30:15',
    status: 'resolved'
  },
  {
    id: 'ALERT-003',
    level: 'error',
    component: 'Document Intelligence',
    message: 'PDF processing failed for 3 documents',
    timestamp: '2024-01-15 12:15:45',
    status: 'investigating'
  }
];

export const costBreakdown = [
  { category: 'AI Services', amount: 342.50, percentage: 45.2, trend: 8.3 },
  { category: 'Data Storage', amount: 156.30, percentage: 20.6, trend: 2.1 },
  { category: 'Compute', amount: 124.80, percentage: 16.5, trend: -3.2 },
  { category: 'API Gateway', amount: 89.40, percentage: 11.8, trend: 1.8 },
  { category: 'Networking', amount: 44.70, percentage: 5.9, trend: 0.5 }
];