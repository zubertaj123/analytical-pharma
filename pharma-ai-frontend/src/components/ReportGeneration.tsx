import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { DocumentViewer } from './DocumentViewer';
import { 
  Upload, 
  FileSpreadsheet, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Brain,
  Eye,
  Download,
  FileText,
  Clock,
  Edit3,
  PieChart,
  FileCheck,
  Zap,
  Award,
  MessageSquare
} from 'lucide-react';

interface ReportData {
  id: string;
  protocolId: string;
  protocolName: string;
  labResultIds: string[];
  status: 'generating' | 'draft' | 'under_review' | 'approved' | 'published';
  generatedDate: string;
  lastModified: string;
  aiConfidence: number;
  sections: {
    summary: string;
    objectives: string;
    methodology: string;
    results: string;
    statisticalAnalysis: string;
    conclusions: string;
    recommendations: string;
  };
  tables: {
    title: string;
    data: Record<string, any>[];
  }[];
  charts: {
    type: 'bar' | 'line' | 'pie';
    title: string;
    data: any[];
  }[];
  complianceScore: number;
  reviewComments: string[];
  deviations: {
    description: string;
    impact: 'low' | 'medium' | 'high';
    resolution: string;
  }[];
  reviewStatus?: {
    totalSections: number;
    approvedSections: number;
    pendingSections: number;
    needsModification: number;
  };
}

interface ReportGenerationProps {
  onItemSelect?: (itemId: string) => void;
}

export function ReportGeneration({ onItemSelect }: ReportGenerationProps) {
  const [activeTab, setActiveTab] = useState('generation');
  const [selectedLabResults, setSelectedLabResults] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [documentToView, setDocumentToView] = useState<ReportData | null>(null);

  const [reports, setReports] = useState<ReportData[]>([
    {
      id: 'RPT-01941',
      protocolId: 'PRO-02815',
      protocolName: 'TYRA-300 Sprinkle Capsules, 1 mg, 5 mg, 10 mg: Dissolution Method by HPLC',
      labResultIds: ['LR-2024-001', 'LR-2024-002', 'LR-2024-003'],
      status: 'approved',
      generatedDate: '2023-11-15',
      lastModified: '2023-12-01',
      aiConfidence: 98,
      sections: {
        summary: 'This report summarizes the findings for the execution of method validation protocol PRO-02815 (v1.0) which pertains to the early phase method validation of the Dissolution by HPLC analytical procedure for TYRA-300 sprinkle capsules. The method validation was successfully executed and found to be suitable for its intended use.',
        objectives: 'To demonstrate that the dissolution method is suitable for intended use through validation of System Suitability, Specificity, Linearity, Accuracy, Precision, Filter Study, and Solution Stability parameters.',
        methodology: 'HPLC analysis using Zorbax Eclipse XDB C-18 column (150x4.6mm, 3.5µm) with mobile phase Water:ACN:TFA (60:40:0.1) at 1.0 mL/min, 325nm detection. Dissolution testing using USP Type II apparatus with 0.05% CTAB in 0.01N HCl medium at 75 RPM, 37°C. Sample points at 15, 30, 45, 60, and 75 minutes.',
        results: 'All validation parameters met acceptance criteria. System suitability: RSD 0.2%, Check standard 100% recovery. Specificity: No interference detected. Linearity: r = 1.000 (0.5-15.0 μg/mL). Accuracy: 100-101% recovery across all levels (RSD ≤ 0.4%). Precision: RSD 11.6% at 15 min, improving to 1.7% at 75 min for 1mg; RSD 6.9% at 15 min, improving to 1.5% at 75 min for 10mg.',
        statisticalAnalysis: 'Method range established as 0.5-15.0 μg/mL for TYRA-300 free base, corresponding to 4.5-135% of nominal sample concentration for 10mg dose. Precision study demonstrated acceptable variability with RSD ≤ 20% at early timepoints and ≤ 10% at later timepoints per FDA guidance.',
        conclusions: 'The method validation protocol PRO-02815 (v1.0) for TYRA-300 Sprinkle Capsules was successfully executed and found to be suitable for its intended use. Method demonstrates excellent linearity, accuracy, and precision across the analytical range.',
        recommendations: 'Method validated and ready for routine use. Standard and sample solutions stable for 4 days when protected from light at normal laboratory conditions. Mobile phase stable for 8 days at normal laboratory conditions.'
      },
      tables: [
        {
          title: 'System Suitability Results',
          data: [
            { criteria: 'Dissolution Media Interference', result: 'Not Detected', acceptance: 'NMT 2%', status: 'Pass' },
            { criteria: '% RSD of Replicate Standard Injections (n=6)', result: '0.2%', acceptance: 'NMT 2%', status: 'Pass' },
            { criteria: 'Check Standard % Recovery', result: '100%', acceptance: '97-103%', status: 'Pass' },
            { criteria: 'Bracketing Standard Retention Time', result: '2%-4%', acceptance: 'Within 20%', status: 'Pass' }
          ]
        },
        {
          title: 'Specificity Results',
          data: [
            { interference: 'Dissolution Medium', result: 'Not Detected', acceptance: 'NMT 2%', status: 'Pass' },
            { interference: 'Placebo', result: 'Not Detected', acceptance: 'NMT 2%', status: 'Pass' }
          ]
        },
        {
          title: 'Linearity Results',
          data: [
            { level: 'L1 (10%)', concentration: '0.50 μg/mL', peakArea: '15800', status: 'Pass' },
            { level: 'L2 (50%)', concentration: '2.48 μg/mL', peakArea: '80002', status: 'Pass' },
            { level: 'L3 (100%)', concentration: '4.96 μg/mL', peakArea: '160732', status: 'Pass' },
            { level: 'L4 (150%)', concentration: '7.44 μg/mL', peakArea: '241100', status: 'Pass' },
            { level: 'L5 (300%)', concentration: '14.88 μg/mL', peakArea: '484829', status: 'Pass' }
          ]
        }
      ],
      charts: [
        {
          type: 'line',
          title: 'TYRA-300 Dissolution Profiles',
          data: [
            { time: 15, '1mg': 85, '10mg': 82 },
            { time: 30, '1mg': 97, '10mg': 94 },
            { time: 45, '1mg': 102, '10mg': 98 },
            { time: 60, '1mg': 104, '10mg': 99 },
            { time: 75, '1mg': 105, '10mg': 102 }
          ]
        }
      ],
      complianceScore: 100,
      reviewComments: [
        'All validation parameters successfully demonstrated per ICH Q2(R1) guidelines',
        'Method demonstrates excellent analytical performance across full range',
        'Dissolution profiles show good discrimination between strengths',
        'Report approved by VP PD & Tech Ops and QA Consultant'
      ],
      deviations: [
        {
          description: 'Corrected Croscarmellose Sodium amount for 10mg in formulation table',
          impact: 'low',
          resolution: 'Editorial correction made to Table 1-1, no impact on analytical method'
        },
        {
          description: 'Added light protection requirements for standard and sample solutions',
          impact: 'medium',
          resolution: 'Based on stability study findings, added notes to protect solutions from light during storage'
        }
      ],
      reviewStatus: {
        totalSections: 7,
        approvedSections: 7,
        pendingSections: 0,
        needsModification: 0
      }
    },
    {
      id: 'RPT-2024-002',
      protocolId: 'PROT-2024-001',
      protocolName: 'HPLC Assay Method for Metformin Hydrochloride Tablets',
      labResultIds: ['LR-2024-004'],
      status: 'under_review',
      generatedDate: '2024-01-14',
      lastModified: '2024-01-15',
      aiConfidence: 94,
      sections: {
        summary: 'Method validation report for HPLC assay of Metformin HCl tablets demonstrating compliance with USP monograph requirements.',
        objectives: 'To validate HPLC method for quantitative determination of Metformin HCl in tablet formulation.',
        methodology: 'Reverse-phase HPLC with UV detection at 254nm using C18 column with gradient elution.',
        results: 'Method demonstrated good linearity, precision, and accuracy. All parameters met acceptance criteria.',
        statisticalAnalysis: 'Statistical evaluation confirmed method robustness with excellent precision and accuracy.',
        conclusions: 'HPLC method is validated and suitable for routine analysis of Metformin HCl tablets.',
        recommendations: 'Implement for routine QC testing. Monitor system suitability parameters during routine use.'
      },
      tables: [
        {
          title: 'Metformin HPLC Method Validation Summary',
          data: [
            { parameter: 'Linearity (r²)', result: '0.9998', acceptance: '≥ 0.999', status: 'Pass' },
            { parameter: 'Precision (RSD)', result: '1.2%', acceptance: '≤ 2.0%', status: 'Pass' },
            { parameter: 'Accuracy (Recovery)', result: '100.2%', acceptance: '98.0-102.0%', status: 'Pass' }
          ]
        }
      ],
      charts: [],
      complianceScore: 96,
      reviewComments: ['Method validated successfully', 'Ready for implementation'],
      deviations: [],
      reviewStatus: {
        totalSections: 7,
        approvedSections: 4,
        pendingSections: 2,
        needsModification: 1
      }
    }
  ]);

  const availableLabResults = [
    { id: 'LR-2024-001', name: 'TYRA-300 1mg Dissolution Profile', protocol: 'PROT-2024-002', status: 'passed' },
    { id: 'LR-2024-002', name: 'TYRA-300 10mg Dissolution Profile', protocol: 'PROT-2024-002', status: 'passed' },
    { id: 'LR-2024-003', name: 'TYRA-300 5mg Accuracy Study', protocol: 'PROT-2024-002', status: 'under_review' },
    { id: 'LR-2024-004', name: 'Metformin HCl Assay Results', protocol: 'PROT-2024-001', status: 'passed' }
  ];

  const handleGenerateReport = async () => {
    if (selectedLabResults.length === 0) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    setActiveTab('reports');
    
    // Simulate AI report generation with progress
    const progressSteps = [
      { step: 10, message: 'Analyzing lab results...' },
      { step: 25, message: 'Generating statistical analysis...' },
      { step: 45, message: 'Creating visualizations...' },
      { step: 65, message: 'Writing report sections...' },
      { step: 85, message: 'Performing compliance checks...' },
      { step: 100, message: 'Report generation complete!' }
    ];
    
    for (const { step } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(step);
    }
    
    // Create new report
    const newReport: ReportData = {
      id: `RPT-2024-${String(reports.length + 1).padStart(3, '0')}`,
      protocolId: 'PROT-2024-001',
      protocolName: 'Generated Report',
      labResultIds: selectedLabResults,
      status: 'draft',
      generatedDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      aiConfidence: Math.floor(Math.random() * 15) + 85,
      sections: {
        summary: 'AI-generated analytical report based on selected laboratory results.',
        objectives: 'To summarize and analyze the experimental data according to validation requirements.',
        methodology: 'Statistical analysis of laboratory data with compliance verification.',
        results: 'All parameters within acceptable ranges. Method performance confirmed.',
        statisticalAnalysis: 'Comprehensive statistical evaluation of analytical results.',
        conclusions: 'Method validated and suitable for intended use.',
        recommendations: 'Implement for routine analysis with continued monitoring.'
      },
      tables: [],
      charts: [],
      complianceScore: Math.floor(Math.random() * 20) + 80,
      reviewComments: [],
      deviations: [],
      reviewStatus: {
        totalSections: 7,
        approvedSections: 0,
        pendingSections: 7,
        needsModification: 0
      }
    };
    
    setReports(prev => [newReport, ...prev]);
    setIsGenerating(false);
    setSelectedLabResults([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'published': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'generating': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'published': return <FileCheck className="h-5 w-5 text-blue-600" />;
      case 'under_review': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'generating': return <Zap className="h-5 w-5 text-purple-600" />;
      default: return <FileText className="h-5 w-5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Viewer Modal */}
      {showDocumentViewer && documentToView && (
        <DocumentViewer
          document={documentToView}
          type="report"
          onClose={() => {
            setShowDocumentViewer(false);
            setDocumentToView(null);
          }}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">AI-Assisted Report Generation</h2>
          <p className="text-slate-600 mt-1">Generate analytical reports from validated lab results with human oversight</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-green-600 border-green-200">
            {reports.filter(r => r.status === 'approved').length} Reports Approved
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            {reports.filter(r => r.status === 'published').length} Reports Published
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
          <TabsTrigger value="generation" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>AI Generation</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Generated Reports</span>
          </TabsTrigger>
          <TabsTrigger value="review" className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Human Review</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generation">
          <Card>
            <CardHeader>
              <CardTitle>AI Report Generation</CardTitle>
              <CardDescription>
                Select validated lab results to generate comprehensive analytical reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium text-slate-900 mb-4">Available Lab Results</h4>
                <div className="space-y-3">
                  {availableLabResults.filter(lr => lr.status === 'passed').map((result) => (
                    <Card key={result.id} className="border-slate-200 hover:border-blue-300 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            id={result.id}
                            checked={selectedLabResults.includes(result.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLabResults(prev => [...prev, result.id]);
                              } else {
                                setSelectedLabResults(prev => prev.filter(id => id !== result.id));
                              }
                            }}
                            className="h-4 w-4 text-blue-600"
                          />
                          <div className="flex-1">
                            <label htmlFor={result.id} className="font-medium text-slate-900 cursor-pointer">
                              {result.name}
                            </label>
                            <p className="text-sm text-slate-600">Protocol: {result.protocol}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            {result.status.toUpperCase()}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium text-slate-900 mb-4">Report Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
                    <Select defaultValue="validation">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="validation">Method Validation Report</SelectItem>
                        <SelectItem value="stability">Stability Study Report</SelectItem>
                        <SelectItem value="batch">Batch Analysis Report</SelectItem>
                        <SelectItem value="comparative">Comparative Study Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Regulatory Context</label>
                    <Select defaultValue="ich">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ich">ICH Guidelines</SelectItem>
                        <SelectItem value="usp">USP Standards</SelectItem>
                        <SelectItem value="fda">FDA Requirements</SelectItem>
                        <SelectItem value="ep">European Pharmacopoeia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {isGenerating && (
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Zap className="h-8 w-8 text-purple-600 animate-pulse" />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-purple-900">AI Report Generation in Progress</h3>
                        <p className="text-purple-700">Analyzing data and generating comprehensive report...</p>
                        <Progress value={generationProgress} className="w-full mt-2" />
                        <p className="text-sm text-purple-600 mt-1">{generationProgress}% complete</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={handleGenerateReport}
                  disabled={selectedLabResults.length === 0 || isGenerating}
                  className="px-8"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Generate AI Report
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="space-y-6">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.protocolName}</CardTitle>
                      <CardDescription>
                        Report ID: {report.id} • Generated: {report.generatedDate} • Modified: {report.lastModified}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(report.status)}
                      <Badge className={getStatusColor(report.status)}>
                        {report.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        AI Confidence: {report.aiConfidence}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Report Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="p-3 text-center">
                          <Brain className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                          <div className="text-lg font-medium text-blue-900">{report.aiConfidence}%</div>
                          <div className="text-xs text-blue-700">AI Confidence</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-green-200 bg-green-50">
                        <CardContent className="p-3 text-center">
                          <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                          <div className="text-lg font-medium text-green-900">{report.complianceScore}%</div>
                          <div className="text-xs text-green-700">Compliance</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-purple-200 bg-purple-50">
                        <CardContent className="p-3 text-center">
                          <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                          <div className="text-lg font-medium text-purple-900">{report.tables?.length || 0}</div>
                          <div className="text-xs text-purple-700">Data Tables</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-orange-200 bg-orange-50">
                        <CardContent className="p-3 text-center">
                          <TrendingUp className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                          <div className="text-lg font-medium text-orange-900">{report.charts?.length || 0}</div>
                          <div className="text-xs text-orange-700">Charts</div>
                        </CardContent>
                      </Card>

                      {report.reviewStatus && (
                        <Card className="border-green-200 bg-green-50">
                          <CardContent className="p-3 text-center">
                            <Award className="h-6 w-6 text-green-600 mx-auto mb-1" />
                            <div className="text-lg font-medium text-green-900">
                              {report.reviewStatus.approvedSections}/{report.reviewStatus.totalSections}
                            </div>
                            <div className="text-xs text-green-700">Approved</div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Report Summary */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Executive Summary</h4>
                        <p className="text-sm text-slate-600 p-3 bg-slate-50 rounded-lg line-clamp-3">
                          {report.sections.summary}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Key Results</h4>
                          <p className="text-sm text-slate-600 p-3 bg-slate-50 rounded-lg line-clamp-2">
                            {report.sections.results}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Conclusions</h4>
                          <p className="text-sm text-slate-600 p-3 bg-slate-50 rounded-lg line-clamp-2">
                            {report.sections.conclusions}
                          </p>
                        </div>
                      </div>

                      {/* Deviations */}
                      {report.deviations && report.deviations.length > 0 && (
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                            <AlertTriangle className="h-4 w-4 text-orange-600 mr-2" />
                            Deviations ({report.deviations.length})
                          </h4>
                          <div className="space-y-2">
                            {report.deviations.slice(0, 2).map((deviation, index) => (
                              <div key={index} className="text-sm p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <span className="font-medium text-yellow-900">{deviation.description}</span>
                                <div className="text-xs text-yellow-700 mt-1">
                                  Impact: {deviation.impact.toUpperCase()}
                                </div>
                              </div>
                            ))}
                            {report.deviations.length > 2 && (
                              <div className="text-xs text-slate-500">
                                +{report.deviations.length - 2} more deviations
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Review Comments Preview */}
                      {report.reviewComments && report.reviewComments.length > 0 && (
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                            <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
                            Recent Comments ({report.reviewComments.length})
                          </h4>
                          <div className="space-y-1">
                            {report.reviewComments.slice(0, 2).map((comment, index) => (
                              <div key={index} className="text-sm p-2 bg-blue-50 border border-blue-200 rounded text-blue-700">
                                {comment}
                              </div>
                            ))}
                            {report.reviewComments.length > 2 && (
                              <div className="text-xs text-slate-500">
                                +{report.reviewComments.length - 2} more comments
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-slate-600">
                          Lab Results: <span className="font-medium text-slate-900">{report.labResultIds.length}</span>
                        </div>
                        <div className="text-sm text-slate-600">
                          Last Modified: {report.lastModified}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {onItemSelect && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onItemSelect(report.id)}
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            Track Progress
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setDocumentToView(report);
                            setShowDocumentViewer(true);
                          }}
                          className="bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Start Modular Review
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle>Report Review & Validation</CardTitle>
              <CardDescription>
                Human-in-the-loop validation interface for AI-generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Eye className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Start Section-by-Section Review</h3>
                <p className="text-slate-600 mb-6">
                  Click "Start Modular Review" on any report to begin the granular review process with section-level approval, comments, and audit trail
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('reports')}
                >
                  View Generated Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}