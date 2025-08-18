import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  BarChart3,
  FileText,
  Download,
  RefreshCw,
  TrendingUp,
  Database
} from 'lucide-react';

interface LabResult {
  id: string;
  protocolId: string;
  protocolName: string;
  uploadDate: string;
  analysisDate: string;
  analyst: string;
  sampleBatch: string;
  status: 'processing' | 'passed' | 'failed' | 'under_review';
  dataFiles: {
    name: string;
    type: string;
    size: string;
    status: 'validated' | 'pending' | 'error';
  }[];
  measurements: {
    analyte: string;
    result: number;
    unit: string;
    specification: string;
    status: 'pass' | 'fail' | 'warning';
  }[];
  statisticalSummary: {
    mean: number;
    stdDev: number;
    rsd: number;
    n: number;
  };
  complianceChecks: {
    systemSuitability: boolean;
    calibrationCurve: boolean;
    blankAcceptable: boolean;
    controlSample: boolean;
  };
}

interface LabResultsProps {
  onItemSelect?: (itemId: string) => void;
}

export function LabResults({ onItemSelect }: LabResultsProps) {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedProtocol, setSelectedProtocol] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [labResults, setLabResults] = useState<LabResult[]>([
    {
      id: 'LR-2024-001',
      protocolId: 'PROT-2024-002',
      protocolName: 'Dissolution Method Validation for TYRA-300 Sprinkle Capsules',
      uploadDate: '2024-01-16',
      analysisDate: '2024-01-15',
      analyst: 'Dr. Sarah Chen',
      sampleBatch: 'TYRA-300-1mg-240115',
      status: 'passed',
      dataFiles: [
        { name: 'tyra300_dissolution_profile_1mg.xlsx', type: 'Excel', size: '3.2 MB', status: 'validated' },
        { name: 'hplc_chromatograms_tyra300.zip', type: 'Chromatogram', size: '18.5 MB', status: 'validated' },
        { name: 'system_suitability_report.pdf', type: 'PDF Report', size: '1.2 MB', status: 'validated' },
        { name: 'filter_study_data.xlsx', type: 'Excel', size: '856 KB', status: 'validated' }
      ],
      measurements: [
        { analyte: 'TYRA-300 (15 min)', result: 18.2, unit: '% dissolved', specification: 'Profile target', status: 'pass' },
        { analyte: 'TYRA-300 (30 min)', result: 35.8, unit: '% dissolved', specification: 'Profile target', status: 'pass' },
        { analyte: 'TYRA-300 (45 min)', result: 52.4, unit: '% dissolved', specification: 'Profile target', status: 'pass' },
        { analyte: 'TYRA-300 (60 min)', result: 71.2, unit: '% dissolved', specification: 'Profile target', status: 'pass' },
        { analyte: 'TYRA-300 (75 min)', result: 87.6, unit: '% dissolved', specification: '≥ 85%', status: 'pass' }
      ],
      statisticalSummary: {
        mean: 87.6,
        stdDev: 2.1,
        rsd: 2.4,
        n: 6
      },
      complianceChecks: {
        systemSuitability: true,
        calibrationCurve: true,
        blankAcceptable: true,
        controlSample: true
      }
    },
    {
      id: 'LR-2024-002',
      protocolId: 'PROT-2024-002',
      protocolName: 'Dissolution Method Validation for TYRA-300 Sprinkle Capsules',
      uploadDate: '2024-01-14',
      analysisDate: '2024-01-13',
      analyst: 'Dr. Michael Rodriguez',
      sampleBatch: 'TYRA-300-10mg-240113',
      status: 'passed',
      dataFiles: [
        { name: 'tyra300_dissolution_profile_10mg.xlsx', type: 'Excel', size: '3.1 MB', status: 'validated' },
        { name: 'hplc_chromatograms_10mg.zip', type: 'Chromatogram', size: '17.2 MB', status: 'validated' },
        { name: 'linearity_study_results.xlsx', type: 'Excel', size: '1.4 MB', status: 'validated' }
      ],
      measurements: [
        { analyte: 'TYRA-300 (15 min)', result: 16.8, unit: '% dissolved', specification: 'Profile target', status: 'pass' },
        { analyte: 'TYRA-300 (30 min)', result: 33.2, unit: '% dissolved', specification: 'Profile target', status: 'pass' },
        { analyte: 'TYRA-300 (45 min)', result: 49.7, unit: '% dissolved', specification: 'Profile target', status: 'pass' },
        { analyte: 'TYRA-300 (60 min)', result: 68.9, unit: '% dissolved', specification: 'Profile target', status: 'pass' },
        { analyte: 'TYRA-300 (75 min)', result: 89.1, unit: '% dissolved', specification: '≥ 85%', status: 'pass' }
      ],
      statisticalSummary: {
        mean: 89.1,
        stdDev: 1.8,
        rsd: 2.0,
        n: 6
      },
      complianceChecks: {
        systemSuitability: true,
        calibrationCurve: true,
        blankAcceptable: true,
        controlSample: true
      }
    },
    {
      id: 'LR-2024-003',
      protocolId: 'PROT-2024-002',
      protocolName: 'Dissolution Method Validation for TYRA-300 Sprinkle Capsules',
      uploadDate: '2024-01-12',
      analysisDate: '2024-01-11',
      analyst: 'Dr. Lisa Zhang',
      sampleBatch: 'TYRA-300-5mg-240111',
      status: 'under_review',
      dataFiles: [
        { name: 'tyra300_accuracy_study_5mg.xlsx', type: 'Excel', size: '2.8 MB', status: 'validated' },
        { name: 'precision_study_data.xlsx', type: 'Excel', size: '1.9 MB', status: 'pending' }
      ],
      measurements: [
        { analyte: 'Accuracy Level 1 (4.5%)', result: 102.3, unit: '% recovery', specification: '90-110%', status: 'pass' },
        { analyte: 'Accuracy Level 2 (9%)', result: 98.7, unit: '% recovery', specification: '90-110%', status: 'pass' },
        { analyte: 'Accuracy Level 3 (45%)', result: 101.1, unit: '% recovery', specification: '90-110%', status: 'pass' },
        { analyte: 'Accuracy Level 4 (135%)', result: 99.8, unit: '% recovery', specification: '90-110%', status: 'pass' }
      ],
      statisticalSummary: {
        mean: 100.5,
        stdDev: 1.6,
        rsd: 1.6,
        n: 12
      },
      complianceChecks: {
        systemSuitability: true,
        calibrationCurve: true,
        blankAcceptable: true,
        controlSample: false
      }
    }
  ]);

  const approvedProtocols = [
    { id: 'PROT-2024-002', name: 'Dissolution Method Validation for TYRA-300 Sprinkle Capsules' },
    { id: 'PROT-2024-001', name: 'HPLC Assay Method for Metformin Hydrochloride Tablets' },
    { id: 'PROT-2024-003', name: 'Dissolution Method for Extended Release Tablets' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate file upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsUploading(false);
            setActiveTab('results');
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
  };

  const getResultStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-50 border-green-200';
      case 'fail': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'under_review': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'processing': return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Lab Results Upload & Validation</h2>
          <p className="text-slate-600 mt-1">Upload experimental data and validate against acceptance criteria</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-green-600 border-green-200">
            {labResults.filter(r => r.status === 'passed').length} Results Validated
          </Badge>
          <Badge variant="outline" className="text-yellow-600 border-yellow-200">
            {labResults.filter(r => r.status === 'under_review').length} Under Review
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
          <TabsTrigger value="upload" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Data Upload</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Results & Validation</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Statistical Analysis</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Laboratory Data</CardTitle>
              <CardDescription>
                Upload experimental data files and link to approved analytical protocols
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="protocol">Associated Protocol</Label>
                  <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select approved protocol" />
                    </SelectTrigger>
                    <SelectContent>
                      {approvedProtocols.map((protocol) => (
                        <SelectItem key={protocol.id} value={protocol.id}>
                          {protocol.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sampleBatch">Sample Batch ID</Label>
                  <Input
                    id="sampleBatch"
                    placeholder="e.g., MET-500-240116"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="analyst">Analyst</Label>
                <Input
                  id="analyst"
                  placeholder="Enter analyst name"
                  defaultValue="Dr. Sarah Chen"
                />
              </div>

              <div className="space-y-4">
                <Label>Data Files</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Upload Laboratory Data</h3>
                  <p className="text-slate-600 mb-4">
                    Drag and drop files or click to browse. Supports Excel, CSV, PDF, and chromatogram files.
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".xlsx,.xls,.csv,.pdf,.zip"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Select Files
                    </Button>
                  </label>
                </div>

                {isUploading && (
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-900">Uploading and Validating Data...</h4>
                          <p className="text-sm text-blue-700">Processing files and checking against protocol specifications</p>
                        </div>
                        <div className="text-sm text-blue-900 font-medium">{uploadProgress}%</div>
                      </div>
                      <Progress value={uploadProgress} className="mt-2" />
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-900 mb-2">Supported File Types</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <FileSpreadsheet className="h-4 w-4 text-green-600" />
                    <span>Excel (.xlsx, .xls)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span>CSV (.csv)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-red-600" />
                    <span>PDF Reports (.pdf)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-purple-600" />
                    <span>Chromatograms (.zip)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <div className="space-y-6">
            {labResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{result.protocolName}</CardTitle>
                      <CardDescription>
                        Result ID: {result.id} • Batch: {result.sampleBatch} • Analyst: {result.analyst}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(result.status)}
                      <Badge className={
                        result.status === 'passed' ? 'bg-green-100 text-green-800 border-green-200' :
                        result.status === 'failed' ? 'bg-red-100 text-red-800 border-red-200' :
                        result.status === 'under_review' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-blue-100 text-blue-800 border-blue-200'
                      }>
                        {result.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Data Files */}
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Uploaded Data Files</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {result.dataFiles.map((file, index) => (
                          <Card key={index} className="border-slate-200">
                            <CardContent className="p-3">
                              <div className="flex items-center space-x-2">
                                <FileSpreadsheet className="h-4 w-4 text-blue-600" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                                  <p className="text-xs text-slate-600">{file.type} • {file.size}</p>
                                </div>
                                <Badge className={
                                  file.status === 'validated' ? 'bg-green-100 text-green-700' :
                                  file.status === 'error' ? 'bg-red-100 text-red-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }>
                                  {file.status}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Measurement Results */}
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Analysis Results</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Analyte</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Specification</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {result.measurements.map((measurement, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{measurement.analyte}</TableCell>
                              <TableCell>
                                {measurement.result} {measurement.unit}
                              </TableCell>
                              <TableCell>{measurement.specification}</TableCell>
                              <TableCell>
                                <Badge className={getResultStatusColor(measurement.status)}>
                                  {measurement.status.toUpperCase()}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Compliance Checks */}
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Compliance Verification</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(result.complianceChecks).map(([check, status]) => (
                          <Card key={check} className={`border ${status ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                            <CardContent className="p-3 text-center">
                              {status ? (
                                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                              ) : (
                                <XCircle className="h-6 w-6 text-red-600 mx-auto mb-1" />
                              )}
                              <p className="text-xs font-medium text-slate-900">
                                {check.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                      <div className="text-sm text-slate-600">
                        Upload Date: {result.uploadDate} • Analysis Date: {result.analysisDate}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          View Analysis
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistical Summary</CardTitle>
                <CardDescription>Key statistical parameters for current results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labResults.filter(r => r.status === 'passed').map((result) => (
                    <div key={result.id} className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium text-slate-900 mb-3">{result.sampleBatch}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-600">Mean</p>
                          <p className="font-medium">{result.statisticalSummary.mean}% LC</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Std Dev</p>
                          <p className="font-medium">{result.statisticalSummary.stdDev}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">RSD</p>
                          <p className="font-medium">{result.statisticalSummary.rsd}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">n</p>
                          <p className="font-medium">{result.statisticalSummary.n}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
                <CardDescription>Performance trends across recent batches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-medium text-green-900">Assay Results Trending</p>
                      <p className="text-sm text-green-700">Within specification limits</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Pass Rate</span>
                      <span className="font-medium">95.2%</span>
                    </div>
                    <Progress value={95.2} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Process Capability (Cpk)</span>
                      <span className="font-medium">1.42</span>
                    </div>
                    <Progress value={71} className="h-2" />
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