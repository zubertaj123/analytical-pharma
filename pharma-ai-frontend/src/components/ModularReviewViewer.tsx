import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  MessageSquare,
  Eye,
  Building,
  User,
  Calendar,
  History,
  Send,
  ThumbsUp,
  Edit3,
  ChevronRight,
  ChevronDown,
  FileCheck,
  Shield,
  Award
} from 'lucide-react';

interface DocumentSection {
  id: string;
  title: string;
  content: string;
  subsections?: DocumentSection[];
  reviewStatus: 'pending' | 'approved' | 'needs_modification';
  comments: Comment[];
  lastReviewed?: string;
  reviewedBy?: string;
}

interface Comment {
  id: string;
  author: string;
  timestamp: string;
  content: string;
  type: 'general' | 'modification_request' | 'approval';
  resolved: boolean;
}

interface AuditTrailEntry {
  id: string;
  timestamp: string;
  user: string;
  action: 'approve' | 'request_modification' | 'add_comment' | 'resolve_comment' | 'submit_for_finalization';
  sectionId?: string;
  sectionTitle?: string;
  details: string;
  commentId?: string;
}

interface DocumentReviewData {
  id: string;
  title: string;
  version: string;
  type: 'protocol' | 'report';
  status: 'draft' | 'under_review' | 'approved' | 'finalized';
  author: string;
  createdDate: string;
  lastModified: string;
  sections: DocumentSection[];
  overallProgress: number;
  auditTrail: AuditTrailEntry[];
}

interface ModularReviewViewerProps {
  document: any;
  type: 'protocol' | 'report';
  onClose: () => void;
}

export function ModularReviewViewer({ document, type, onClose }: ModularReviewViewerProps) {
  const [reviewData, setReviewData] = useState<DocumentReviewData | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('');
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['1', '2', '3', '4', '5', '6', '7', '8']));

  // Initialize review data from document
  useEffect(() => {
    if (document) {
      const sections: DocumentSection[] = [
        {
          id: '1',
          title: 'Objective',
          content: document.sections?.objective || document.sections?.objectives || 'Document objective content',
          reviewStatus: 'pending',
          comments: [],
        },
        {
          id: '2',
          title: 'Scope',
          content: document.sections?.scope || 'Document scope content',
          reviewStatus: 'pending',
          comments: [],
        },
        {
          id: '3',
          title: 'Methodology',
          content: document.sections?.methodology || 'Document methodology content',
          reviewStatus: 'pending',
          comments: [],
        },
        {
          id: '4',
          title: 'Equipment and Reagents',
          content: `Equipment: ${document.sections?.equipment?.join(', ') || 'Equipment list'}\n\nReagents: ${document.sections?.reagents?.join(', ') || 'Reagent list'}`,
          reviewStatus: 'pending',
          comments: [],
        },
        {
          id: '5',
          title: 'Experimental Procedure',
          content: document.sections?.procedure?.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n\n') || 'Procedure steps',
          reviewStatus: 'pending',
          comments: [],
        },
        {
          id: '6',
          title: 'Acceptance Criteria',
          content: document.sections?.acceptanceCriteria || 'Acceptance criteria content',
          reviewStatus: 'pending',
          comments: [],
        }
      ];

      // Add type-specific sections
      if (type === 'report') {
        sections.push(
          {
            id: '7',
            title: 'Results',
            content: document.sections?.results || 'Results content',
            reviewStatus: 'pending',
            comments: [],
          },
          {
            id: '8',
            title: 'Statistical Analysis',
            content: document.sections?.statisticalAnalysis || 'Statistical analysis content',
            reviewStatus: 'pending',
            comments: [],
          },
          {
            id: '9',
            title: 'Conclusions',
            content: document.sections?.conclusions || 'Conclusions content',
            reviewStatus: 'pending',
            comments: [],
          },
          {
            id: '10',
            title: 'Recommendations',
            content: document.sections?.recommendations || 'Recommendations content',
            reviewStatus: 'pending',
            comments: [],
          }
        );
      }

      setReviewData({
        id: document.id,
        title: document.title || document.protocolName,
        version: '1.0',
        type,
        status: 'under_review',
        author: type === 'protocol' ? 'Dr. Sarah Chen' : 'John Lutkenhaus',
        createdDate: document.generatedDate || document.createdDate || '2024-01-15',
        lastModified: document.lastModified || '2024-01-16',
        sections,
        overallProgress: 0,
        auditTrail: [
          {
            id: '1',
            timestamp: new Date().toISOString(),
            user: 'Dr. Sarah Chen',
            action: 'add_comment',
            details: 'Started modular review process'
          }
        ]
      });

      setSelectedSectionId('1');
    }
  }, [document, type]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'needs_modification': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'needs_modification': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const handleSectionAction = (sectionId: string, action: 'approve' | 'request_modification') => {
    if (!reviewData) return;

    setReviewData(prev => {
      if (!prev) return null;

      const updatedSections = prev.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            reviewStatus: action === 'approve' ? 'approved' as const : 'needs_modification' as const,
            lastReviewed: new Date().toISOString().split('T')[0],
            reviewedBy: 'Dr. Sarah Chen'
          };
        }
        return section;
      });

      const approvedCount = updatedSections.filter(s => s.reviewStatus === 'approved').length;
      const overallProgress = Math.round((approvedCount / updatedSections.length) * 100);

      const auditEntry: AuditTrailEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        user: 'Dr. Sarah Chen',
        action,
        sectionId,
        sectionTitle: updatedSections.find(s => s.id === sectionId)?.title,
        details: action === 'approve' ? 'Section approved' : 'Modifications requested'
      };

      return {
        ...prev,
        sections: updatedSections,
        overallProgress,
        auditTrail: [auditEntry, ...prev.auditTrail]
      };
    });
  };

  const handleAddComment = (sectionId: string, commentContent: string, commentType: 'general' | 'modification_request' = 'general') => {
    if (!reviewData || !commentContent.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: 'Dr. Sarah Chen',
      timestamp: new Date().toISOString(),
      content: commentContent,
      type: commentType,
      resolved: false
    };

    setReviewData(prev => {
      if (!prev) return null;

      const updatedSections = prev.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            comments: [...section.comments, newCommentObj]
          };
        }
        return section;
      });

      const auditEntry: AuditTrailEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        user: 'Dr. Sarah Chen',
        action: 'add_comment',
        sectionId,
        sectionTitle: updatedSections.find(s => s.id === sectionId)?.title,
        details: `Added comment: ${commentContent.substring(0, 50)}${commentContent.length > 50 ? '...' : ''}`,
        commentId: newCommentObj.id
      };

      return {
        ...prev,
        sections: updatedSections,
        auditTrail: [auditEntry, ...prev.auditTrail]
      };
    });

    setNewComment('');
  };

  const handleSubmitForFinalization = () => {
    if (!reviewData) return;

    const allApproved = reviewData.sections.every(section => section.reviewStatus === 'approved');
    
    if (!allApproved) {
      alert('All sections must be approved before submitting for finalization.');
      return;
    }

    setReviewData(prev => {
      if (!prev) return null;

      const auditEntry: AuditTrailEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        user: 'Dr. Sarah Chen',
        action: 'submit_for_finalization',
        details: 'Document submitted for finalization - all sections approved'
      };

      return {
        ...prev,
        status: 'finalized',
        auditTrail: [auditEntry, ...prev.auditTrail]
      };
    });
  };

  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSections(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(sectionId)) {
        newExpanded.delete(sectionId);
      } else {
        newExpanded.add(sectionId);
      }
      return newExpanded;
    });
  };

  const selectedSection = reviewData?.sections.find(s => s.id === selectedSectionId);
  const allSectionsReviewed = reviewData?.sections.every(s => s.reviewStatus !== 'pending') || false;
  const allSectionsApproved = reviewData?.sections.every(s => s.reviewStatus === 'approved') || false;

  if (!reviewData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-center">Loading document for review...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="bg-white flex w-full h-full">
        {/* Table of Contents Sidebar */}
        <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-slate-900">Table of Contents</h3>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-slate-600">
              Progress: {reviewData.overallProgress}% complete
            </div>
            <div className="mt-2">
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${reviewData.overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {reviewData.sections.map((section) => (
                <div key={section.id} className="space-y-1">
                  <button
                    onClick={() => setSelectedSectionId(section.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedSectionId === section.id 
                        ? 'bg-blue-100 border-2 border-blue-300' 
                        : 'bg-white border-2 border-transparent hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(section.reviewStatus)}
                      <div className="text-left">
                        <div className="font-medium text-sm text-slate-900">
                          {section.id}. {section.title}
                        </div>
                        {section.comments.length > 0 && (
                          <div className="flex items-center text-xs text-slate-500 mt-1">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {section.comments.length} comment{section.comments.length !== 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Badge className={`text-xs ${getStatusColor(section.reviewStatus)}`}>
                        {section.reviewStatus === 'pending' ? 'Pending' :
                         section.reviewStatus === 'approved' ? 'Approved' : 'Needs Review'}
                      </Badge>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* ToC Footer Actions */}
          <div className="p-4 border-t border-slate-200 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Sheet open={showAuditTrail} onOpenChange={setShowAuditTrail}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    <History className="h-3 w-3 mr-1" />
                    Audit Trail
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-96">
                  <SheetHeader>
                    <SheetTitle>Audit Trail</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="mt-6 h-[calc(100vh-100px)]">
                    <div className="space-y-4">
                      {reviewData.auditTrail.map((entry) => (
                        <div key={entry.id} className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="font-medium text-sm text-slate-900">
                              {entry.action.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(entry.timestamp).toLocaleString()}
                            </div>
                          </div>
                          <div className="text-sm text-slate-600 mb-1">
                            by {entry.user}
                          </div>
                          {entry.sectionTitle && (
                            <div className="text-xs text-slate-500 mb-1">
                              Section: {entry.sectionTitle}
                            </div>
                          )}
                          <div className="text-sm text-slate-700">
                            {entry.details}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              <Button variant="outline" size="sm" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            </div>

            {allSectionsReviewed && (
              <div className="space-y-2">
                <Button 
                  className="w-full text-xs"
                  variant={allSectionsApproved ? "default" : "outline"}
                  disabled={!allSectionsApproved}
                  onClick={handleSubmitForFinalization}
                >
                  {allSectionsApproved ? (
                    <>
                      <Send className="h-3 w-3 mr-1" />
                      Submit for Finalization
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Complete All Sections
                    </>
                  )}
                </Button>
                {reviewData.status === 'finalized' && (
                  <Badge className="w-full justify-center bg-green-100 text-green-800">
                    <Award className="h-3 w-3 mr-1" />
                    Finalized
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Document Header */}
          <div className="p-6 border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-slate-700">Tyra Biosciences</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                  {type === 'protocol' ? 'Method Validation Protocol' : 'Method Validation Report'}
                </h1>
                <div className="text-lg font-semibold text-slate-800">
                  {reviewData.title}
                </div>
              </div>
              <div className="text-right">
                <div className="mb-2">
                  <span className="text-sm font-medium text-slate-600">Document ID:</span>
                  <div className="font-mono text-lg">{reviewData.id}</div>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-slate-600">Version:</span>
                  <div className="font-mono">{reviewData.version}</div>
                </div>
                <Badge className={getStatusColor(reviewData.status)}>
                  {reviewData.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div>
                <span className="font-medium text-slate-600">Author:</span>
                <div className="flex items-center space-x-1 mt-1">
                  <User className="h-3 w-3 text-slate-400" />
                  <span>{reviewData.author}</span>
                </div>
              </div>
              <div>
                <span className="font-medium text-slate-600">Created:</span>
                <div className="flex items-center space-x-1 mt-1">
                  <Calendar className="h-3 w-3 text-slate-400" />
                  <span>{reviewData.createdDate}</span>
                </div>
              </div>
              <div>
                <span className="font-medium text-slate-600">Last Modified:</span>
                <div className="flex items-center space-x-1 mt-1">
                  <Calendar className="h-3 w-3 text-slate-400" />
                  <span>{reviewData.lastModified}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div className="flex-1 flex">
            {/* Document Preview */}
            <div className="flex-1 p-6 overflow-auto">
              {selectedSection && (
                <div className="max-w-4xl mx-auto">
                  {/* Section Header with Actions */}
                  <div className="sticky top-0 bg-white z-10 border-b border-slate-200 pb-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold text-slate-900">
                          {selectedSection.id}. {selectedSection.title}
                        </h2>
                        {getStatusIcon(selectedSection.reviewStatus)}
                        <Badge className={getStatusColor(selectedSection.reviewStatus)}>
                          {selectedSection.reviewStatus === 'pending' ? 'Pending Review' :
                           selectedSection.reviewStatus === 'approved' ? 'Approved' : 'Needs Modification'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowComments(!showComments)}
                          className={showComments ? 'bg-blue-50 border-blue-300' : ''}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Comments ({selectedSection.comments.length})
                        </Button>
                      </div>
                    </div>

                    {/* Review Actions */}
                    {selectedSection.reviewStatus === 'pending' && (
                      <div className="flex items-center space-x-2 mt-3">
                        <Button
                          size="sm"
                          onClick={() => handleSectionAction(selectedSection.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve Section
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSectionAction(selectedSection.id, 'request_modification')}
                          className="border-orange-300 text-orange-700 hover:bg-orange-50"
                        >
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Request Modification
                        </Button>
                      </div>
                    )}

                    {selectedSection.reviewStatus === 'approved' && selectedSection.lastReviewed && (
                      <div className="mt-3 p-2 bg-green-50 rounded-lg">
                        <div className="text-sm text-green-700">
                          ✅ Approved by {selectedSection.reviewedBy} on {selectedSection.lastReviewed}
                        </div>
                      </div>
                    )}

                    {selectedSection.reviewStatus === 'needs_modification' && selectedSection.lastReviewed && (
                      <div className="mt-3 p-2 bg-orange-50 rounded-lg">
                        <div className="text-sm text-orange-700">
                          ❌ Modifications requested by {selectedSection.reviewedBy} on {selectedSection.lastReviewed}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section Content */}
                  <div className="prose prose-slate max-w-none">
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                      <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                        {selectedSection.content}
                      </div>
                    </div>
                  </div>

                  {/* Add Comment Section */}
                  <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <MessageSquare className="h-4 w-4 text-slate-600" />
                      <span className="font-medium text-slate-700">Add Comment</span>
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Add your comment or feedback for this section..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddComment(selectedSection.id, newComment, 'modification_request')}
                          disabled={!newComment.trim()}
                        >
                          Add Modification Request
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAddComment(selectedSection.id, newComment, 'general')}
                          disabled={!newComment.trim()}
                        >
                          Add General Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Comments Panel */}
            {showComments && selectedSection && (
              <div className="w-80 border-l border-slate-200 bg-slate-50 flex flex-col">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900">
                    Comments: {selectedSection.title}
                  </h3>
                  <div className="text-sm text-slate-600">
                    {selectedSection.comments.length} comment{selectedSection.comments.length !== 1 ? 's' : ''}
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedSection.comments.length === 0 ? (
                      <div className="text-center text-slate-500 py-8">
                        <MessageSquare className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                        No comments yet
                      </div>
                    ) : (
                      selectedSection.comments.map((comment) => (
                        <div key={comment.id} className="bg-white p-3 rounded-lg border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-sm text-slate-900">
                              {comment.author}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-sm text-slate-700 mb-2">
                            {comment.content}
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge 
                              variant="outline" 
                              className={comment.type === 'modification_request' ? 'text-orange-600 border-orange-200' : 'text-blue-600 border-blue-200'}
                            >
                              {comment.type === 'modification_request' ? 'Modification' : 'General'}
                            </Badge>
                            {comment.resolved && (
                              <Badge className="bg-green-100 text-green-800">
                                Resolved
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}