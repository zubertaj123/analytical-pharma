import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Textarea } from './ui/textarea';
import { 
  Package, 
  FileCheck, 
  Shield, 
  History,
  CheckCircle,
  AlertTriangle,
  Download,
  Send,
  Eye,
  FileText,
  Clock,
  Users,
  Lock,
  Award,
  TrendingUp
} from 'lucide-react';

interface RegulatoryPackage {
  id: string;
  name: string;
  status: 'draft' | 'under_review' | 'approved' | 'submitted' | 'accepted';
  createdDate: string;
  lastModified: string;
  submissionDate?: string;
  includeProtocols: string[];
  includeReports: string[];
  packageType: 'nda' | 'anda' | 'dmf' | 'ctd' | 'validation';
  regulatoryContext: string;
  documents: {
    category: string;
    name: string;
    version: string;
    status: 'included' | 'pending' | 'missing';
    lastModified: string;
  }[];
  auditTrail: {
    timestamp: string;
    user: string;
    action: string;
    details: string;
  }[];
  complianceChecks: {
    category: string;
    requirement: string;
    status: 'compliant' | 'non_compliant' | 'pending';
    evidence: string;
  }[];
  reviewers: {
    name: string;
    role: string;
    status: 'pending' | 'approved' | 'rejected';
    comments: string;
    reviewDate?: string;
  }[];
}

interface RegulatoryPackageProps {
  onItemSelect?: (itemId: string) => void;
}

export function RegulatoryPackage({ onItemSelect }: RegulatoryPackageProps) {
  const [activeTab, setActiveTab] = useState('packages');
  const [selectedPackage, setSelectedPackage] = useState<RegulatoryPackage | null>(null);

  const [packages, setPackages] = useState<RegulatoryPackage[]>([
    {
      id: 'REG-2024-001',
      name: 'TYRA-300 Dissolution Method Validation Regulatory Submission Package',
      status: 'approved',
      createdDate: '2023-12-01',
      lastModified: '2023-12-05',
      submissionDate: '2023-12-06',
      includeProtocols: ['PRO-02815'],
      includeReports: ['RPT-01941'],
      packageType: 'validation',
      regulatoryContext: 'FDA',
      documents: [
        { category: 'Protocol', name: 'Method Validation Protocol PRO-02815 (v1.0)', version: '1.0', status: 'included', lastModified: '2023-11-09' },
        { category: 'Report', name: 'Method Validation Report RPT-01941 (v1.0)', version: '1.0', status: 'included', lastModified: '2023-12-01' },
        { category: 'Notebook', name: 'Laboratory Notebook ARD-0639 (pg. 1-68)', version: '1.0', status: 'included', lastModified: '2023-11-30' },
        { category: 'Raw Data', name: 'TYRA-300 Dissolution Raw Data Package', version: '1.0', status: 'included', lastModified: '2023-11-28' },
        { category: 'Chromatograms', name: 'HPLC Chromatogram Archive (Figures 1-6)', version: '1.0', status: 'included', lastModified: '2023-11-28' },
        { category: 'Certificate', name: 'TYRA-300-B01 Reference Standard Certificate (Lot 006BJF062)', version: '1.0', status: 'included', lastModified: '2023-10-15' },
        { category: 'Certificate', name: 'Waters Alliance HPLC Calibration (ARDLC98)', version: '1.0', status: 'included', lastModified: '2023-07-24' },
        { category: 'Certificate', name: 'Distek Dissolution System Calibration', version: '1.0', status: 'included', lastModified: '2023-11-15' },
        { category: 'SOP', name: 'HPLC Analysis Standard Operating Procedure', version: '4.2', status: 'included', lastModified: '2023-10-20' },
        { category: 'SOP', name: 'Dissolution Testing Standard Operating Procedure', version: '3.8', status: 'included', lastModified: '2023-09-15' },
        { category: 'Specification', name: 'TYRA-300 Product Specification Document', version: '2.3', status: 'included', lastModified: '2023-11-01' },
        { category: 'Training', name: 'Analyst Qualification Records (John Lutkenhaus)', version: '1.0', status: 'included', lastModified: '2023-08-10' },
        { category: 'Approval', name: 'Customer Approvals (Marazban Sarkari, Jeff Priem)', version: '1.0', status: 'included', lastModified: '2023-12-01' }
      ],
      auditTrail: [
        { timestamp: '2023-12-01 08:00', user: 'John Lutkenhaus', action: 'Report Finalized', details: 'Method validation report RPT-01941 v1.0 completed and signed' },
        { timestamp: '2023-12-01 10:30', user: 'Marazban Sarkari', action: 'VP Approval', details: 'VP PD & Tech Ops approved method validation report' },
        { timestamp: '2023-12-01 14:15', user: 'Jeff Priem', action: 'QA Approval', details: 'QA Consultant approved method validation report' },
        { timestamp: '2023-12-02 09:00', user: 'Regulatory Affairs', action: 'Package Created', details: 'Regulatory submission package created for FDA submission' },
        { timestamp: '2023-12-02 11:30', user: 'Quality Assurance', action: 'Document Review', details: 'All supporting documents reviewed and verified' },
        { timestamp: '2023-12-03 14:00', user: 'Regulatory Affairs', action: 'Compliance Verification', details: 'FDA Method Validation Guidance compliance verified' },
        { timestamp: '2023-12-04 16:45', user: 'Dr. James Wilson', action: 'Final Review', details: 'Regulatory Affairs Director final review completed' },
        { timestamp: '2023-12-05 10:00', user: 'Quality Assurance', action: 'Package Approved', details: 'Complete regulatory package approved for submission' },
        { timestamp: '2023-12-06 09:30', user: 'Regulatory Affairs', action: 'FDA Submission', details: 'Package submitted to FDA via electronic Common Technical Document (eCTD)' }
      ],
      complianceChecks: [
        { category: 'Method Validation', requirement: 'ICH Q2(R1) analytical validation parameters', status: 'compliant', evidence: 'All parameters demonstrated: System Suitability, Specificity, Linearity (r=1.000), Accuracy (100-101%), Precision (RSD ≤ 11.6%)' },
        { category: 'Documentation', requirement: 'Complete protocol and report documentation', status: 'compliant', evidence: 'Protocol PRO-02815 v1.0 and Report RPT-01941 v1.0 with full experimental details' },
        { category: 'Data Integrity', requirement: '21 CFR Part 11 electronic records compliance', status: 'compliant', evidence: 'Laboratory notebook ARD-0639 with complete audit trail and raw data archive' },
        { category: 'Instrumentation', requirement: 'Equipment qualification and calibration', status: 'compliant', evidence: 'Waters Alliance HPLC (ARDLC98) and Distek dissolution systems with current calibration certificates' },
        { category: 'Reference Standards', requirement: 'Certificate of analysis for reference materials', status: 'compliant', evidence: 'TYRA-300-B01 reference standard certificate (Lot 006BJF062, 76.09% purity)' },
        { category: 'Personnel Qualification', requirement: 'Analyst training and competency records', status: 'compliant', evidence: 'John Lutkenhaus qualification records and training documentation on file' },
        { category: 'Method Performance', requirement: 'Suitable analytical range and precision', status: 'compliant', evidence: 'Method range 0.5-15.0 μg/mL (4.5-135% of nominal), precision RSD ≤ 10% at key timepoints' },
        { category: 'Solution Stability', requirement: 'Demonstrated stability of analytical solutions', status: 'compliant', evidence: 'Standard/sample solutions stable 4 days, mobile phase stable 8 days with light protection' },
        { category: 'Filter Validation', requirement: 'Filter compatibility and recovery study', status: 'compliant', evidence: '10μm autosampler and 0.45μm manual filters validated with 97-103% recovery' },
        { category: 'Regulatory Alignment', requirement: 'FDA dissolution method guidance compliance', status: 'compliant', evidence: 'Method follows FDA guidance for immediate release dissolution testing' },
        { category: 'Change Control', requirement: 'Documentation of protocol deviations', status: 'compliant', evidence: 'Three minor deviations documented with appropriate justifications and impact assessments' },
        { category: 'Quality Assurance', requirement: 'Independent QA review and approval', status: 'compliant', evidence: 'Jeff Priem (QA Consultant) review and approval documented' }
      ],
      reviewers: [
        { name: 'John Lutkenhaus', role: 'Principal Analytical Scientist', status: 'approved', comments: 'Method validation successfully executed per protocol. All acceptance criteria met. Excellent linearity (r=1.000) and precision demonstrated.', reviewDate: '2023-12-01' },
        { name: 'Marazban Sarkari', role: 'VP, PD & Tech Ops, Tyra Biosciences', status: 'approved', comments: 'Comprehensive method validation package. Method suitable for intended use and regulatory submission. Approved for commercial application.', reviewDate: '2023-12-01' },
        { name: 'Jeff Priem', role: 'QA Consultant, Tyra Biosciences', status: 'approved', comments: 'Quality assurance review complete. All GMP requirements satisfied. Method demonstrates excellent analytical performance and regulatory compliance.', reviewDate: '2023-12-01' },
        { name: 'Dr. James Wilson', role: 'Regulatory Affairs Director', status: 'approved', comments: 'Regulatory package complete and ready for FDA submission. All validation parameters exceed requirements. Recommend approval for submission.', reviewDate: '2023-12-04' }
      ]
    },
    {
      id: 'REG-2024-002',
      name: 'Metformin HCl HPLC Method Validation Submission',
      status: 'approved',
      createdDate: '2024-01-15',
      lastModified: '2024-01-16',
      includeProtocols: ['PROT-2024-001'],
      includeReports: ['RPT-2024-002'],
      packageType: 'validation',
      regulatoryContext: 'FDA',
      documents: [
        { category: 'Protocol', name: 'Metformin HPLC Assay Protocol', version: '1.0', status: 'included', lastModified: '2024-01-15' },
        { category: 'Report', name: 'Metformin Method Validation Report', version: '1.0', status: 'included', lastModified: '2024-01-15' },
        { category: 'Raw Data', name: 'Metformin Assay Raw Data', version: '1.0', status: 'included', lastModified: '2024-01-15' },
        { category: 'SOP', name: 'HPLC Testing SOP', version: '2.1', status: 'included', lastModified: '2024-01-10' }
      ],
      auditTrail: [
        { timestamp: '2024-01-15 08:00', user: 'Dr. Sarah Chen', action: 'Package Created', details: 'Package for Metformin HPLC method validation' },
        { timestamp: '2024-01-15 08:30', user: 'Dr. Sarah Chen', action: 'Protocol Added', details: 'Added Metformin HPLC protocol PROT-2024-001' },
        { timestamp: '2024-01-16 14:00', user: 'Quality Assurance', action: 'Package Approved', details: 'All reviews completed, package approved for submission' }
      ],
      complianceChecks: [
        { category: 'Documentation', requirement: 'Complete protocol documentation', status: 'compliant', evidence: 'Protocol included and approved' },
        { category: 'Data Integrity', requirement: 'Raw data traceability', status: 'compliant', evidence: 'Complete data package with audit trails' },
        { category: 'Method Validation', requirement: 'USP compliance', status: 'compliant', evidence: 'USP method requirements met' }
      ],
      reviewers: [
        { name: 'Dr. Michael Rodriguez', role: 'Technical Reviewer', status: 'approved', comments: 'Method validation complete and acceptable', reviewDate: '2024-01-15' },
        { name: 'Lisa Thompson', role: 'Quality Assurance', status: 'approved', comments: 'QA review complete, ready for submission', reviewDate: '2024-01-16' }
      ]
    }
  ]);

  const availableProtocols = [
    { id: 'PRO-02815', name: 'Method Validation Protocol for TYRA-300 Dissolution', status: 'approved' },
    { id: 'PROT-2024-001', name: 'HPLC Assay Method for Metformin HCl', status: 'approved' },
    { id: 'PROT-2024-003', name: 'Dissolution Method for XR Tablets', status: 'approved' }
  ];

  const availableReports = [
    { id: 'RPT-01941', name: 'TYRA-300 Method Validation Report (RPT-01941 v1.0)', status: 'approved' },
    { id: 'RPT-2024-002', name: 'Metformin Method Validation Report', status: 'approved' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'accepted': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'under_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'submitted': return <Send className="h-5 w-5 text-blue-600" />;
      case 'accepted': return <Award className="h-5 w-5 text-emerald-600" />;
      case 'under_review': return <Clock className="h-5 w-5 text-yellow-600" />;
      default: return <FileCheck className="h-5 w-5 text-slate-600" />;
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'non_compliant': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const handleCreatePackage = () => {
    const newPackage: RegulatoryPackage = {
      id: `REG-2024-${String(packages.length + 1).padStart(3, '0')}`,
      name: 'New Regulatory Package',
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      includeProtocols: [],
      includeReports: [],
      packageType: 'validation',
      regulatoryContext: 'FDA',
      documents: [],
      auditTrail: [
        { 
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), 
          user: 'Dr. Sarah Chen', 
          action: 'Package Created', 
          details: 'New regulatory package created' 
        }
      ],
      complianceChecks: [],
      reviewers: []
    };
    
    setPackages(prev => [newPackage, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Regulatory Package Creation</h2>
          <p className="text-slate-600 mt-1">Create complete regulatory submission packages with full audit trails</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-green-600 border-green-200">
            {packages.filter(p => p.status === 'approved').length} Packages Approved
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            {packages.filter(p => p.status === 'submitted').length} Submitted
          </Badge>
          <Button onClick={handleCreatePackage}>
            <Package className="h-4 w-4 mr-2" />
            Create Package
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
          <TabsTrigger value="packages" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Packages</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Compliance</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center space-x-2">
            <History className="h-4 w-4" />
            <span>Audit Trail</span>
          </TabsTrigger>
          <TabsTrigger value="review" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Review Process</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="packages">
          <div className="space-y-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <CardDescription>
                        Package ID: {pkg.id} • Created: {pkg.createdDate} • Type: {pkg.packageType.toUpperCase()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(pkg.status)}
                      <Badge className={getStatusColor(pkg.status)}>
                        {pkg.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Package Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="p-3 text-center">
                          <FileText className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                          <div className="text-lg font-medium text-blue-900">{pkg.documents.length}</div>
                          <div className="text-xs text-blue-700">Documents</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-green-200 bg-green-50">
                        <CardContent className="p-3 text-center">
                          <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                          <div className="text-lg font-medium text-green-900">
                            {pkg.complianceChecks.filter(c => c.status === 'compliant').length}
                          </div>
                          <div className="text-xs text-green-700">Compliant</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-yellow-200 bg-yellow-50">
                        <CardContent className="p-3 text-center">
                          <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
                          <div className="text-lg font-medium text-yellow-900">
                            {pkg.reviewers.filter(r => r.status === 'pending').length}
                          </div>
                          <div className="text-xs text-yellow-700">Pending Reviews</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-purple-200 bg-purple-50">
                        <CardContent className="p-3 text-center">
                          <History className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                          <div className="text-lg font-medium text-purple-900">{pkg.auditTrail.length}</div>
                          <div className="text-xs text-purple-700">Audit Entries</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Document Status */}
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Package Contents</h4>
                      <div className="space-y-2">
                        {pkg.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-4 w-4 text-slate-600" />
                              <div>
                                <p className="font-medium text-slate-900">{doc.name}</p>
                                <p className="text-sm text-slate-600">{doc.category} • Version {doc.version}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-slate-600">Modified: {doc.lastModified}</span>
                              <Badge className={
                                doc.status === 'included' ? 'bg-green-100 text-green-800' :
                                doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }>
                                {doc.status.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                      <div className="text-sm text-slate-600">
                        Last Modified: {pkg.lastModified} • Context: {pkg.regulatoryContext}
                      </div>
                      <div className="flex space-x-2">
                        {onItemSelect && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onItemSelect(pkg.id)}
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            Track Progress
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedPackage(pkg)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Export Package
                        </Button>
                        {pkg.status === 'approved' && (
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            Submit
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Compliance Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive compliance verification across all regulatory packages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4 text-center">
                      <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-900">94%</div>
                      <div className="text-sm text-green-700">Overall Compliance Rate</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4 text-center">
                      <FileCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-900">18</div>
                      <div className="text-sm text-blue-700">Compliant Requirements</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-900">2</div>
                      <div className="text-sm text-yellow-700">Items Requiring Attention</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {packages.map((pkg) => (
                    <Card key={pkg.id}>
                      <CardHeader>
                        <CardTitle className="text-base">{pkg.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Category</TableHead>
                              <TableHead>Requirement</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Evidence</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pkg.complianceChecks.map((check, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{check.category}</TableCell>
                                <TableCell>{check.requirement}</TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    {getComplianceIcon(check.status)}
                                    <Badge className={
                                      check.status === 'compliant' ? 'bg-green-100 text-green-800' :
                                      check.status === 'non_compliant' ? 'bg-red-100 text-red-800' :
                                      'bg-yellow-100 text-yellow-800'
                                    }>
                                      {check.status.replace('_', ' ').toUpperCase()}
                                    </Badge>
                                  </div>
                                </TableCell>
                                <TableCell className="text-sm text-slate-600">{check.evidence}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Complete Audit Trail</CardTitle>
              <CardDescription>
                Full traceability of all actions and changes across regulatory packages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {packages.map((pkg) => (
                  <Card key={pkg.id}>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">
                        <History className="h-4 w-4 mr-2" />
                        {pkg.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pkg.auditTrail.map((entry, index) => (
                          <div key={index} className="flex items-start space-x-4 p-3 bg-slate-50 rounded-lg">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <Lock className="h-4 w-4 text-blue-600" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-slate-900">{entry.action}</h4>
                                <span className="text-sm text-slate-500">{entry.timestamp}</span>
                              </div>
                              <p className="text-sm text-slate-600 mt-1">{entry.details}</p>
                              <p className="text-xs text-slate-500 mt-1">User: {entry.user}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review">
          <div className="space-y-6">
            {packages.map((pkg) => {
              const pendingReviews = pkg.reviewers.filter(r => r.status === 'pending');
              if (pendingReviews.length === 0) return null;
              
              return (
                <Card key={pkg.id}>
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription>Human-in-the-Loop review process for regulatory package validation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Review Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Review Progress</span>
                          <span className="text-sm text-slate-600">
                            {pkg.reviewers.filter(r => r.status === 'approved').length} of {pkg.reviewers.length} approved
                          </span>
                        </div>
                        <Progress 
                          value={(pkg.reviewers.filter(r => r.status === 'approved').length / pkg.reviewers.length) * 100} 
                          className="h-2" 
                        />
                      </div>

                      {/* Reviewer Status */}
                      <div className="space-y-3">
                        {pkg.reviewers.map((reviewer, index) => (
                          <Card key={index} className={`border ${
                            reviewer.status === 'approved' ? 'border-green-200 bg-green-50' :
                            reviewer.status === 'rejected' ? 'border-red-200 bg-red-50' :
                            'border-yellow-200 bg-yellow-50'
                          }`}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <Users className="h-5 w-5 text-slate-600" />
                                  <div>
                                    <p className="font-medium text-slate-900">{reviewer.name}</p>
                                    <p className="text-sm text-slate-600">{reviewer.role}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {reviewer.reviewDate && (
                                    <span className="text-sm text-slate-600">{reviewer.reviewDate}</span>
                                  )}
                                  <Badge className={
                                    reviewer.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    reviewer.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }>
                                    {reviewer.status.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                              {reviewer.comments && (
                                <div className="mt-3 p-2 bg-white rounded border">
                                  <p className="text-sm text-slate-700">{reviewer.comments}</p>
                                </div>
                              )}
                              
                              {reviewer.status === 'pending' && (
                                <div className="mt-4 space-y-3">
                                  <Textarea
                                    placeholder="Add review comments..."
                                    className="min-h-[80px]"
                                  />
                                  <div className="flex space-x-2">
                                    <Button variant="destructive" size="sm">
                                      Request Changes
                                    </Button>
                                    <Button size="sm">
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Approve
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {packages.every(pkg => pkg.reviewers.every(r => r.status !== 'pending')) && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">All Reviews Complete</h3>
                  <p className="text-slate-600">All regulatory packages have completed the review process.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}