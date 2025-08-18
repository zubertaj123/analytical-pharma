import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  Globe, 
  Cpu, 
  Database, 
  Brain, 
  FileText, 
  Users, 
  Zap, 
  Shield,
  Activity,
  Cloud,
  Server,
  Network
} from 'lucide-react';

interface SystemStatus {
  overallHealth: number;
  activeProtocols: number;
  agentsRunning: number;
  hitlTasks: number;
  systemLoad: number;
}

interface ArchitectureDashboardProps {
  systemStatus: SystemStatus;
}

const architectureLayers = [
  {
    id: 'ui',
    title: 'User Interface Layer',
    description: 'React App Service + Protocol Interfaces',
    icon: Globe,
    status: 'healthy',
    components: [
      'Web Application Interface',
      'Protocol Input Interface', 
      'HITL Review Interface',
      'Excel Input Parser'
    ],
    metrics: { uptime: '99.9%', requests: '2.3K/min', latency: '45ms' }
  },
  {
    id: 'gateway',
    title: 'API Gateway & Orchestration',
    description: 'Azure API Management + Workflow Engine',
    icon: Network,
    status: 'healthy',
    components: [
      'Azure API Management',
      'Master Orchestrator',
      'Task Planner',
      'Agent Manager'
    ],
    metrics: { throughput: '850 req/s', cache: '94%', auth: '100%' }
  },
  {
    id: 'agents',
    title: 'Protocol-Specific Agent Layer',
    description: '9 Specialized AI Agents with GPT-4o',
    icon: Brain,
    status: 'active',
    components: [
      'Product Specification Agent',
      'Phase Classification Agent',
      'Path Selection Agent',
      'Experience Intelligence Agent',
      'Range Calculation Engine',
      'Literature Research Agent'
    ],
    metrics: { active: '15 agents', success: '96.8%', avg_time: '2.3s' }
  },
  {
    id: 'knowledge',
    title: 'Advanced RAG + Knowledge Management',
    description: 'Vector Store + Knowledge Graph',
    icon: Database,
    status: 'optimal',
    components: [
      'Azure AI Search (3072-dim)',
      'Protocol Knowledge Base',
      'Regulatory Knowledge Base',
      'Cosmos DB Knowledge Graph'
    ],
    metrics: { documents: '125K', queries: '1.2K/min', accuracy: '98.2%' }
  },
  {
    id: 'hitl',
    title: 'HITL Learning System',
    description: 'Human-in-the-Loop Enhancement',
    icon: Users,
    status: 'learning',
    components: [
      'Edit Capture System',
      'Pattern Learning Engine',
      'Quality Improvement System',
      'AI Optimization System'
    ],
    metrics: { edits: '47 today', patterns: '234', improvement: '+12%' }
  },
  {
    id: 'processing',
    title: 'Data Processing & Storage',
    description: 'Multi-format Data Pipeline',
    icon: Server,
    status: 'processing',
    components: [
      'Azure SQL Database',
      'Cosmos DB',
      'Azure Blob Storage',
      'Azure Data Lake'
    ],
    metrics: { storage: '2.3TB', sync: '100%', backup: 'Daily' }
  },
  {
    id: 'ai',
    title: 'Azure AI Services Foundation',
    description: 'Core AI & Cognitive Services',
    icon: Zap,
    status: 'powered',
    components: [
      'Azure OpenAI GPT-4o',
      'Text-Embedding-3-Large',
      'Azure AI Foundry',
      'Document Intelligence'
    ],
    metrics: { tokens: '2.1M/hr', models: '6 active', cost: '$127/day' }
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy': return 'bg-green-500';
    case 'active': return 'bg-blue-500';
    case 'optimal': return 'bg-emerald-500';
    case 'learning': return 'bg-purple-500';
    case 'processing': return 'bg-orange-500';
    case 'powered': return 'bg-yellow-500';
    default: return 'bg-gray-500';
  }
};

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'healthy': return 'default';
    case 'active': return 'secondary';
    case 'optimal': return 'default';
    default: return 'outline';
  }
};

export function ArchitectureDashboard({ systemStatus }: ArchitectureDashboardProps) {
  return (
    <div className="space-y-8">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900">{systemStatus.overallHealth}%</div>
            <Progress value={systemStatus.overallHealth} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700">Active Protocols</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900">{systemStatus.activeProtocols}</div>
            <p className="text-xs text-green-600 mt-1">+3 since yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700">AI Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900">{systemStatus.agentsRunning}/15</div>
            <p className="text-xs text-purple-600 mt-1">All systems operational</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-700">HITL Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-900">{systemStatus.hitlTasks}</div>
            <p className="text-xs text-orange-600 mt-1">Pending review</p>
          </CardContent>
        </Card>
      </div>

      {/* Architecture Layers */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-slate-900">Enterprise Architecture Layers</h2>
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Real-time View
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {architectureLayers.map((layer, index) => (
            <Card key={layer.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <layer.icon className="h-8 w-8 text-slate-600" />
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(layer.status)}`}></div>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{layer.title}</CardTitle>
                      <CardDescription>{layer.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={getStatusBadgeVariant(layer.status)} className="capitalize">
                    {layer.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Components */}
                  <div className="lg:col-span-2">
                    <h4 className="text-sm text-slate-600 mb-3">Components</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {layer.components.map((component, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                          <span className="text-slate-700">{component}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div>
                    <h4 className="text-sm text-slate-600 mb-3">Key Metrics</h4>
                    <div className="space-y-2">
                      {Object.entries(layer.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center text-sm">
                          <span className="text-slate-600 capitalize">{key.replace('_', ' ')}</span>
                          <span className="text-slate-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Data Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>System Data Flow</CardTitle>
          <CardDescription>Real-time data movement across architecture layers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Globe className="h-6 w-6 text-blue-600" />
                <span>User Interface</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-sm text-slate-600">2.3K req/min</span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-px h-8 bg-gradient-to-b from-blue-300 to-purple-300"></div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Brain className="h-6 w-6 text-purple-600" />
                <span>AI Agent Processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <span className="text-sm text-slate-600">850 tasks/s</span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-px h-8 bg-gradient-to-b from-purple-300 to-green-300"></div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-green-600" />
                <span>Protocol Generation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-slate-600">47 protocols/day</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}