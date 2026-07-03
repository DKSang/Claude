"use client";

import { useMemo, useState } from "react";

const VIEWBOX = 800;
const CX = 400;
const CY = 400;
const CAT_RADIUS = 260;
const ITEM_RADIUS = 390;

const CATEGORIES = [
  {
    label: "Business Strategy",
    angle: 0,
    items: ["Growth", "Markets", "Campaigns", "Modeling", "Competition"],
  },
  {
    label: "Design",
    angle: 72,
    items: ["Prototypes", "Components", "Flows", "Responsive", "Visuals"],
  },
  {
    label: "Software Development",
    angle: 144,
    items: ["Debugging", "Testing", "Optimization", "Documentation", "Reviews"],
  },
  {
    label: "Data Analysis",
    angle: 216,
    items: ["Visualizations", "Queries", "Processing", "Reports", "Patterns"],
  },
  {
    label: "Content Creation",
    angle: 288,
    items: ["Marketing", "Education", "Documentation", "Translation", "Editing"],
  },
];

const ITEM_OFFSETS = [-30, -15, 0, 15, 30];

type NodeType = "center" | "category" | "item";

type NodeData = {
  id: string;
  type: NodeType;
  label: string;
  x: number;
  y: number;
};

type EdgeData = {
  id: string;
  source: string;
  target: string;
};

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polarPoint(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = toRad(angleDeg);
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
  };
}

function buildGraph() {
  const nodes: NodeData[] = [];
  const edges: EdgeData[] = [];

  const center: NodeData = {
    id: "claude",
    type: "center",
    label: "Claude",
    x: CX,
    y: CY,
  };
  nodes.push(center);

  CATEGORIES.forEach((cat, catIndex) => {
    const catPos = polarPoint(CX, CY, CAT_RADIUS, cat.angle);
    const catId = `cat-${catIndex}`;
    const catNode: NodeData = {
      id: catId,
      type: "category",
      label: cat.label,
      ...catPos,
    };
    nodes.push(catNode);

    edges.push({ id: `edge-center-${catId}`, source: center.id, target: catId });

    const itemIds: string[] = [];
    cat.items.forEach((item, itemIndex) => {
      const itemAngle = cat.angle + ITEM_OFFSETS[itemIndex];
      const itemPos = polarPoint(CX, CY, ITEM_RADIUS, itemAngle);
      const itemId = `item-${catIndex}-${itemIndex}`;
      itemIds.push(itemId);
      nodes.push({
        id: itemId,
        type: "item",
        label: item,
        ...itemPos,
      });
      edges.push({ id: `edge-${catId}-${itemId}`, source: catId, target: itemId });
    });

    for (let i = 0; i < itemIds.length - 1; i++) {
      edges.push({
        id: `edge-chain-${catIndex}-${i}`,
        source: itemIds[i],
        target: itemIds[i + 1],
      });
    }
  });

  for (let i = 0; i < CATEGORIES.length; i++) {
    const next = (i + 1) % CATEGORIES.length;
    edges.push({
      id: `edge-ring-${i}`,
      source: `cat-${i}`,
      target: `cat-${next}`,
    });
  }

  return { nodes, edges };
}

function Asterisk({ x, y, size = 22, color = "#1a1a1a" }: { x: number; y: number; size?: number; color?: string }) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180;
    return {
      x2: x + size * Math.cos(angle),
      y2: y - size * Math.sin(angle),
    };
  });

  return (
    <g stroke={color} strokeWidth={2.5} strokeLinecap="round">
      {rays.map((r, i) => (
        <line key={i} x1={x} y1={y} x2={r.x2} y2={r.y2} />
      ))}
    </g>
  );
}

export function MindMapGraph() {
  const { nodes, edges } = useMemo(() => buildGraph(), []);
  const [hovered, setHovered] = useState<string | null>(null);

  const connectedNodeIds = useMemo(() => {
    if (!hovered) return new Set<string>();
    const connected = new Set<string>([hovered]);
    edges.forEach((edge) => {
      if (edge.source === hovered) connected.add(edge.target);
      if (edge.target === hovered) connected.add(edge.source);
    });
    return connected;
  }, [hovered, edges]);

  const centerNode = nodes.find((n) => n.type === "center")!;
  const categoryNodes = nodes.filter((n) => n.type === "category");
  const itemNodes = nodes.filter((n) => n.type === "item");

  return (
    <div className="mx-auto" style={{ maxWidth: 800, width: "100%" }}>
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Claude AI capabilities mind map"
        style={{ display: "block", width: "100%", height: "auto" }}
        onMouseLeave={() => setHovered(null)}
      >
        <g>
          {edges.map((edge) => {
            const source = nodes.find((n) => n.id === edge.source)!;
            const target = nodes.find((n) => n.id === edge.target)!;
            const isActive =
              !hovered ||
              connectedNodeIds.has(edge.source) && connectedNodeIds.has(edge.target);
            return (
              <line
                key={edge.id}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={isActive ? "var(--border-tertiary)" : "var(--border-tertiary)"}
                strokeWidth={1}
                opacity={isActive ? 1 : 0.35}
                style={{ transition: "opacity 0.25s ease" }}
              />
            );
          })}
        </g>

        <g>
          {itemNodes.map((node) => {
            const isActive = !hovered || connectedNodeIds.has(node.id);
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHovered(node.id)}
                style={{ cursor: "pointer" }}
                opacity={isActive ? 1 : 0.25}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={18}
                  fill="var(--bg-primary)"
                  stroke="var(--border-tertiary)"
                  strokeWidth={1}
                  style={{ transition: "all 0.25s ease" }}
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill="var(--fg-tertiary)"
                  fontFamily="var(--font-sans)"
                  fontSize={13}
                  fontWeight={400}
                  style={{ pointerEvents: "none" }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>

        <g>
          {categoryNodes.map((node) => {
            const isActive = !hovered || connectedNodeIds.has(node.id);
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHovered(node.id)}
                style={{ cursor: "pointer" }}
                opacity={isActive ? 1 : 0.25}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={34}
                  fill="var(--bg-secondary)"
                  stroke="var(--border-tertiary)"
                  strokeWidth={1}
                  style={{ transition: "all 0.25s ease" }}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill="var(--fg-primary)"
                  fontFamily="var(--font-serif)"
                  fontSize={14}
                  fontWeight={600}
                  style={{ pointerEvents: "none" }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>

        <g onMouseEnter={() => setHovered(centerNode.id)} style={{ cursor: "pointer" }}>
          <circle
            cx={centerNode.x}
            cy={centerNode.y}
            r={55}
            fill="var(--fg-primary)"
            style={{ transition: "all 0.25s ease" }}
          />
          <Asterisk x={centerNode.x} y={centerNode.y - 8} size={22} color="var(--bg-primary)" />
          <text
            x={centerNode.x}
            y={centerNode.y + 26}
            textAnchor="middle"
            fill="var(--bg-primary)"
            fontFamily="var(--font-serif)"
            fontSize={16}
            fontWeight={600}
            style={{ pointerEvents: "none" }}
          >
            {centerNode.label}
          </text>
        </g>
      </svg>
    </div>
  );
}
