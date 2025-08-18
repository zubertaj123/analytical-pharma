import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { DocumentViewer } from './DocumentViewer';
import { 
  FileText, 
  Brain, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Upload,
  Download,
  Eye,
  Edit3,
  Save,
  Send,
  FileCheck,
  Award
} from 'lucide-react';

interface ProtocolSpec {
  productName: string;
  analyticalMethod: string;
  regulatoryContext: string;
  testType: string;
  sampleMatrix: string;
  expectedRange: string;
  criticalParameters: string[];
}

interface GeneratedProtocol {
  id: string;
  title: string;
  status: 'draft' | 'under_review' | 'approved' | 'rejected';
  aiConfidence: number;
  generatedDate: string;
  lastModified: string;
  sections: {
    objective: string;
    scope: string;
    methodology: string;
    acceptanceCriteria: string;
    equipment: string[];
    reagents: string[];
    procedure: string[];
  };
  reviewComments: string[];
  complianceScore: number;
  reviewStatus?: {
    totalSections: number;
    approvedSections: number;
    pendingSections: number;
    needsModification: number;
  };
}

interface ProtocolCreationProps {
  onItemSelect?: (itemId: string) => void;
}

export function ProtocolCreation({ onItemSelect }: ProtocolCreationProps) {
  const [activeTab, setActiveTab] = useState('specification');
  const [protocolSpec, setProtocolSpec] = useState<ProtocolSpec>({
    productName: '',
    analyticalMethod: '',
    regulatoryContext: 'USP',
    testType: 'quantitative',
    sampleMatrix: 'tablet',
    expectedRange: '',
    criticalParameters: []
  });

  const [generatedProtocols, setGeneratedProtocols] = useState<GeneratedProtocol[]>([
    {
      id: 'PROT-2024-001',
      title: 'HPLC Assay Method for Metformin Hydrochloride Tablets',
      status: 'under_review',
      aiConfidence: 94,
      generatedDate: '2024-01-15',
      lastModified: '2024-01-16',
      sections: {
        objective: 'To develop and validate an HPLC method for the quantitative determination of Metformin Hydrochloride in tablet formulation.',
        scope: 'This method is applicable for the analysis of Metformin HCl tablets containing 500mg and 850mg strength.',
        methodology: 'Reverse-phase HPLC with UV detection at 254nm using C18 column with gradient elution.',
        acceptanceCriteria: 'Recovery: 98.0-102.0%, RSD ≤ 2.0%, Linearity: r² ≥ 0.999',
        equipment: ['HPLC system with UV detector', 'C18 column (250 x 4.6mm, 5μm)', 'Analytical balance', 'pH meter'],
        reagents: ['Metformin HCl reference standard', 'Acetonitrile HPLC grade', 'Phosphate buffer pH 3.0', 'Water for injection'],
        procedure: [
          'Prepare standard solution: 100μg/mL in mobile phase',
          'Prepare sample solution: Extract and dilute to 100μg/mL',
          'Inject 10μL aliquots in triplicate',
          'Calculate assay using external standard method'
        ]
      },
      reviewComments: ['Methodology appears robust', 'Consider adding system suitability requirements'],
      complianceScore: 92,
      reviewStatus: {
        totalSections: 6,
        approvedSections: 2,
        pendingSections: 3,
        needsModification: 1
      }
    },
    {
      id: 'PROT-2024-002',
      title: 'Dissolution Method Validation for TYRA-300 Sprinkle Capsules',
      status: 'approved',
      aiConfidence: 96,
      generatedDate: '2024-01-12',
      lastModified: '2024-01-14',
      sections: {
        objective: 'Early phase method validation of the Dissolution by HPLC analytical procedure for TYRA-300 sprinkle capsules (1mg, 5mg, 10mg strengths).',
        scope: 'Validation includes System Suitability, Specificity, Linearity, Accuracy, Precision, Filter Study, and Solution Stability for dissolution testing.',
        methodology: 'HPLC analysis using Zorbax Eclipse XDB C-18 column (150x4.6mm, 3.5µm) with mobile phase Water:ACN:TFA (60:40:0.1). Dissolution in 0.05% CTAB in 0.01N HCl using USP Type II apparatus at 75 RPM, 37°C.',
        acceptanceCriteria: 'Linearity: r ≥ 0.999, Accuracy: 90-110% recovery, Precision: RSD ≤ 5%, System Suitability: RSD ≤ 2%',
        equipment: [
          'HPLC system with UV detector (325nm)', 
          'Zorbax Eclipse XDB C-18 column (150x4.6mm, 3.5µm)',
          'USP Type II Dissolution Apparatus',
          'Japanese sinkers',
          'Autosampler with 10µm filters',
          'Analytical balance',
          'Water bath (37°C ± 0.5°C)'
        ],
        reagents: [
          'TYRA-300-B01 Reference Standard',
          'Acetonitrile, HPLC grade',
          'Trifluoroacetic Acid (TFA), HPLC grade',
          'Concentrated HCl, Reagent Grade',
          'Cetyltrimethylammonium Bromide (CTAB)',
          'Methanol, HPLC grade',
          'Purified Water',
          '0.45µm wwPTFE filters',
          '10µm porous UHMW polyethylene filters'
        ],
        procedure: [
          'Mobile Phase Preparation: 600mL water + 400mL ACN + 1mL TFA per 1L',
          'Dissolution Medium: 0.5g CTAB per 1L of 0.01N HCl',
          'Standard Solution: 65mg TYRA-300-B01 in 100mL methanol:water (90:10), dilute 1:100 with medium',
          'Dissolution Conditions: 900mL medium, 75 RPM, 37°C, sampling at 15, 30, 45, 60, 75 min',
          'Sample Analysis: Filter through 0.45µm filters, inject 20µL, detect at 325nm',
          'System Suitability: RSD ≤ 2% for 6 consecutive standard injections'
        ]
      },
      reviewComments: ['Comprehensive validation protocol', 'All ICH Q2(R1) parameters covered', 'Ready for laboratory execution'],
      complianceScore: 98,
      reviewStatus: {
        totalSections: 6,
        approvedSections: 6,
        pendingSections: 0,
        needsModification: 0
      }
    },
    {
      id: 'PROT-2024-003',
      title: 'Dissolution Method for Extended Release Tablets',
      status: 'draft',
      aiConfidence: 87,
      generatedDate: '2024-01-14',
      lastModified: '2024-01-14',
      sections: {
        objective: 'To establish a dissolution method for extended release tablet formulation.',
        scope: 'Applicable for XR tablets with 12-hour release profile.',
        methodology: 'USP Apparatus II (paddle) method at 50 RPM in pH 6.8 phosphate buffer.',
        acceptanceCriteria: 'Q values: 1h ≤ 25%, 4h: 40-60%, 8h: 70-90%, 12h ≥ 80%',
        equipment: ['Dissolution apparatus USP II', 'UV-Vis spectrophotometer', 'Water bath'],
        reagents: ['Phosphate buffer pH 6.8', 'Reference standard', 'HCl 0.1N'],
        procedure: [
          'Fill dissolution vessels with 900mL buffer at 37°C',
          'Place tablets in baskets, start rotation at 50 RPM',
          'Sample at 1, 4, 8, and 12 hours',
          'Analyze by UV spectrophotometry at 233nm'
        ]
      },
      reviewComments: [],
      complianceScore: 88,
      reviewStatus: {
        totalSections: 6,
        approvedSections: 0,
        pendingSections: 6,
        needsModification: 0
      }
    }
  ]);

  const [selectedProtocol, setSelectedProtocol] = useState<GeneratedProtocol | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [documentToView, setDocumentToView] = useState<GeneratedProtocol | null>(null);

  const handleGenerateProtocol = async () => {
    setIsGenerating(true);
    setActiveTab('protocols');
    
    // Simulate AI protocol generation
    setTimeout(() => {
      const newProtocol: GeneratedProtocol = {
        id: `PROT-2024-${String(generatedProtocols.length + 1).padStart(3, '0')}`,
        title: `${protocolSpec.analyticalMethod} Method for ${protocolSpec.productName}`,
        status: 'draft',
        aiConfidence: Math.floor(Math.random() * 15) + 85,
        generatedDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        sections: {
          objective: `To develop and validate a ${protocolSpec.analyticalMethod} method for ${protocolSpec.productName}.`,
          scope: `This method is applicable for ${protocolSpec.sampleMatrix} analysis.`,
          methodology: `${protocolSpec.analyticalMethod} method with appropriate detection parameters.`,
          acceptanceCriteria: protocolSpec.expectedRange ? `Target range: ${protocolSpec.expectedRange}` : 'To be established during validation',
          equipment: ['Analytical instrument', 'Analytical balance', 'Glassware'],
          reagents: ['Reference standard', 'Mobile phase components', 'Buffer solutions'],
          procedure: [
            'Prepare standard solutions',
            'Prepare sample solutions',
            'Perform analysis',
            'Calculate results'
          ]
        },
        reviewComments: [],
        complianceScore: Math.floor(Math.random() * 20) + 80,
        reviewStatus: {
          totalSections: 6,
          approvedSections: 0,
          pendingSections: 6,
          needsModification: 0
        }
      };
      
      setGeneratedProtocols(prev => [newProtocol, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  const handleProtocolReview = (protocolId: string, action: 'approve' | 'reject', comment?: string) => {
    setGeneratedProtocols(prev => prev.map(p => {
      if (p.id === protocolId) {
        return {
          ...p,
          status: action === 'approve' ? 'approved' : 'rejected',
          reviewComments: comment ? [...p.reviewComments, comment] : p.reviewComments,
          lastModified: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'under_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'under_review': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'rejected': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <FileText className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Viewer Modal */}
      {showDocumentViewer && documentToView && (
        <DocumentViewer
          document={documentToView}
          type="protocol"
          onClose={() => {
            setShowDocumentViewer(false);
            setDocumentToView(null);
          }}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Protocol Creation & AI Generation</h2>
          <p className="text-slate-600 mt-1">Create analytical protocols with AI assistance and human validation</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-green-600 border-green-200">
            {generatedProtocols.filter(p => p.status === 'approved').length} Protocols Approved
          </Badge>
          <Badge variant="outline" className="text-yellow-600 border-yellow-200">
            {generatedProtocols.filter(p => p.status === 'under_review').length} Under Review
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
          <TabsTrigger value="specification" className="flex items-center space-x-2">
            <Edit3 className="h-4 w-4" />
            <span>Specification Input</span>
          </TabsTrigger>
          <TabsTrigger value="protocols" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>AI-Generated Protocols</span>
          </TabsTrigger>
          <TabsTrigger value="review" className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Human Review</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="specification">
          <Card>
            <CardHeader>
              <CardTitle>Product & Method Specifications</CardTitle>
              <CardDescription>
                Enter the analytical requirements and product details for AI protocol generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                      id="productName"
                      placeholder="e.g., Metformin HCl Tablets"
                      value={protocolSpec.productName}
                      onChange={(e) => setProtocolSpec(prev => ({...prev, productName: e.target.value}))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="analyticalMethod">Analytical Method</Label>
                    <Select 
                      value={protocolSpec.analyticalMethod} 
                      onValueChange={(value) => setProtocolSpec(prev => ({...prev, analyticalMethod: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select analytical method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HPLC">HPLC</SelectItem>
                        <SelectItem value="GC">Gas Chromatography</SelectItem>
                        <SelectItem value="UV-Vis">UV-Visible Spectroscopy</SelectItem>
                        <SelectItem value="Dissolution">Dissolution Testing</SelectItem>
                        <SelectItem value="Titration">Titration</SelectItem>
                        <SelectItem value="Karl Fischer">Karl Fischer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="regulatoryContext">Regulatory Context</Label>
                    <Select 
                      value={protocolSpec.regulatoryContext} 
                      onValueChange={(value) => setProtocolSpec(prev => ({...prev, regulatoryContext: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USP">USP (United States Pharmacopeia)</SelectItem>
                        <SelectItem value="EP">EP (European Pharmacopoeia)</SelectItem>
                        <SelectItem value="JP">JP (Japanese Pharmacopoeia)</SelectItem>
                        <SelectItem value="ICH">ICH Guidelines</SelectItem>
                        <SelectItem value="FDA">FDA Guidelines</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="testType">Test Type</Label>
                    <Select 
                      value={protocolSpec.testType} 
                      onValueChange={(value) => setProtocolSpec(prev => ({...prev, testType: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quantitative">Quantitative Assay</SelectItem>
                        <SelectItem value="qualitative">Qualitative Identity</SelectItem>
                        <SelectItem value="impurity">Impurity Testing</SelectItem>
                        <SelectItem value="dissolution">Dissolution</SelectItem>
                        <SelectItem value="stability">Stability Testing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sampleMatrix">Sample Matrix</Label>
                    <Select 
                      value={protocolSpec.sampleMatrix} 
                      onValueChange={(value) => setProtocolSpec(prev => ({...prev, sampleMatrix: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="capsule">Capsule</SelectItem>
                        <SelectItem value="liquid">Liquid Formulation</SelectItem>
                        <SelectItem value="raw_material">Raw Material</SelectItem>
                        <SelectItem value="injection">Injection</SelectItem>
                        <SelectItem value="topical">Topical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="expectedRange">Expected Range/Specification</Label>
                    <Input
                      id="expectedRange"
                      placeholder="e.g., 95.0-105.0% of labeled amount"
                      value={protocolSpec.expectedRange}
                      onChange={(e) => setProtocolSpec(prev => ({...prev, expectedRange: e.target.value}))}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Additional Requirements</Label>
                <Textarea
                  placeholder="Specify any additional requirements, constraints, or critical parameters..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  size="lg" 
                  onClick={handleGenerateProtocol}
                  disabled={!protocolSpec.productName || !protocolSpec.analyticalMethod || isGenerating}
                  className="px-8"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Protocol...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Generate AI Protocol
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protocols">
          <div className="space-y-4">
            {isGenerating && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <div>
                      <h3 className="text-lg font-medium text-blue-900">AI Protocol Generation in Progress</h3>
                      <p className="text-blue-700">Analyzing specifications and generating protocol draft...</p>
                      <Progress value={65} className="w-full mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {generatedProtocols.map((protocol) => (
              <Card key={protocol.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{protocol.title}</CardTitle>
                      <CardDescription>
                        Protocol ID: {protocol.id} • Generated: {protocol.generatedDate}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(protocol.status)}
                      <Badge className={getStatusColor(protocol.status)}>
                        {protocol.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        AI Confidence: {protocol.aiConfidence}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Protocol Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="p-3 text-center">
                          <Brain className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                          <div className="text-lg font-medium text-blue-900">{protocol.aiConfidence}%</div>
                          <div className="text-xs text-blue-700">AI Confidence</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-green-200 bg-green-50">
                        <CardContent className="p-3 text-center">
                          <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                          <div className="text-lg font-medium text-green-900">{protocol.complianceScore}%</div>
                          <div className="text-xs text-green-700">Compliance</div>
                        </CardContent>
                      </Card>

                      {protocol.reviewStatus && (
                        <>
                          <Card className="border-green-200 bg-green-50">
                            <CardContent className="p-3 text-center">
                              <Award className="h-6 w-6 text-green-600 mx-auto mb-1" />
                              <div className="text-lg font-medium text-green-900">{protocol.reviewStatus.approvedSections}</div>
                              <div className="text-xs text-green-700">Approved</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-yellow-200 bg-yellow-50">
                            <CardContent className="p-3 text-center">
                              <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
                              <div className="text-lg font-medium text-yellow-900">{protocol.reviewStatus.pendingSections}</div>
                              <div className="text-xs text-yellow-700">Pending</div>
                            </CardContent>
                          </Card>
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Objective</h4>
                        <p className="text-sm text-slate-600">{protocol.sections.objective}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Methodology</h4>
                        <p className="text-sm text-slate-600">{protocol.sections.methodology}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Acceptance Criteria</h4>
                      <p className="text-sm text-slate-600">{protocol.sections.acceptanceCriteria}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-slate-600">
                          Compliance Score: <span className="font-medium text-slate-900">{protocol.complianceScore}%</span>
                        </div>
                        <div className="text-sm text-slate-600">
                          Last Modified: {protocol.lastModified}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {onItemSelect && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onItemSelect(protocol.id)}
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            Track Progress
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setDocumentToView(protocol);
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
          {selectedProtocol ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Human-in-the-Loop Protocol Review</CardTitle>
                      <CardDescription>Review and validate AI-generated protocol: {selectedProtocol.id}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(selectedProtocol.status)}>
                      {selectedProtocol.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-lg font-medium text-blue-900">{selectedProtocol.aiConfidence}%</div>
                            <div className="text-sm text-blue-700">AI Confidence</div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-green-200 bg-green-50">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <div className="text-lg font-medium text-green-900">{selectedProtocol.complianceScore}%</div>
                            <div className="text-sm text-green-700">Compliance Score</div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-orange-200 bg-orange-50">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                            <div className="text-lg font-medium text-orange-900">2</div>
                            <div className="text-sm text-orange-700">Review Items</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Objective</h4>
                        <p className="text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">{selectedProtocol.sections.objective}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Methodology</h4>
                        <p className="text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">{selectedProtocol.sections.methodology}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Procedure</h4>
                        <div className="space-y-2">
                          {selectedProtocol.sections.procedure.map((step, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </div>
                              <p className="text-sm text-slate-600">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Review Comments</Label>
                      <Textarea
                        placeholder="Add your review comments, suggestions, or required modifications..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedProtocol(null)}
                      >
                        Back to List
                      </Button>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline"
                          onClick={() => handleProtocolReview(selectedProtocol.id, 'reject', 'Modifications required')}
                        >
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Request Changes
                        </Button>
                        <Button 
                          onClick={() => handleProtocolReview(selectedProtocol.id, 'approve', 'Protocol approved for lab execution')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve Protocol
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Protocol Review</CardTitle>
                <CardDescription>
                  Select a protocol from the "AI-Generated Protocols" tab to begin the review process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Eye className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No Protocol Selected</h3>
                  <p className="text-slate-600 mb-6">
                    Choose a protocol to start the human-in-the-loop review process
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('protocols')}
                  >
                    View Generated Protocols
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}