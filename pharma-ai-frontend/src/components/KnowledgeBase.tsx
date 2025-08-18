import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Database, 
  Search, 
  FileText, 
  Brain, 
  Link, 
  TrendingUp,
  Filter,
  Download,
  Upload,
  Zap,
  Shield,
  Globe,
  BookOpen,
  Layers
} from 'lucide-react';

interface KnowledgeStats {
  totalDocuments: number;
  totalEmbeddings: number;
  queryVolume: number;
  accuracyRate: number;
  lastUpdate: string;
}

interface KnowledgeSource {
  id: string;
  name: string;
  type: 'protocols' | 'regulatory' | 'literature' | 'experience';
  description: string;
  documentCount: number;
  lastSynced: string;
  status: 'healthy' | 'syncing' | 'error';
  icon: React.ElementType;
}

const knowledgeSources: KnowledgeSource[] = [
  {
    id: 'protocol_kb',
    name: 'Protocol Knowledge Base',
    type: 'protocols',
    description: 'Historical protocols and validated templates',
    documentCount: 12547,
    lastSynced: '2024-01-15 14:45:22',
    status: 'healthy',
    icon: FileText
  },
  {
    id: 'regulatory_kb',
    name: 'Regulatory Knowledge Base', 
    type: 'regulatory',
    description: 'ICH/FDA/USP guidelines and compliance patterns',
    documentCount: 8934,
    lastSynced: '2024-01-15 14:30:15',
    status: 'healthy',
    icon: Shield
  },
  {
    id: 'literature_kb',
    name: 'Scientific Literature',
    type: 'literature', 
    description: 'Published research and methodologies',
    documentCount: 45672,
    lastSynced: '2024-01-15 13:20:10',
    status: 'syncing',
    icon: BookOpen
  },
  {
    id: 'experience_kb',
    name: 'Experience Synthesis',
    type: 'experience',
    description: 'HITL feedback and decision patterns',
    documentCount: 3421,
    lastSynced: '2024-01-15 14:50:33',
    status: 'healthy',
    icon: Brain
  }
];

const searchResults = [
  {
    id: 1,
    title: 'Dissolution Testing for Extended Release Tablets',
    source: 'Protocol Knowledge Base',
    relevance: 0.94,
    snippet: 'Multi-strength dissolution testing using paddle method with pH progression from 0.1N HCl to phosphate buffer...',
    metadata: { protocol: 'PROT-2023-445', product: 'Metformin XR', strength: '500mg/750mg/1000mg' }
  },
  {
    id: 2,
    title: 'ICH Q2(R1) Analytical Validation Guidelines',
    source: 'Regulatory Knowledge Base',
    relevance: 0.91,
    snippet: 'Validation parameters for dissolution methods including specificity, linearity, accuracy, precision...',
    metadata: { guideline: 'ICH Q2(R1)', section: '4.2.3', topic: 'dissolution' }
  },
  {
    id: 3,
    title: 'Comparative Dissolution Study Design',
    source: 'Scientific Literature',
    relevance: 0.87,
    snippet: 'Statistical approach for comparing dissolution profiles using f2 similarity factor and model-independent methods...',
    metadata: { journal: 'Int J Pharm', year: '2023', authors: 'Chen et al.' }
  }
];

const knowledgeGraph = {
  nodes: [
    { id: 'metformin', label: 'Metformin XR', type: 'product', connections: 12 },
    { id: 'dissolution', label: 'Dissolution Testing', type: 'method', connections: 28 },
    { id: 'paddle', label: 'Paddle Method', type: 'technique', connections: 15 },
    { id: 'ich_q2', label: 'ICH Q2(R1)', type: 'guideline', connections: 34 },
    { id: 'multi_strength', label: 'Multi-strength', type: 'approach', connections: 9 }
  ],
  relationships: [
    { from: 'metformin', to: 'dissolution', strength: 0.95 },
    { from: 'dissolution', to: 'paddle', strength: 0.87 },
    { from: 'dissolution', to: 'ich_q2', strength: 0.92 },
    { from: 'metformin', to: 'multi_strength', strength: 0.89 }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy': return 'bg-green-500';
    case 'syncing': return 'bg-orange-500 animate-pulse';
    case 'error': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'protocols': return 'bg-blue-100 text-blue-700';
    case 'regulatory': return 'bg-red-100 text-red-700';
    case 'literature': return 'bg-green-100 text-green-700';
    case 'experience': return 'bg-purple-100 text-purple-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const stats: KnowledgeStats = {
    totalDocuments: 70574,
    totalEmbeddings: 2847392,
    queryVolume: 1247,
    accuracyRate: 94.2,
    lastUpdate: '2024-01-15 14:50:33'
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="space-y-6">
      {/* Knowledge Base Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900">{stats.totalDocuments.toLocaleString()}</div>
            <p className="text-xs text-blue-600 mt-1">Across all sources</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700">Vector Embeddings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900">{(stats.totalEmbeddings / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-green-600 mt-1">3072-dimensional vectors</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700">Query Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900">{stats.queryVolume}</div>
            <p className="text-xs text-purple-600 mt-1">Queries per minute</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-700">Accuracy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-900">{stats.accuracyRate}%</div>
            <p className="text-xs text-orange-600 mt-1">Semantic search accuracy</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="search">Semantic Search</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="graph">Knowledge Graph</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Sources Status</CardTitle>
                <CardDescription>Real-time status of all knowledge bases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {knowledgeSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <source.icon className="h-6 w-6 text-slate-600" />
                          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(source.status)}`}></div>
                        </div>
                        <div>
                          <h4 className="text-sm">{source.name}</h4>
                          <p className="text-xs text-slate-600">{source.description}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm">{source.documentCount.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">documents</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Real-time performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Query Response Time</span>
                      <span className="text-sm">145ms</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Index Utilization</span>
                      <span className="text-sm">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Cache Hit Rate</span>
                      <span className="text-sm">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Storage Efficiency</span>
                      <span className="text-sm">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Semantic Search Interface</CardTitle>
              <CardDescription>Advanced RAG-powered search across all knowledge bases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Search Interface */}
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search for protocols, guidelines, or methodologies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <Button onClick={handleSearch} className="h-12 px-6">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                {/* Search Filters */}
                <div className="flex space-x-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                    <FileText className="h-3 w-3 mr-1" />
                    Protocols
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                    <Shield className="h-3 w-3 mr-1" />
                    Regulatory
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Literature
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                    <Brain className="h-3 w-3 mr-1" />
                    Experience
                  </Badge>
                </div>

                {/* Search Results */}
                <div className="space-y-4">
                  <h3 className="text-sm text-slate-600">Search Results (3 found)</h3>
                  {searchResults.map((result) => (
                    <div key={result.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm">{result.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {result.source}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {(result.relevance * 100).toFixed(0)}% match
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-slate-700 mb-3">{result.snippet}</p>
                      
                      <div className="flex space-x-4 text-xs text-slate-500">
                        {Object.entries(result.metadata).map(([key, value]) => (
                          <span key={key}>{key}: {value}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {knowledgeSources.map((source) => (
              <Card key={source.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <source.icon className="h-6 w-6 text-slate-600" />
                      <div>
                        <CardTitle className="text-lg">{source.name}</CardTitle>
                        <CardDescription>{source.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getTypeColor(source.type)}>
                      {source.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Documents:</span>
                        <div>{source.documentCount.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Last Sync:</span>
                        <div>{source.lastSynced.split(' ')[1]}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(source.status)}`}></div>
                        <span className="text-xs capitalize">{source.status}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="h-3 w-3 mr-1" />
                          Sync
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="graph">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Graph Visualization</CardTitle>
              <CardDescription>Semantic relationships between concepts, products, and methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Graph Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl text-slate-900">{knowledgeGraph.nodes.length}</div>
                    <div className="text-xs text-slate-600">Nodes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-slate-900">{knowledgeGraph.relationships.length}</div>
                    <div className="text-xs text-slate-600">Relationships</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-slate-900">89</div>
                    <div className="text-xs text-slate-600">Concepts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-slate-900">3.4K</div>
                    <div className="text-xs text-slate-600">Connections</div>
                  </div>
                </div>

                {/* Simplified Graph Visualization */}
                <div className="bg-slate-50 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
                  <div className="relative w-full max-w-md">
                    {/* Central Node */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                        Dissolution Testing
                      </div>
                    </div>

                    {/* Connected Nodes */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ICH Q2
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                        Metformin
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                        Paddle
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                        Multi-Strength
                      </div>
                    </div>

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line x1="50%" y1="50%" x2="50%" y2="20%" stroke="#cbd5e1" strokeWidth="2" />
                      <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="#cbd5e1" strokeWidth="2" />
                      <line x1="50%" y1="50%" x2="20%" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
                      <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* Graph Metrics */}
                <div className="space-y-3">
                  <h4 className="text-sm text-slate-600">Key Concept Relationships</h4>
                  {knowledgeGraph.relationships.map((rel, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Link className="h-4 w-4 text-slate-400" />
                        <span className="text-sm capitalize">
                          {knowledgeGraph.nodes.find(n => n.id === rel.from)?.label} → {knowledgeGraph.nodes.find(n => n.id === rel.to)?.label}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={rel.strength * 100} className="w-16 h-2" />
                        <span className="text-xs text-slate-500">{(rel.strength * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Daily Queries</span>
                    <span className="text-sm">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Peak Query Time</span>
                    <span className="text-sm">14:30 - 16:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Most Searched</span>
                    <span className="text-sm">Dissolution methods</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Knowledge Growth</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-sm text-green-600">+127 docs today</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Freshness</span>
                    <span className="text-sm text-green-600">94% current</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Embedding Quality</span>
                    <span className="text-sm text-green-600">High (0.92)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Duplicate Rate</span>
                    <span className="text-sm">2.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Coverage Score</span>
                    <span className="text-sm text-green-600">89%</span>
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