"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import dagre from "dagre";
import "@xyflow/react/dist/style.css";

interface MindMapBlockProps {
  id: string;
  nodes: { id: string; label: string; nodeType: "concept" | "tool" | "stage" }[];
  edges: { from: string; to: string; label: string }[];
}

const NODE_W = 140;
const NODE_H = 50;

const TYPE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  concept: { bg: "rgba(217,119,87,0.10)", border: "var(--color-clay)", text: "var(--fg-primary)" },
  tool: { bg: "rgba(98,153,135,0.10)", border: "var(--color-mineral)", text: "var(--fg-primary)" },
  stage: { bg: "rgba(106,155,204,0.10)", border: "var(--color-sky)", text: "var(--fg-primary)" },
};

function MindMapNode({ data }: NodeProps) {
  const nodeType = (data.nodeType as string) || "concept";
  const colors = TYPE_COLORS[nodeType] ?? TYPE_COLORS.concept;
  const isStage = nodeType === "stage";

  return (
    <div style={{
      padding: "8px 14px",
      borderRadius: isStage ? 999 : 8,
      background: colors.bg,
      border: `1.5px solid ${colors.border}`,
      fontFamily: "var(--font-serif)",
      fontSize: "14px",
      fontWeight: 500,
      color: colors.text,
      textAlign: "center",
      minWidth: NODE_W,
    }}>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      {data.label as string}
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  );
}

const nodeTypes = { mindmapNode: MindMapNode };

function layoutGraph(
  nodes: MindMapBlockProps["nodes"],
  edges: MindMapBlockProps["edges"]
): { layoutNodes: Node[]; layoutEdges: Edge[] } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "LR", nodesep: 40, ranksep: 60 });

  for (const n of nodes) {
    g.setNode(n.id, { width: NODE_W, height: NODE_H });
  }
  for (const e of edges) {
    g.setEdge(e.from, e.to);
  }
  dagre.layout(g);

  const layoutNodes: Node[] = nodes.map((n) => {
    const pos = g.node(n.id);
    return {
      id: n.id,
      type: "mindmapNode",
      position: { x: pos.x - NODE_W / 2, y: pos.y - NODE_H / 2 },
      data: { label: n.label, nodeType: n.nodeType },
    };
  });

  const layoutEdges: Edge[] = edges.map((e, i) => ({
    id: `edge-${i}`,
    source: e.from,
    target: e.to,
    label: e.label,
    labelStyle: {
      fontSize: 11,
      fontFamily: "var(--font-sans)",
      fill: "var(--fg-tertiary)",
    },
    labelBgStyle: { fill: "var(--bg-primary)" },
    style: { stroke: "var(--border-secondary)", strokeWidth: 1.5 },
  }));

  return { layoutNodes, layoutEdges };
}

export function MindMapBlock({ nodes, edges }: MindMapBlockProps) {
  const { layoutNodes, layoutEdges } = useMemo(() => layoutGraph(nodes, edges), [nodes, edges]);

  return (
    <div style={{
      height: 400,
      marginBottom: "var(--space-1-5)",
      border: "1px solid var(--border-tertiary)",
      borderRadius: "var(--radius-small)",
      overflow: "hidden",
      background: "var(--bg-secondary)",
    }}>
      <ReactFlow
        nodes={layoutNodes}
        edges={layoutEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable
        zoomOnScroll={false}
        panOnDrag
        proOptions={{ hideAttribution: true }}
      >
        <Background color="var(--border-tertiary)" gap={20} size={1} />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(n) => {
            const nt = (n.data?.nodeType as string) || "concept";
            return TYPE_COLORS[nt]?.border ?? "var(--border-secondary)";
          }}
          maskColor="rgba(250,249,245,0.7)"
          style={{ background: "var(--bg-secondary)" }}
        />
      </ReactFlow>
    </div>
  );
}
