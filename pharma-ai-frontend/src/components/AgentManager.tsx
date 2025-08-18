import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Brain, 
  Activity, 
  Zap, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Settings,
  BarChart3,
  Target,
  Cpu,
  Database,
  Search,
  Shield,
  Calculator,
  Wrench
} from 'lucide-react';

interface AgentMetrics {
  tasksCompleted: number;
  averageTime: number;
  successRate: number;
  currentLoad: number;
  tokensUsed: number;
  cost: number;
}

interface Agent {
  id: string;
  name: string;
  category: 'core' | 'intelligence' | 'validation';
  description: string;
  icon: React.ElementType;
  status: 'active' | 'idle' | 'busy' | 'maintenance';
  priority: 'primary' | 'secondary' | 'support';
  model: string;
  metrics: AgentMetrics;
  currentTask?: string;
  capabilities: string[];
}

const agents: Agent[] = [
  {
    id: 'psa',
    name: 'Product Specification Agent',
    category: 'core',
    description: 'Primary driver for product requirement analysis',
    icon: Target,
    status: 'active',
    priority: 'primary',
    model: 'GPT-4o + Chain-of-Thought',
    currentTask: 'Analyzing multi-strength formulation requirements',
    metrics: {
      tasksCompleted: 47,
      averageTime: 2.3,
      successRate: 98.2,
      currentLoad: 76,
      tokensUsed: 125000,
      cost: 12.50
    },
    capabilities: ['Specification Analysis', 'Requirements Parsing', 'Multi-strength Logic', 'Product Classification']
  },
  {
    id: 'paa',
    name: 'Phase Classification Agent',
    category: 'core',
    description: 'Determines development phase criteria',
    icon: Brain,
    status: 'idle',
    priority: 'primary',
    model: 'GPT-4o + Decision Trees',
    metrics: {
      tasksCompleted: 34,
      averageTime: 1.8,
      successRate: 96.8,
      currentLoad: 23,
      tokensUsed: 89000,
      cost: 8.90
    },
    capabilities: ['Phase Classification', 'Early/Late Determination', 'Criteria Evaluation', 'Timeline Assessment']
  },
  {
    id: 'psela',
    name: 'Path Selection Agent',
    category: 'core',
    description: 'Chooses optimal protocol pathway',
    icon: Search,
    status: 'busy',
    priority: 'primary',
    model: 'GPT-4o + Similarity Matching',
    currentTask: 'Evaluating novel vs existing method approaches',
    metrics: {
      tasksCompleted: 29,
      averageTime: 3.1,
      successRate: 94.5,
      currentLoad: 89,
      tokensUsed: 156000,
      cost: 15.60
    },
    capabilities: ['Path Analysis', 'Method Comparison', 'Literature Matching', 'Novelty Assessment']
  },
  {
    id: 'eia',
    name: 'Experience Intelligence Agent',
    category: 'intelligence',
    description: 'Learns from historical patterns and decisions',
    icon: Brain,
    status: 'active',
    priority: 'secondary',
    model: 'GPT-4o + Historical Analysis',
    currentTask: 'Mining patterns from 2,340 historical protocols',
    metrics: {
      tasksCompleted: 18,
      averageTime: 4.7,
      successRate: 97.1,
      currentLoad: 67,
      tokensUsed: 203000,
      cost: 20.30
    },
    capabilities: ['Pattern Recognition', 'Best Practices', 'Historical Analysis', 'Learning Synthesis']
  },
  {
    id: 'rce',
    name: 'Range Calculation Engine',
    category: 'intelligence',
    description: 'Optimizes testing ranges and parameters',
    icon: Calculator,
    status: 'active',
    priority: 'secondary',
    model: 'Mathematical Models + GPT-4o',
    currentTask: 'Calculating dissolution ranges for 3 strengths',
    metrics: {
      tasksCompleted: 52,
      averageTime: 2.1,
      successRate: 99.1,
      currentLoad: 45,
      tokensUsed: 78000,
      cost: 7.80
    },
    capabilities: ['Range Optimization', 'Statistical Analysis', 'Multi-strength Calculation', 'Parameter Tuning']
  },
  {
    id: 'lra',
    name: 'Literature Research Agent',
    category: 'intelligence',
    description: 'Searches and analyzes scientific publications',
    icon: Search,
    status: 'busy',
    priority: 'support',
    model: 'GPT-4o + Web Search APIs',
    currentTask: 'Scanning 12,847 publications for dissolution methods',
    metrics: {
      tasksCompleted: 41,
      averageTime: 5.2,
      successRate: 92.7,
      currentLoad: 91,
      tokensUsed: 189000,
      cost: 18.90
    },
    capabilities: ['Literature Search', 'Publication Analysis', 'Method Extraction', 'Citation Management']
  },
  {
    id: 'pga',
    name: 'Protocol Generation Agent',
    category: 'validation',
    description: 'Creates comprehensive protocol documents',
    icon: Brain,
    status: 'idle',
    priority: 'primary',
    model: 'GPT-4o + Chain-of-Thought',
    metrics: {
      tasksCompleted: 23,
      averageTime: 6.8,
      successRate: 95.6,
      currentLoad: 12,
      tokensUsed: 234000,
      cost: 23.40
    },
    capabilities: ['Document Generation', 'Template Application', 'Content Synthesis', 'Structure Optimization']
  },
  {
    id: 'cva',
    name: 'Compliance Validation Agent',
    category: 'validation',
    description: 'Ensures regulatory compliance',
    icon: Shield,
    status: 'active',
    priority: 'primary',
    model: 'GPT-4o + Regulatory Database',
    currentTask: 'Validating against ICH Q2(R1) guidelines',
    metrics: {
      tasksCompleted: 31,
      averageTime: 3.4,
      successRate: 98.9,
      currentLoad: 58,
      tokensUsed: 167000,
      cost: 16.70
    },
    capabilities: ['ICH Compliance', 'FDA Validation', 'USP Standards', 'Regulatory Mapping']
  },
  {
    id: 'eqa',
    name: 'Equipment Constraint Agent',
    category: 'validation',
    description: 'Validates equipment availability and constraints',
    icon: Wrench,
    status: 'idle',
    priority: 'support',
    model: 'GPT-4o + Inventory Database',
    metrics: {
      tasksCompleted: 38,
      averageTime: 2.9,
      successRate: 94.2,
      currentLoad: 19,
      tokensUsed: 92000,
      cost: 9.20
    },
    capabilities: ['Equipment Verification', 'Capacity Planning', 'Constraint Analysis', 'Alternative Suggestions']
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'busy': return 'bg-orange-500';
    case 'idle': return 'bg-gray-400';
    case 'maintenance': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
};

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'active': return 'default';
    case 'busy': return 'secondary';
    case 'idle': return 'outline';
    case 'maintenance': return 'destructive';
    default: return 'outline';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'primary': return 'text-red-600 bg-red-50';
    case 'secondary': return 'text-blue-600 bg-blue-50';
    case 'support': return 'text-gray-600 bg-gray-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export function AgentManager() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agentList, setAgentList] = useState(agents);

  useEffect(() => {
    // Simulate real-time agent updates
    const interval = setInterval(() => {
      setAgentList(prevAgents => {
        return prevAgents.map(agent => ({
          ...agent,
          metrics: {
            ...agent.metrics,
            currentLoad: Math.max(10, Math.min(95, agent.metrics.currentLoad + (Math.random() - 0.5) * 10)),
            tasksCompleted: agent.status === 'active' || agent.status === 'busy' 
              ? agent.metrics.tasksCompleted + (Math.random() > 0.8 ? 1 : 0)
              : agent.metrics.tasksCompleted
          }
        }));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const coreAgents = agentList.filter(agent => agent.category === 'core');
  const intelligenceAgents = agentList.filter(agent => agent.category === 'intelligence');
  const validationAgents = agentList.filter(agent => agent.category === 'validation');

  const totalTasks = agentList.reduce((sum, agent) => sum + agent.metrics.tasksCompleted, 0);
  const averageSuccessRate = agentList.reduce((sum, agent) => sum + agent.metrics.successRate, 0) / agentList.length;
  const totalCost = agentList.reduce((sum, agent) => sum + agent.metrics.cost, 0);

  return (
    <div className="space-y-6">
      {/* Agent Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900">{agentList.filter(a => a.status === 'active' || a.status === 'busy').length}/9</div>
            <p className="text-xs text-blue-600 mt-1">All systems operational</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900">{totalTasks}</div>
            <p className="text-xs text-green-600 mt-1">Today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900">{averageSuccessRate.toFixed(1)}%</div>
            <p className="text-xs text-purple-600 mt-1">Average across all agents</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-700">Daily Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-900">${totalCost.toFixed(0)}</div>
            <p className="text-xs text-orange-600 mt-1">AI service usage</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="core">Core Agents</TabsTrigger>
          <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {agentList.map((agent) => (
              <Card 
                key={agent.id} 
                className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedAgent(agent)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <agent.icon className="h-6 w-6 text-slate-600" />
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></div>
                      </div>
                      <div>
                        <CardTitle className="text-sm">{agent.name}</CardTitle>
                        <CardDescription className="text-xs">{agent.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={getStatusBadgeVariant(agent.status)} className="text-xs">
                      {agent.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Current Load</span>
                      <span>{agent.metrics.currentLoad}%</span>
                    </div>
                    <Progress value={agent.metrics.currentLoad} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-600">Tasks: </span>
                        <span className="text-slate-900">{agent.metrics.tasksCompleted}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Success: </span>
                        <span className="text-slate-900">{agent.metrics.successRate}%</span>
                      </div>
                    </div>

                    {agent.currentTask && (
                      <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                        <strong>Current:</strong> {agent.currentTask}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="core">
          <AgentCategoryView agents={coreAgents} category="Core Decision Agents" />
        </TabsContent>

        <TabsContent value="intelligence">
          <AgentCategoryView agents={intelligenceAgents} category="Intelligence & Experience Agents" />
        </TabsContent>

        <TabsContent value="validation">
          <AgentCategoryView agents={validationAgents} category="Generation & Validation Agents" />
        </TabsContent>
      </Tabs>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <selectedAgent.icon className="h-8 w-8 text-slate-600" />
                <div>
                  <CardTitle>{selectedAgent.name}</CardTitle>
                  <CardDescription>{selectedAgent.description}</CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedAgent(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm text-slate-600 mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tasks Completed</span>
                    <span className="text-sm">{selectedAgent.metrics.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Time</span>
                    <span className="text-sm">{selectedAgent.metrics.averageTime}s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Success Rate</span>
                    <span className="text-sm">{selectedAgent.metrics.successRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tokens Used</span>
                    <span className="text-sm">{selectedAgent.metrics.tokensUsed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Daily Cost</span>
                    <span className="text-sm">${selectedAgent.metrics.cost}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-slate-600 mb-3">Capabilities</h4>
                <div className="space-y-2">
                  {selectedAgent.capabilities.map((capability, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-sm">{capability}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-sm text-slate-600 mt-6 mb-3">Configuration</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Model:</span>
                    <span>{selectedAgent.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Priority:</span>
                    <Badge className={`text-xs ${getPriorityColor(selectedAgent.priority)}`}>
                      {selectedAgent.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function AgentCategoryView({ agents, category }: { agents: Agent[], category: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{category}</CardTitle>
        <CardDescription>
          {agents.length} agents in this category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <agent.icon className="h-8 w-8 text-slate-600" />
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></div>
                </div>
                <div>
                  <h4 className="text-sm">{agent.name}</h4>
                  <p className="text-xs text-slate-600">{agent.description}</p>
                  {agent.currentTask && (
                    <p className="text-xs text-blue-600 mt-1">Current: {agent.currentTask}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-right">
                <div>
                  <p className="text-xs text-slate-600">Load</p>
                  <p className="text-sm">{agent.metrics.currentLoad}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Success</p>
                  <p className="text-sm">{agent.metrics.successRate}%</p>
                </div>
                <Badge variant={getStatusBadgeVariant(agent.status)}>
                  {agent.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}