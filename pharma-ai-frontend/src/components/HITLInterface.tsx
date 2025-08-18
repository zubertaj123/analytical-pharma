import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { 
  User, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Edit3, 
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Brain,
  TrendingUp
} from 'lucide-react';

interface HITLTask {
  id: string;
  protocolId: string;
  product: string;
  section: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_review' | 'approved' | 'rejected' | 'needs_revision';
  assignedTo: string;
  createdAt: string;
  dueDate: string;
  description: string;
  aiRecommendation?: string;
  expertNotes?: string;
  confidenceScore: number;
}

interface ExpertFeedback {
  taskId: string;
  feedback: string;
  changes: string[];
  rating: 1 | 2 | 3 | 4 | 5;
  timestamp: string;
}

const hitlTasks: HITLTask[] = [
  {
    id: 'HITL-001',
    protocolId: 'PROT-2024-001',
    product: 'Metformin XR Tablet 500mg/750mg/1000mg',
    section: 'Dissolution Testing Parameters',
    priority: 'high',
    status: 'pending',
    assignedTo: 'Dr. Sarah Chen',
    createdAt: '2024-01-15 14:30:22',
    dueDate: '2024-01-15 17:00:00',
    description: 'Review AI-generated dissolution testing parameters for multi-strength formulation',
    aiRecommendation: 'Paddle method, 50 RPM, 0.1N HCl for 2h then pH 6.8 phosphate buffer',
    confidenceScore: 87
  },
  {
    id: 'HITL-002',
    protocolId: 'PROT-2024-002',
    product: 'Lisinopril Tablet 10mg/20mg',
    section: 'Impurity Testing Strategy',
    priority: 'medium',
    status: 'in_review',
    assignedTo: 'Dr. Michael Rodriguez',
    createdAt: '2024-01-15 13:15:45',
    dueDate: '2024-01-15 16:30:00',
    description: 'Validate impurity testing approach and acceptance criteria',
    aiRecommendation: 'HPLC method with gradient elution, 0.15% reporting threshold',
    expertNotes: 'Consider lowering to 0.10% based on ICH M7 guidance',
    confidenceScore: 92
  },
  {
    id: 'HITL-003',
    protocolId: 'PROT-2024-003',
    product: 'Atorvastatin Calcium 20mg/40mg/80mg',
    section: 'Stability Protocol Design',
    priority: 'high',
    status: 'needs_revision',
    assignedTo: 'Dr. Jennifer Wu',
    createdAt: '2024-01-15 12:45:10',
    dueDate: '2024-01-15 15:45:00',
    description: 'Review stability testing conditions and time points',
    aiRecommendation: 'ICH zones I/II, 25°C/60% RH, 40°C/75% RH for 6 months',
    expertNotes: 'Add intermediate condition 30°C/65% RH for zone IV markets',
    confidenceScore: 78
  },
  {
    id: 'HITL-004',
    protocolId: 'PROT-2024-004',
    product: 'Amlodipine Besylate Tablet 5mg/10mg',
    section: 'Assay Method Validation',
    priority: 'low',
    status: 'approved',
    assignedTo: 'Dr. Robert Kim',
    createdAt: '2024-01-15 11:20:33',
    dueDate: '2024-01-15 14:20:00',
    description: 'Validate HPLC assay method parameters',
    aiRecommendation: 'C18 column, UV detection at 240nm, isocratic method',
    expertNotes: 'Approved as recommended. Method aligns with USP monograph.',
    confidenceScore: 95
  }
];

const expertFeedback: ExpertFeedback[] = [
  {
    taskId: 'HITL-001',
    feedback: 'The dissolution parameters look good overall, but consider adding a discriminatory test condition.',
    changes: ['Added pH 4.5 acetate buffer condition', 'Increased sample points to 8'],
    rating: 4,
    timestamp: '2024-01-15 15:45:22'
  },
  {
    taskId: 'HITL-002',
    feedback: 'Method is robust. Small adjustment to reporting threshold based on latest guidance.',
    changes: ['Lowered reporting threshold to 0.10%', 'Updated reference to ICH M7(R1)'],
    rating: 5,
    timestamp: '2024-01-15 14:20:15'
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-700 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-700 border-green-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-orange-100 text-orange-700';
    case 'in_review': return 'bg-blue-100 text-blue-700';
    case 'approved': return 'bg-green-100 text-green-700';
    case 'rejected': return 'bg-red-100 text-red-700';
    case 'needs_revision': return 'bg-purple-100 text-purple-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export function HITLInterface() {
  const [selectedTask, setSelectedTask] = useState<HITLTask | null>(hitlTasks[0]);
  const [reviewNotes, setReviewNotes] = useState('');
  const [selectedTab, setSelectedTab] = useState('tasks');

  const pendingTasks = hitlTasks.filter(task => task.status === 'pending').length;
  const inReviewTasks = hitlTasks.filter(task => task.status === 'in_review').length;
  const completedToday = hitlTasks.filter(task => 
    task.status === 'approved' && 
    task.createdAt.startsWith('2024-01-15')
  ).length;

  const handleTaskAction = (action: 'approve' | 'reject' | 'revise') => {
    if (!selectedTask) return;
    
    console.log(`${action} task ${selectedTask.id}`);
    // In real implementation, this would update the task status
  };

  return (
    <div className="space-y-6">
      {/* HITL Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-700">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-900">{pendingTasks}</div>
            <p className="text-xs text-orange-600 mt-1">Awaiting expert review</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700">In Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900">{inReviewTasks}</div>
            <p className="text-xs text-blue-600 mt-1">Currently being reviewed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900">{completedToday}</div>
            <p className="text-xs text-green-600 mt-1">Tasks completed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700">AI Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900">89%</div>
            <p className="text-xs text-purple-600 mt-1">Average across pending</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
          <TabsTrigger value="tasks">Review Tasks</TabsTrigger>
          <TabsTrigger value="queue">Task Queue</TabsTrigger>
          <TabsTrigger value="feedback">Learning Feedback</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task List */}
            <Card>
              <CardHeader>
                <CardTitle>Active Tasks</CardTitle>
                <CardDescription>Tasks requiring expert review and approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hitlTasks.map((task) => (
                    <div 
                      key={task.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedTask?.id === task.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedTask(task)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm">{task.id}</h4>
                            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-600">{task.product}</p>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-slate-700 mb-2">{task.section}</p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Due: {task.dueDate.split(' ')[1]}</span>
                        <span>Confidence: {task.confidenceScore}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Task Detail */}
            {selectedTask && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{selectedTask.id}</CardTitle>
                      <CardDescription>{selectedTask.product}</CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(selectedTask.status)}`}>
                      {selectedTask.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-slate-600 mb-2">Section Under Review</h4>
                      <p className="text-sm text-slate-900">{selectedTask.section}</p>
                    </div>

                    <div>
                      <h4 className="text-sm text-slate-600 mb-2">Description</h4>
                      <p className="text-sm text-slate-700">{selectedTask.description}</p>
                    </div>

                    <div>
                      <h4 className="text-sm text-slate-600 mb-2">AI Recommendation</h4>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-blue-600">Confidence Score</span>
                          <span className="text-xs text-blue-700">{selectedTask.confidenceScore}%</span>
                        </div>
                        <Progress value={selectedTask.confidenceScore} className="h-1 mb-2" />
                        <p className="text-sm text-blue-900">{selectedTask.aiRecommendation}</p>
                      </div>
                    </div>

                    {selectedTask.expertNotes && (
                      <div>
                        <h4 className="text-sm text-slate-600 mb-2">Expert Notes</h4>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-900">{selectedTask.expertNotes}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm text-slate-600 mb-2">Review Notes</h4>
                      <Textarea 
                        placeholder="Add your review comments and recommendations..."
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleTaskAction('approve')}
                        disabled={selectedTask.status !== 'pending' && selectedTask.status !== 'in_review'}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleTaskAction('revise')}
                        disabled={selectedTask.status !== 'pending' && selectedTask.status !== 'in_review'}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Request Revision
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => handleTaskAction('reject')}
                        disabled={selectedTask.status !== 'pending' && selectedTask.status !== 'in_review'}
                      >
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Task Queue Management</CardTitle>
              <CardDescription>Prioritize and manage HITL review queue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hitlTasks
                  .sort((a, b) => {
                    const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
                    return priorityOrder[a.priority as keyof typeof priorityOrder] - 
                           priorityOrder[b.priority as keyof typeof priorityOrder];
                  })
                  .map((task, index) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg text-slate-400">#{index + 1}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm">{task.id}</h4>
                            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-600">{task.product}</p>
                          <p className="text-xs text-slate-500">{task.section}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-right">
                        <div>
                          <p className="text-xs text-slate-600">Assigned</p>
                          <p className="text-sm">{task.assignedTo}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600">Due</p>
                          <p className="text-sm">{task.dueDate.split(' ')[1]}</p>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Learning Feedback System</CardTitle>
              <CardDescription>Expert feedback used to improve AI recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {expertFeedback.map((feedback) => (
                  <div key={feedback.taskId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm">Task: {feedback.taskId}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-600">Expert Rating:</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div 
                              key={star}
                              className={`w-3 h-3 rounded-full ${
                                star <= feedback.rating ? 'bg-yellow-400' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="text-xs text-slate-600 mb-1">Expert Feedback</h5>
                      <p className="text-sm text-slate-700">{feedback.feedback}</p>
                    </div>

                    <div className="mb-3">
                      <h5 className="text-xs text-slate-600 mb-2">Changes Made</h5>
                      <div className="space-y-1">
                        {feedback.changes.map((change, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Edit3 className="h-3 w-3 text-blue-500" />
                            <span className="text-xs text-slate-700">{change}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-500">
                      Submitted: {feedback.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>HITL Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Review Time</span>
                    <span className="text-sm">47 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Expert Agreement Rate</span>
                    <span className="text-sm">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tasks Completed/Day</span>
                    <span className="text-sm">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average AI Confidence</span>
                    <span className="text-sm">89%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Improvement Rate</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">+12%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Patterns Learned</span>
                    <span className="text-sm">234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Feedback Cycles</span>
                    <span className="text-sm">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Knowledge Updates</span>
                    <span className="text-sm">18 today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}