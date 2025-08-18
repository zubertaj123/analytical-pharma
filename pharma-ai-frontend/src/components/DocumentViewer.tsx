import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ModularReviewViewer } from './ModularReviewViewer';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  Calendar, 
  User, 
  Building,
  CheckCircle,
  AlertTriangle,
  Edit3,
  Eye
} from 'lucide-react';

interface DocumentViewerProps {
  document: any;
  type: 'protocol' | 'report';
  onClose: () => void;
}

export function DocumentViewer({ document, type, onClose }: DocumentViewerProps) {
  const [reviewMode, setReviewMode] = useState(false);

  if (!document) return null;

  // If in review mode, show the modular review viewer
  if (reviewMode) {
    return <ModularReviewViewer document={document} type={type} onClose={onClose} />;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderProtocolDocument = () => (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Document Header */}
      <div className="border-b-2 border-slate-900 pb-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Building className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-slate-700">Tyra Biosciences</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Method Validation Protocol
            </h1>
            <div className="text-lg font-semibold text-slate-800">
              {document.title}
            </div>
          </div>
          <div className="text-right">
            <div className="mb-2">
              <span className="text-sm font-medium text-slate-600">Protocol ID:</span>
              <div className="font-mono text-lg">{document.id}</div>
            </div>
            <div className="mb-2">
              <span className="text-sm font-medium text-slate-600">Version:</span>
              <div className="font-mono">1.0</div>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              {document.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <span className="font-medium text-slate-600">Generated Date:</span>
            <div>{formatDate(document.generatedDate)}</div>
          </div>
          <div>
            <span className="font-medium text-slate-600">Last Modified:</span>
            <div>{formatDate(document.lastModified)}</div>
          </div>
          <div>
            <span className="font-medium text-slate-600">AI Confidence:</span>
            <div className="flex items-center space-x-2">
              <span>{document.aiConfidence}%</span>
              <div className="w-16 h-2 bg-slate-200 rounded-full">
                <div 
                  className="h-2 bg-blue-600 rounded-full" 
                  style={{ width: `${document.aiConfidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
          Table of Contents
        </h2>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>1. Objective</span>
            <span>Page 2</span>
          </div>
          <div className="flex justify-between">
            <span>2. Scope</span>
            <span>Page 2</span>
          </div>
          <div className="flex justify-between">
            <span>3. Methodology</span>
            <span>Page 3</span>
          </div>
          <div className="flex justify-between">
            <span>4. Equipment and Reagents</span>
            <span>Page 4</span>
          </div>
          <div className="flex justify-between">
            <span>5. Experimental Procedure</span>
            <span>Page 5</span>
          </div>
          <div className="flex justify-between">
            <span>6. Acceptance Criteria</span>
            <span>Page 6</span>
          </div>
        </div>
      </div>

      {/* Document Sections */}
      <div className="space-y-8">
        {/* 1. Objective */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            1. Objective
          </h2>
          <p className="text-slate-700 leading-relaxed">
            {document.sections.objective}
          </p>
        </section>

        {/* 2. Scope */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            2. Scope
          </h2>
          <p className="text-slate-700 leading-relaxed">
            {document.sections.scope}
          </p>
        </section>

        {/* 3. Methodology */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            3. Methodology
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            {document.sections.methodology}
          </p>
          
          <h3 className="font-semibold text-slate-800 mb-2">3.1 Analytical Parameters</h3>
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Method Type:</span> Quantitative Assay
              </div>
              <div>
                <span className="font-medium">Detection:</span> UV Spectroscopy
              </div>
              <div>
                <span className="font-medium">Column:</span> C18 (250 x 4.6mm, 5μm)
              </div>
              <div>
                <span className="font-medium">Flow Rate:</span> 1.0 mL/min
              </div>
            </div>
          </div>
        </section>

        {/* 4. Equipment and Reagents */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            4. Equipment and Reagents
          </h2>
          
          <h3 className="font-semibold text-slate-800 mb-3">4.1 Equipment</h3>
          <ul className="list-disc list-inside space-y-1 mb-6 text-slate-700">
            {document.sections.equipment.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-slate-800 mb-3">4.2 Reagents and Standards</h3>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            {document.sections.reagents.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* 5. Experimental Procedure */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            5. Experimental Procedure
          </h2>
          <div className="space-y-4">
            {document.sections.procedure.map((step: string, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium text-sm">
                  {index + 1}
                </div>
                <p className="text-slate-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Acceptance Criteria */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            6. Acceptance Criteria
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-slate-700">{document.sections.acceptanceCriteria}</p>
          </div>
        </section>

        {/* Compliance Information */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            7. Regulatory Compliance
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">Compliance Score: {document.complianceScore}%</span>
            </div>
            <p className="text-green-700 text-sm">
              This protocol meets ICH Q2(R1) analytical validation guidelines and FDA requirements 
              for method validation in pharmaceutical analysis.
            </p>
          </div>
        </section>

        {/* Review Comments */}
        {document.reviewComments && document.reviewComments.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
              8. Review Comments
            </h2>
            <div className="space-y-3">
              {document.reviewComments.map((comment: string, index: number) => (
                <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-3">
                  <p className="text-slate-700">{comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Document Footer */}
      <div className="mt-12 pt-6 border-t border-slate-300">
        <div className="text-xs text-slate-500 text-center">
          <p>This document was generated by the Analytical Method Validation Platform</p>
          <p>Tyra Biosciences • Confidential and Proprietary</p>
          <p>Generated on {formatDate(document.generatedDate)} • Page 1 of 8</p>
        </div>
      </div>
    </div>
  );

  const renderReportDocument = () => (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Document Header */}
      <div className="border-b-2 border-slate-900 pb-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Building className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-slate-700">Tyra Biosciences</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Method Validation Report
            </h1>
            <div className="text-lg font-semibold text-slate-800">
              {document.protocolName}
            </div>
          </div>
          <div className="text-right">
            <div className="mb-2">
              <span className="text-sm font-medium text-slate-600">Report ID:</span>
              <div className="font-mono text-lg">{document.id}</div>
            </div>
            <div className="mb-2">
              <span className="text-sm font-medium text-slate-600">Version:</span>
              <div className="font-mono">1.0</div>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              {document.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <span className="font-medium text-slate-600">Generated Date:</span>
            <div>{formatDate(document.generatedDate)}</div>
          </div>
          <div>
            <span className="font-medium text-slate-600">Last Modified:</span>
            <div>{formatDate(document.lastModified)}</div>
          </div>
          <div>
            <span className="font-medium text-slate-600">AI Confidence:</span>
            <div className="flex items-center space-x-2">
              <span>{document.aiConfidence}%</span>
              <div className="w-16 h-2 bg-slate-200 rounded-full">
                <div 
                  className="h-2 bg-blue-600 rounded-full" 
                  style={{ width: `${document.aiConfidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
          Executive Summary
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-slate-700 leading-relaxed">{document.sections.summary}</p>
        </div>
      </section>

      {/* Document Sections */}
      <div className="space-y-8">
        {/* 1. Objectives */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            1. Objectives
          </h2>
          <p className="text-slate-700 leading-relaxed">
            {document.sections.objectives}
          </p>
        </section>

        {/* 2. Methodology */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            2. Methodology
          </h2>
          <p className="text-slate-700 leading-relaxed">
            {document.sections.methodology}
          </p>
        </section>

        {/* 3. Results */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            3. Results
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            {document.sections.results}
          </p>

          {/* Data Tables */}
          {document.tables && document.tables.length > 0 && (
            <div className="space-y-6">
              {document.tables.map((table: any, index: number) => (
                <div key={index}>
                  <h3 className="font-semibold text-slate-800 mb-3">
                    Table {index + 1}: {table.title}
                  </h3>
                  <div className="overflow-x-auto">
                    <Table className="border border-slate-300">
                      <TableHeader>
                        <TableRow className="bg-slate-100">
                          {Object.keys(table.data[0] || {}).map((key) => (
                            <TableHead key={key} className="border border-slate-300 font-semibold text-slate-800">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {table.data.map((row: any, rowIndex: number) => (
                          <TableRow key={rowIndex}>
                            {Object.values(row).map((value: any, cellIndex: number) => (
                              <TableCell key={cellIndex} className="border border-slate-300">
                                {value === 'Pass' ? (
                                  <Badge className="bg-green-100 text-green-800">Pass</Badge>
                                ) : value === 'Fail' ? (
                                  <Badge className="bg-red-100 text-red-800">Fail</Badge>
                                ) : (
                                  String(value)
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. Statistical Analysis */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            4. Statistical Analysis
          </h2>
          <p className="text-slate-700 leading-relaxed">
            {document.sections.statisticalAnalysis}
          </p>
        </section>

        {/* 5. Conclusions */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            5. Conclusions
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-slate-700 leading-relaxed">{document.sections.conclusions}</p>
          </div>
        </section>

        {/* 6. Recommendations */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            6. Recommendations
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-slate-700 leading-relaxed">{document.sections.recommendations}</p>
          </div>
        </section>

        {/* Deviations */}
        {document.deviations && document.deviations.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
              7. Deviations and Resolutions
            </h2>
            <div className="space-y-4">
              {document.deviations.map((deviation: any, index: number) => (
                <div key={index} className="border border-yellow-300 rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-yellow-900 mb-2">
                        Deviation {index + 1}: {deviation.description}
                      </h4>
                      <p className="text-yellow-800 text-sm mb-2">
                        <strong>Impact:</strong> {deviation.impact.toUpperCase()}
                      </p>
                      <p className="text-yellow-800 text-sm">
                        <strong>Resolution:</strong> {deviation.resolution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Compliance Information */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">
            8. Regulatory Compliance
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">Compliance Score: {document.complianceScore}%</span>
            </div>
            <p className="text-green-700 text-sm">
              This validation report demonstrates compliance with ICH Q2(R1) guidelines and meets 
              FDA requirements for analytical method validation in pharmaceutical development.
            </p>
          </div>
        </section>
      </div>

      {/* Document Footer */}
      <div className="mt-12 pt-6 border-t border-slate-300">
        <div className="text-xs text-slate-500 text-center">
          <p>This report was generated by the Analytical Method Validation Platform</p>
          <p>Tyra Biosciences • Confidential and Proprietary</p>
          <p>Generated on {formatDate(document.generatedDate)} • Page 1 of 12</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {type === 'protocol' ? 'Protocol Review' : 'Report Review'}
              </h2>
              <p className="text-sm text-slate-600">
                Document ID: {document.id}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant={reviewMode ? "default" : "outline"} 
              size="sm"
              onClick={() => setReviewMode(!reviewMode)}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              {reviewMode ? 'Exit' : 'Start'} Modular Review
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="document-content" style={{ fontFamily: 'Times, serif' }}>
            {type === 'protocol' ? renderProtocolDocument() : renderReportDocument()}
          </div>
        </div>
      </div>
    </div>
  );
}