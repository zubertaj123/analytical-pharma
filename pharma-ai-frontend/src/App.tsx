import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Progress } from './components/ui/progress';
import { 
  FileText, 
  FlaskConical, 
  BarChart3, 
  Package, 
  User, 
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';
import { ProtocolCreation } from './components/ProtocolCreation';
import { LabResults } from './components/LabResults';
import { ReportGeneration } from './components/ReportGeneration';
import { RegulatoryPackage } from './components/RegulatoryPackage';

interface WorkflowItem {
  id: string;
  name: string;
  type: 'protocol' | 'report' | 'package';
  currentPhase: 1 | 2 | 3 | 4;
  status: 'draft' | 'under_review' | 'approved' | 'in_progress' | 'completed';
  phaseDetails: {
    phase1: { status: 'completed' | 'active' | 'pending'; date?: string };
    phase2: { status: 'completed' | 'active' | 'pending'; date?: string };
    phase3: { status: 'completed' | 'active' | 'pending'; date?: string };
    phase4: { status: 'completed' | 'active' | 'pending'; date?: string };
  };
}

interface WorkflowStatus {
  protocolsInProgress: number;
  protocolsCompleted: number;
  reportsInProgress: number;
  reportsCompleted: number;
}

export default function App() {
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus>({
    protocolsInProgress: 3,
    protocolsCompleted: 12,
    reportsInProgress: 2,
    reportsCompleted: 8
  });

  const [selectedTab, setSelectedTab] = useState('protocols');
  const [trackedWorkflowItem, setTrackedWorkflowItem] = useState<WorkflowItem | null>(null);
  
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Protocol PROT-2024-001 ready for review', type: 'protocol', urgent: true },
    { id: 2, message: 'Lab results uploaded for Metformin XR study', type: 'results', urgent: false },
    { id: 3, message: 'Report draft ready for validation', type: 'report', urgent: true }
  ]);

  // Sample workflow items - in real app this would come from your data
  const workflowItems: WorkflowItem[] = [
    {
      id: 'PRO-02815',
      name: 'TYRA-300 Dissolution Method Validation Protocol',
      type: 'protocol',
      currentPhase: 4,
      status: 'completed',
      phaseDetails: {
        phase1: { status: 'completed', date: '2023-11-09' },
        phase2: { status: 'completed', date: '2023-11-28' },
        phase3: { status: 'completed', date: '2023-12-01' },
        phase4: { status: 'completed', date: '2023-12-06' }
      }
    },
    {
      id: 'RPT-01941',
      name: 'TYRA-300 Method Validation Report',
      type: 'report',
      currentPhase: 4,
      status: 'completed',
      phaseDetails: {
        phase1: { status: 'completed', date: '2023-11-09' },
        phase2: { status: 'completed', date: '2023-11-28' },
        phase3: { status: 'completed', date: '2023-12-01' },
        phase4: { status: 'completed', date: '2023-12-06' }
      }
    },
    {
      id: 'PROT-2024-001',
      name: 'HPLC Assay Method for Metformin HCl',
      type: 'protocol',
      currentPhase: 2,
      status: 'in_progress',
      phaseDetails: {
        phase1: { status: 'completed', date: '2024-01-15' },
        phase2: { status: 'active' },
        phase3: { status: 'pending' },
        phase4: { status: 'pending' }
      }
    },
    {
      id: 'REG-2024-001',
      name: 'TYRA-300 Regulatory Submission Package',
      type: 'package',
      currentPhase: 4,
      status: 'completed',
      phaseDetails: {
        phase1: { status: 'completed', date: '2023-11-09' },
        phase2: { status: 'completed', date: '2023-11-28' },
        phase3: { status: 'completed', date: '2023-12-01' },
        phase4: { status: 'completed', date: '2023-12-06' }
      }
    }
  ];

  // Function to handle item selection from child components
  const handleItemSelection = (itemId: string) => {
    const item = workflowItems.find(w => w.id === itemId);
    setTrackedWorkflowItem(item || null);
  };

  // Function to clear workflow tracking
  const clearWorkflowTracking = () => {
    setTrackedWorkflowItem(null);
  };

  useEffect(() => {
    // Simulate real-time workflow updates
    const interval = setInterval(() => {
      setWorkflowStatus(prev => ({
        ...prev,
        protocolsInProgress: Math.max(0, Math.min(10, prev.protocolsInProgress + Math.floor((Math.random() - 0.6) * 2))),
        reportsInProgress: Math.max(0, Math.min(8, prev.reportsInProgress + Math.floor((Math.random() - 0.7) * 2)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getPhaseIcon = (phase: number, status: string) => {
    if (status === 'completed') return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (status === 'active') return <Clock className="h-5 w-5 text-blue-600" />;
    return <div className="h-5 w-5 rounded-full border-2 border-slate-300"></div>;
  };

  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'protocol': return <FileText className="h-4 w-4" />;
      case 'report': return <BarChart3 className="h-4 w-4" />;
      case 'package': return <Package className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'protocol': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'report': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'package': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FlaskConical className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl text-slate-900">Analytical Method Validation - Scientist Workspace</h1>
                  <p className="text-sm text-slate-600">Analytical Method Validation Protocol & Report Generation Platform</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-slate-600" />
                <span className="text-sm text-slate-700">Dr. Sarah Chen</span>
              </div>
              
              <div className="relative">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                  {notifications.filter(n => n.urgent).length > 0 && (
                    <Badge className="ml-2 bg-red-500 text-white text-xs">
                      {notifications.filter(n => n.urgent).length}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contextual Workflow Progress Indicator */}
      {trackedWorkflowItem ? (
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Badge className={`${getItemTypeColor(trackedWorkflowItem.type)}`}>
                    {getItemTypeIcon(trackedWorkflowItem.type)}
                    <span className="ml-1 capitalize">{trackedWorkflowItem.type}</span>
                  </Badge>
                  <span className="text-slate-600">tracking:</span>
                  <span className="font-medium text-slate-900">{trackedWorkflowItem.name}</span>
                  <span className="text-sm text-slate-500">({trackedWorkflowItem.id})</span>
                </div>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={clearWorkflowTracking}
                  className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-8">
                {[
                  { phase: 1, title: 'Protocol Creation', icon: FileText, key: 'phase1' },
                  { phase: 2, title: 'Lab Execution', icon: FlaskConical, key: 'phase2' },
                  { phase: 3, title: 'Report Generation', icon: BarChart3, key: 'phase3' },
                  { phase: 4, title: 'Regulatory Package', icon: Package, key: 'phase4' }
                ].map(({ phase, title, icon: Icon, key }) => {
                  const phaseData = trackedWorkflowItem.phaseDetails[key as keyof typeof trackedWorkflowItem.phaseDetails];
                  return (
                    <div key={phase} className="flex items-center space-x-2">
                      <div className="text-center">
                        {getPhaseIcon(phase, phaseData.status)}
                        <Icon className={`h-4 w-4 mx-auto mb-1 mt-1 ${
                          phaseData.status === 'completed' ? 'text-green-600' :
                          phaseData.status === 'active' ? 'text-blue-600' : 'text-slate-400'
                        }`} />
                        <div className={`text-xs ${
                          phaseData.status === 'completed' ? 'text-green-600' :
                          phaseData.status === 'active' ? 'text-blue-600' : 'text-slate-400'
                        }`}>
                          {title}
                        </div>
                        {phaseData.date && (
                          <div className="text-xs text-slate-500 mt-1">
                            {phaseData.date}
                          </div>
                        )}
                      </div>
                      {phase < 4 && (
                        <div className={`w-8 h-px ${
                          phaseData.status === 'completed' ? 'bg-green-300' : 'bg-slate-300'
                        }`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="text-center text-sm text-slate-600">
              Select a protocol, report, or package to track its progress through the workflow
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-700">Protocols In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-blue-900">{workflowStatus.protocolsInProgress}</div>
              <p className="text-xs text-blue-600 mt-1">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-700">Protocols Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-green-900">{workflowStatus.protocolsCompleted}</div>
              <p className="text-xs text-green-600 mt-1">Ready for lab work</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-purple-700">Reports In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-purple-900">{workflowStatus.reportsInProgress}</div>
              <p className="text-xs text-purple-600 mt-1">Under review</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-orange-700">Reports Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-orange-900">{workflowStatus.reportsCompleted}</div>
              <p className="text-xs text-orange-600 mt-1">Regulatory ready</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Workflow Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="protocols" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Protocol Creation</span>
            </TabsTrigger>
            <TabsTrigger value="lab" className="flex items-center space-x-2">
              <FlaskConical className="h-4 w-4" />
              <span>Lab Results</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Report Generation</span>
            </TabsTrigger>
            <TabsTrigger value="regulatory" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Regulatory Package</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="protocols">
            <ProtocolCreation onItemSelect={handleItemSelection} />
          </TabsContent>

          <TabsContent value="lab">
            <LabResults onItemSelect={handleItemSelection} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportGeneration onItemSelect={handleItemSelection} />
          </TabsContent>

          <TabsContent value="regulatory">
            <RegulatoryPackage onItemSelect={handleItemSelection} />
          </TabsContent>
        </Tabs>

        {/* Urgent Notifications */}
        {notifications.filter(n => n.urgent).length > 0 && (
          <Card className="mt-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-lg text-orange-800 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Urgent Actions Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {notifications.filter(n => n.urgent).map(notification => (
                  <div key={notification.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                    <span className="text-sm text-slate-700">{notification.message}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        if (notification.type === 'protocol') {
                          setSelectedTab('protocols');
                        } else if (notification.type === 'report') {
                          setSelectedTab('reports');
                        }
                      }}
                    >
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}