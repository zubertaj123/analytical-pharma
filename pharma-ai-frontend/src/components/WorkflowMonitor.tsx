import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText,
  Brain,
  Search,
  Calculator,
  Shield,
  Wrench,
  Users
} from 'lucide-react';

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  agent: string;
  icon: React.ElementType;
  status: 'completed' | 'active' | 'pending' | 'error';
  duration: string;
  output?: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: 'Product Specification Analysis',
    description: 'Analyze product requirements and specifications',
    agent: 'Product Specification Agent',
    icon: FileText,
    status: 'completed',
    duration: '2.3s',
    output: 'Multi-strength tablet formulation identified'
  },
  {
    id: 2,
    title: 'Phase Classification',
    description: 'Determine development phase (Early vs Late)',
    agent: 'Phase Classification Agent',
    icon: Brain,
    status: 'completed',
    duration: '1.8s',
    output: 'Late-phase development criteria met'
  },
  {
    id: 3,
    title: 'Path Selection',
    description: 'Choose protocol path (Novel/Existing/Literature)',
    agent: 'Path Selection Agent',
    icon: Search,
    status: 'completed',
    duration: '3.1s',
    output: 'Existing method adaptation recommended'
  },
  {
    id: 4,
    title: 'Literature Research',
    description: 'Search scientific publications and guidelines',
    agent: 'Literature Research Agent',
    icon: Search,
    status: 'active',
    duration: '4.5s',
    output: 'Scanning 12,847 publications...'
  },
  {
    id: 5,
    title: 'Experience Analysis',
    description: 'Analyze historical patterns and best practices',
    agent: 'Experience Intelligence Agent',
    icon: Brain,
    status: 'pending',
    duration: '-'
  },
  {
    id: 6,
    title: 'Range Calculation',
    description: 'Calculate optimal testing ranges',
    agent: 'Range Calculation Engine',
    icon: Calculator,
    status: 'pending',
    duration: '-'
  },
  {
    id: 7,
    title: 'Equipment Assessment',
    description: 'Verify equipment constraints and availability',
    agent: 'Equipment Constraint Agent',
    icon: Wrench,
    status: 'pending',
    duration: '-'
  },
  {
    id: 8,
    title: 'Protocol Generation',
    description: 'Generate initial protocol document',
    agent: 'Protocol Generation Agent',
    icon: FileText,
    status: 'pending',
    duration: '-'
  },
  {
    id: 9,
    title: 'Compliance Validation',
    description: 'Validate against ICH/FDA/USP guidelines',
    agent: 'Compliance Validation Agent',
    icon: Shield,
    status: 'pending',
    duration: '-'
  },
  {
    id: 10,
    title: 'Quality Review',
    description: 'Internal quality assessment',
    agent: 'Quality Improvement System',
    icon: CheckCircle,
    status: 'pending',
    duration: '-'
  },
  {
    id: 11,
    title: 'HITL Review',
    description: 'Human expert review and editing',
    agent: 'HITL Review Interface',
    icon: Users,
    status: 'pending',
    duration: '-'
  },
  {
    id: 12,
    title: 'Pattern Learning',
    description: 'Learn from expert modifications',
    agent: 'Pattern Learning Engine',
    icon: Brain,
    status: 'pending',
    duration: '-'
  },
  {
    id: 13,
    title: 'Document Formatting',
    description: 'Apply professional templates and branding',
    agent: 'Document Formatting Agent',
    icon: FileText,
    status: 'pending',
    duration: '-'
  },
  {
    id: 14,
    title: 'Version Management',
    description: 'Create version control and change tracking',
    agent: 'Version Management Agent',
    icon: RotateCcw,
    status: 'pending',
    duration: '-'
  },
  {
    id: 15,
    title: 'Export & Distribution',
    description: 'Export to multiple formats and distribute',
    agent: 'Export Engine',
    icon: FileText,
    status: 'pending',
    duration: '-'
  }
];

const activeWorkflows = [
  {
    id: 'WF-2024-001',
    product: 'Metformin XR Tablet',
    strength: '500mg, 750mg, 1000mg',
    initiated: '2024-01-15 14:30:22',
    currentStep: 4,
    estimatedCompletion: '2024-01-15 15:45:00'
  },
  {
    id: 'WF-2024-002', 
    product: 'Lisinopril Tablet',
    strength: '10mg, 20mg',
    initiated: '2024-01-15 13:15:10',
    currentStep: 8,
    estimatedCompletion: '2024-01-15 15:20:00'
  },
  {
    id: 'WF-2024-003',
    product: 'Atorvastatin Calcium',
    strength: '20mg, 40mg, 80mg',
    initiated: '2024-01-15 12:45:33',
    currentStep: 11,
    estimatedCompletion: '2024-01-15 16:30:00'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'active': return <Clock className="h-5 w-5 text-blue-600" />;
    case 'error': return <AlertCircle className="h-5 w-5 text-red-600" />;
    default: return <div className="h-5 w-5 rounded-full border-2 border-slate-300"></div>;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'border-green-200 bg-green-50';
    case 'active': return 'border-blue-200 bg-blue-50';
    case 'error': return 'border-red-200 bg-red-50';
    default: return 'border-slate-200 bg-slate-50';
  }
};

export function WorkflowMonitor() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(activeWorkflows[0]);
  const [steps, setSteps] = useState(workflowSteps);

  useEffect(() => {
    // Simulate workflow progression
    const interval = setInterval(() => {
      setSteps(prevSteps => {
        const activeStepIndex = prevSteps.findIndex(step => step.status === 'active');
        if (activeStepIndex !== -1 && Math.random() > 0.7) {
          const newSteps = [...prevSteps];
          newSteps[activeStepIndex] = {
            ...newSteps[activeStepIndex],
            status: 'completed',
            output: 'Processing completed successfully'
          };
          if (activeStepIndex + 1 < newSteps.length) {
            newSteps[activeStepIndex + 1] = {
              ...newSteps[activeStepIndex + 1],
              status: 'active'
            };
          }
          return newSteps;
        }
        return prevSteps;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Workflow Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Workflow: {selectedWorkflow.id}</CardTitle>
            <CardDescription>
              {selectedWorkflow.product} ({selectedWorkflow.strength})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Overall Progress</span>
                <span className="text-sm">{completedSteps}/{steps.length} steps</span>
              </div>
              <Progress value={progress} className="h-3" />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Initiated:</span>
                  <div>{selectedWorkflow.initiated}</div>
                </div>
                <div>
                  <span className="text-slate-600">Est. Completion:</span>
                  <div>{selectedWorkflow.estimatedCompletion}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workflow Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full" variant="default">
                <Play className="h-4 w-4 mr-2" />
                Resume Workflow
              </Button>
              <Button className="w-full" variant="outline">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button className="w-full" variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart Step
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Steps */}
      <Card>
        <CardHeader>
          <CardTitle>15-Step Protocol Workflow</CardTitle>
          <CardDescription>Real-time execution of the master orchestration process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className={`p-4 rounded-lg border-2 transition-all duration-200 ${getStatusColor(step.status)}`}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-slate-200">
                      <span className="text-sm">{step.id}</span>
                    </div>
                    {getStatusIcon(step.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm text-slate-900">{step.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {step.agent}
                        </Badge>
                        {step.duration !== '-' && (
                          <span className="text-xs text-slate-500">{step.duration}</span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-600 mb-2">{step.description}</p>
                    
                    {step.output && (
                      <div className="text-xs text-slate-700 bg-white/50 p-2 rounded border">
                        <strong>Output:</strong> {step.output}
                      </div>
                    )}

                    {step.status === 'active' && (
                      <div className="mt-2">
                        <Progress value={65} className="h-1" />
                        <p className="text-xs text-blue-600 mt-1">Processing...</p>
                      </div>
                    )}
                  </div>

                  <step.icon className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Active Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>All Active Workflows</CardTitle>
          <CardDescription>Currently running protocol generation processes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeWorkflows.map((workflow) => (
              <div 
                key={workflow.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedWorkflow.id === workflow.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
                onClick={() => setSelectedWorkflow(workflow)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm">{workflow.id}</h4>
                      <Badge variant="secondary">Step {workflow.currentStep}/15</Badge>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{workflow.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600">Est. completion</p>
                    <p className="text-xs">{workflow.estimatedCompletion.split(' ')[1]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}