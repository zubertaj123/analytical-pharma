#!/usr/bin/env python3
"""
Enterprise Visio generator using the official python-vsdx API (VisioFile + Jinja).
Docs (classes/methods this script relies on):
- VisioFile.add_page, VisioFile.get_page_by_name, VisioFile.save_vsdx, VisioFile.jinja_render_vsdx
- Page access via vis.pages[*]
- Page.find_shape_by_text / find_shape_by_property_label / find_shapes_by_text
- Shape fields: .text, .x, .y (position), etc.
Ref: https://vsdx.readthedocs.io/en/latest/classes.html
"""

import re
import math
import json
from dataclasses import dataclass, field
from typing import Dict, List, Tuple, Optional

from vsdx import VisioFile  # pip install vsdx

# -----------------------------------------------------------------------------
# CONFIG: paths
# -----------------------------------------------------------------------------
TEMPLATE_VSDX = "/Users/zubertaj/play-ai/analytical-pharma/baseline-azure-ai-foundry-landing-zone.vsdx"   # your Visio template with Jinja placeholders
OUTPUT_VSDX   = "ai_protocol_architecture.vsdx"

# If you keep Mermaid in a file, set path here; otherwise paste string into MERMAID_SRC.
MERMAID_FILE = None
MERMAID_SRC  = """
flowchart TD
    subgraph "USER INTERFACE LAYER"
        UI[Web Application Interface<br/>React + Azure App Service]
        PI[Protocol Input Interface<br/>Product Specs + Requirements]
        HITLInt[HITL Review Interface<br/>Edit & Approval System]
        EI[Excel Input Parser<br/>Flexible Data Ingestion]
    end

    subgraph "API GATEWAY & ORCHESTRATION"
        API[Azure API Management<br/>Authentication & Rate Limiting]
        MO[Master Orchestrator<br/>15-Step Protocol Workflow]
        TP[Task Planner<br/>Dynamic Agent Sequencing]
        AM[Agent Manager<br/>Load Balancing & Coordination]
    end

    subgraph "PROTOCOL-SPECIFIC AGENT LAYER"
        subgraph "Core Decision Agents"
            PSA[Product Specification Agent<br/>🎯 PRIMARY DRIVER<br/>GPT-4o + CoT]
            PAA[Phase Classification Agent<br/>Early vs Late Criteria<br/>GPT-4o + Decision Trees]
            PSelA[Path Selection Agent<br/>Novel/Existing/Literature<br/>GPT-4o + Similarity Matching]
        end
        
        subgraph "Intelligence & Experience Agents"
            EIA[Experience Intelligence Agent<br/>Pattern Learning + Best Practices<br/>GPT-4o + Historical Analysis]
            RCE[Range Calculation Engine<br/>Multi-Strength Optimization<br/>Mathematical Models + GPT-4o]
            LRA[Literature Research Agent<br/>Scientific Publication Search<br/>GPT-4o + Web Search APIs]
        end
        
        subgraph "Generation & Validation Agents"
            PGA[Protocol Generation Agent<br/>Document Creation + Templates<br/>GPT-4o + Chain-of-Thought]
            CVA[Compliance Validation Agent<br/>ICH/FDA/USP Verification<br/>GPT-4o + Regulatory DB]
            EQA[Equipment Constraint Agent<br/>Practical Feasibility<br/>GPT-4o + Inventory DB]
        end
    end

    subgraph "ADVANCED RAG + KNOWLEDGE MANAGEMENT"
        subgraph "Vector Knowledge Store"
            VS[Azure AI Search<br/>3072-dimensional Embeddings<br/>Hybrid Search Engine]
            PKB[Protocol Knowledge Base<br/>Historical Protocols + Templates<br/>Semantic Indexing]
            RKB[Regulatory Knowledge Base<br/>ICH/FDA/USP Guidelines<br/>Compliance Patterns]
        end
        
        subgraph "Structured Knowledge"
            KB[Cosmos DB Knowledge Graph<br/>Multi-Modal Relationships<br/>Product-Method-Protocol Links]
            PSK[Product Specification KB<br/>Potency + Impurity Requirements<br/>Multi-Strength Logic]
            ESK[Experience Synthesis KB<br/>Decision Patterns + Success Metrics<br/>HITL Learning Data]
        end
    end

    subgraph "PROTOCOL HITL LEARNING SYSTEM"
        ECS[Edit Capture System<br/>Real-time Change Tracking<br/>Rationale Documentation]
        PLR[Pattern Learning Engine<br/>Scientist Preference Analysis<br/>ML Pattern Recognition]
        QIS[Quality Improvement System<br/>Protocol Success Tracking<br/>Performance Analytics]
        AOS[AI Optimization System<br/>Agent Fine-tuning<br/>Continuous Enhancement]
    end

    subgraph "DATA PROCESSING & STORAGE LAYER"
        subgraph "Input Processing"
            DIA[Data Ingestion Agent<br/>Multi-format Parser<br/>SOPs + Guidelines]
            KPA[Knowledge Processing Agent<br/>Text + Structured Data<br/>Relationship Mapping]
            EIA2[Experience Integration Agent<br/>Historical Decision Mining<br/>Success Pattern Extraction]
        end
        
        subgraph "Storage Systems"
            AzureSQL[Azure SQL Database<br/>Structured Protocol Data<br/>Version Control]
            CosmosDB[Cosmos DB<br/>Knowledge Graph Storage<br/>Multi-model Support]
            BlobStorage[Azure Blob Storage<br/>Document Templates<br/>Protocol Versions]
            DataLake[Azure Data Lake<br/>Analytics & Metrics<br/>Performance Tracking]
        end
    end

    subgraph "DOCUMENT GENERATION & OUTPUT"
        DFA[Document Formatting Agent<br/>Professional Templates<br/>Company Branding]
        VMA[Version Management Agent<br/>Protocol Versioning<br/>Change Tracking]
        ExportEngine[Multi-format Export<br/>Word/PDF/PowerPoint<br/>SharePoint Integration]
    end

    subgraph "AZURE AI SERVICES FOUNDATION"
        subgraph "Core AI Services"
            GPT4[Azure OpenAI GPT-4o<br/>128K Context + Reasoning<br/>Pharmaceutical Domain Prompts]
            Embedding[Text-Embedding-3-Large<br/>3072 Dimensions<br/>Multi-modal Semantic Search]
            AIFoundry[Azure AI Foundry<br/>Agent Orchestration Platform<br/>Semantic Kernel Integration]
        end
        
        subgraph "Supporting Services"
            DocIntel[Document Intelligence<br/>Pharmaceutical Layout Recognition<br/>Structured Data Extraction]
            FormRec[Form Recognizer<br/>Excel + PDF Processing<br/>Template Understanding]
            CogSearch[Cognitive Search<br/>Advanced Query Processing<br/>Metadata Filtering]
        end
    end

    %% Data Flow Connections
    UI --> API
    PI --> API
    HITLInt --> API
    EI --> API
    
    API --> MO
    MO --> TP
    TP --> AM
    
    AM --> PSA
    AM --> PAA
    AM --> PSelA
    AM --> EIA
    AM --> RCE
    AM --> LRA
    AM --> PGA
    AM --> CVA
    AM --> EQA
    
    PSA --> VS
    PSA --> PSK
    PAA --> RKB
    PSelA --> PKB
    EIA --> ESK
    RCE --> PSK
    PGA --> VS
    PGA --> PKB
    CVA --> RKB
    EQA --> KB
    
    VS --> CogSearch
    PKB --> VS
    RKB --> VS
    KB --> CosmosDB
    PSK --> AzureSQL
    ESK --> DataLake
    
    HITLInt --> ECS
    ECS --> PLR
    PLR --> QIS
    QIS --> AOS
    AOS --> AM
    
    DIA --> KB
    KPA --> VS
    EIA2 --> ESK
    
    PGA --> DFA
    DFA --> VMA
    VMA --> ExportEngine
    ExportEngine --> UI
    
    GPT4 --> PSA
    GPT4 --> PAA
    GPT4 --> PGA
    GPT4 --> CVA
    Embedding --> VS
    AIFoundry --> AM
    DocIntel --> DIA
    FormRec --> EI
    
    %% Styling
    classDef primaryAgent fill:#ff6b6b,stroke:#fff,stroke-width:3px,color:#fff
    classDef aiService fill:#4ecdc4,stroke:#fff,stroke-width:2px,color:#fff
    classDef storage fill:#45b7d1,stroke:#fff,stroke-width:2px,color:#fff
    classDef hitl fill:#96ceb4,stroke:#fff,stroke-width:2px,color:#000
    
    class PSA,RCE,PGA primaryAgent
    class GPT4,Embedding,AIFoundry aiService
    class VS,KB,AzureSQL,CosmosDB storage
    class HITLInt,ECS,PLR,QIS hitl
"""

# -----------------------------------------------------------------------------
# Mermaid parsing (nodes, groups, edges)
# -----------------------------------------------------------------------------
@dataclass
class Node:
    id: str
    title: str
    desc: List[str]
    group: Optional[str] = None

@dataclass
class Group:
    name: str
    parent: Optional[str] = None
    nodes: List[str] = field(default_factory=list)

def load_mermaid() -> str:
    if MERMAID_FILE:
        with open(MERMAID_FILE, "r", encoding="utf-8") as f:
            return f.read()
    if MERMAID_SRC:
        return MERMAID_SRC
    raise RuntimeError("Provide MERMAID_FILE path or MERMAID_SRC string.")

def parse_mermaid(src: str) -> Tuple[Dict[str, Node], Dict[str, Group], List[Tuple[str, str]]]:
    # Nested subgraph capture
    sg = re.compile(r'subgraph\s+"?([^"]+)"?\s*(.*?)\s*end', re.S)
    node = re.compile(r'(\w+)\[([^\]]+)\]')
    edge = re.compile(r'(\w+)\s*-->\s*(\w+)')

    nodes: Dict[str, Node] = {}
    groups: Dict[str, Group] = {}
    edges: List[Tuple[str, str]] = []

    def walk(block: str, parent: Optional[str] = None):
        for m in sg.finditer(block):
            name, body = m.group(1).strip(), m.group(2)
            groups[name] = Group(name=name, parent=parent)
            for n in node.finditer(body):
                nid, raw = n.group(1), n.group(2)
                parts = [p.strip() for p in raw.split("\n")]
                title, rest = parts[0], parts[1:]
                nodes[nid] = Node(id=nid, title=title, desc=rest, group=name)
                groups[name].nodes.append(nid)
            walk(body, parent=name)

    walk(src, None)
    edges = edge.findall(src)
    return nodes, groups, edges

# -----------------------------------------------------------------------------
# Layout (lanes & grid; units are arbitrary, used only for positioning metadata
# that the template will interpret to place shapes)
# -----------------------------------------------------------------------------
LANE_ORDER = [
    "USER INTERFACE LAYER",
    "API GATEWAY & ORCHESTRATION",
    "PROTOCOL-SPECIFIC AGENT LAYER",
    "ADVANCED RAG + KNOWLEDGE MANAGEMENT",
    "PROTOCOL HITL LEARNING SYSTEM",
    "DATA PROCESSING & STORAGE LAYER",
    "DOCUMENT GENERATION & OUTPUT",
]
BOTTOM_LANE = "AZURE AI SERVICES FOUNDATION"

PALETTE = {
    "USER INTERFACE LAYER": "#EAF2FF",
    "API GATEWAY & ORCHESTRATION": "#F3F7E9",
    "PROTOCOL-SPECIFIC AGENT LAYER": "#FFEDEA",
    "ADVANCED RAG + KNOWLEDGE MANAGEMENT": "#EAF8FB",
    "PROTOCOL HITL LEARNING SYSTEM": "#ECF7F1",
    "DATA PROCESSING & STORAGE LAYER": "#EEF2F7",
    "DOCUMENT GENERATION & OUTPUT": "#FFF7E6",
    "AZURE AI SERVICES FOUNDATION": "#EAF3FF",
}

ICON_HINTS = {
    # node_id -> Azure icon key (used by template, not by python-vsdx)
    "UI": "App Service",
    "PI": "App Service",
    "HITLInt": "Generic",
    "EI": "Form Recognizer",
    "API": "API Management",
    "MO": "Generic", "TP": "Generic", "AM": "Generic",
    "VS": "AI Search", "PKB": "Generic", "RKB": "Generic",
    "KB": "Cosmos DB", "PSK": "SQL Database", "ESK": "Data Lake",
    "ECS": "Generic", "PLR": "Generic", "QIS": "Generic", "AOS": "Generic",
    "DIA": "Generic", "KPA": "Generic", "EIA2": "Generic",
    "AzureSQL": "SQL Database", "CosmosDB": "Cosmos DB",
    "BlobStorage": "Storage", "DataLake": "Data Lake",
    "DFA": "Generic", "VMA": "Generic", "ExportEngine": "Generic",
    "GPT4": "Azure OpenAI", "Embedding": "Generic", "AIFoundry": "AI Foundry",
    "DocIntel": "Document Intelligence", "FormRec": "Form Recognizer", "CogSearch": "AI Search",
}

def compute_layout(nodes: Dict[str, Node], groups: Dict[str, Group]):
    """Return layout dicts used by the Jinja template."""
    # lane sizing
    lane_w = 380  # px-ish: template will scale
    lane_gap = 30
    x_cursor = 60
    y_top = 600

    # lane heights by node count
    lane_heights: Dict[str, int] = {}
    for lane in LANE_ORDER:
        n = len(groups.get(lane, Group(lane)).nodes)
        lane_heights[lane] = max(240, 120 + math.ceil(max(1, n) / 3) * 90)

    containers = []
    node_boxes = []

    # position lanes and their nodes
    for lane in LANE_ORDER:
        g = groups[lane]
        gw, gh = lane_w, lane_heights[lane]
        gx, gy = x_cursor, y_top
        containers.append({
            "name": lane, "x": gx, "y": gy, "w": gw, "h": gh,
            "fill": PALETTE.get(lane, "#FFFFFF")
        })
        cols = 3 if lane == "PROTOCOL-SPECIFIC AGENT LAYER" else 2
        col_w = (gw - 40) / cols
        ix, iy = 0, 0
        for nid in g.nodes:
            n = nodes[nid]
            w, h = 160, 70
            nx = gx + 20 + ix * col_w + (col_w - w) / 2
            ny = gy - 60 - iy * 90
            node_boxes.append({
                "id": n.id,
                "title": n.title,
                "desc": n.desc[:2],
                "group": n.group,
                "icon": ICON_HINTS.get(n.id, "Generic"),
                "x": nx, "y": ny, "w": w, "h": h
            })
            ix += 1
            if ix >= cols:
                ix = 0
                iy += 1
        x_cursor += gw + lane_gap

    # bottom swimlane (Azure AI Services Foundation)
    if BOTTOM_LANE in groups:
        g = groups[BOTTOM_LANE]
        gw = max(x_cursor - 60, 900)
        gh = 140
        gx, gy = 50, 180
        containers.append({
            "name": BOTTOM_LANE, "x": gx, "y": gy, "w": gw, "h": gh,
            "fill": PALETTE.get(BOTTOM_LANE, "#FFFFFF")
        })
        step = gw / (len(g.nodes) + 1 if g.nodes else 2)
        for i, nid in enumerate(g.nodes, start=1):
            n = nodes[nid]
            w, h = 160, 70
            nx = gx + i * step - w / 2
            ny = gy - 60
            node_boxes.append({
                "id": n.id,
                "title": n.title, "desc": n.desc[:2],
                "group": n.group, "icon": ICON_HINTS.get(n.id, "Generic"),
                "x": nx, "y": ny, "w": w, "h": h
            })

    return containers, node_boxes

# -----------------------------------------------------------------------------
# Build Jinja context for the Visio template
# -----------------------------------------------------------------------------
def build_context(nodes, groups, edges):
    containers, node_boxes = compute_layout(nodes, groups)
    # Edges as simple id pairs; the template will route connectors visually
    ctx = {
        "title": "AI-Driven Protocol Generation – Azure Reference Architecture",
        "legend": [
            {"name": "Data flow", "style": "solid"},
            {"name": "Lookup/reference", "style": "dashed"},
        ],
        "palette": PALETTE,
        "containers": containers,
        "nodes": node_boxes,
        "edges": [{"src": s, "dst": d} for (s, d) in edges],
        # Numbered badges 1..8 (for the template to render)
        "flow_badges": [
            "USER INTERFACE LAYER",
            "API GATEWAY & ORCHESTRATION",
            "PROTOCOL-SPECIFIC AGENT LAYER",
            "ADVANCED RAG + KNOWLEDGE MANAGEMENT",
            "PROTOCOL HITL LEARNING SYSTEM",
            "DATA PROCESSING & STORAGE LAYER",
            "DOCUMENT GENERATION & OUTPUT",
            "USER INTERFACE LAYER"
        ],
    }
    return ctx

# -----------------------------------------------------------------------------
# Visio render (official API only)
# -----------------------------------------------------------------------------
def render_to_visio(context: dict, template_path: str, output_path: str, page_name="Architecture"):
    """
    Uses official vsdx API:
      - VisioFile(...)
      - add_page() / get_page_by_name()
      - jinja_render_vsdx(context)
      - save_vsdx(...)
    Docs: https://vsdx.readthedocs.io/en/latest/classes.html
    """
    with VisioFile(template_path) as vis:
        # If the template already contains a page with Jinja placeholders,
        # we can render in-place. Otherwise, create or copy a page first.
        # add_page is documented. If your template expects a specific page, you can get by name.
        try:
            # prefer creating a fresh page to avoid name collisions
            vis.add_page(page_name)  # documented method
        except Exception:
            pass  # not fatal; template likely has a page already

        # Render Jinja placeholders using context
        vis.jinja_render_vsdx(context=context)  # documented method

        # Save final file
        vis.save_vsdx(output_path)  # documented method
        print(f"Saved: {output_path}")

# -----------------------------------------------------------------------------
# Glue
# -----------------------------------------------------------------------------
def main():
    mermaid_src = load_mermaid()
    nodes, groups, edges = parse_mermaid(mermaid_src)

    # Ensure required lanes exist even if empty
    for lane in LANE_ORDER + [BOTTOM_LANE]:
        if lane not in groups:
            groups[lane] = Group(name=lane, parent=None)

    ctx = build_context(nodes, groups, edges)
    render_to_visio(ctx, TEMPLATE_VSDX, OUTPUT_VSDX)

if __name__ == "__main__":
    main()
