"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  CodeIcon,
  BarChartIcon,
  SparkleIcon,
  PencilIcon,
  ShoppingBagIcon,
} from "@/components/icons";

const serifStyle = { fontFamily: "'Anthropic Serif', 'Source Serif Pro', Georgia, serif" };
const sansStyle = { fontFamily: "'Anthropic Sans', 'Source Sans Pro', 'Helvetica Neue', sans-serif" };

const features = [
  {
    title: "Break down problems together",
    description:
      "Claude builds on your ideas, expands on your logic, and simplifies complexity one step at a time.",
  },
  {
    title: "Tackle your toughest work",
    description:
      "Claude provides expert-level collaboration on the things you need to get done—from coding a product to critical data analysis.",
  },
  {
    title: "Explore what's next",
    description:
      "Like an expert in your pocket, collaborating with Claude expands what you can build on your own or with teams.",
  },
];

const useCases = [
  {
    icon: CodeIcon,
    category: "Software development",
    items: ["Debugging", "Testing", "Optimization", "Documentation", "Reviews"],
  },
  {
    icon: BarChartIcon,
    category: "Data analysis",
    items: ["Visualizations", "Queries", "Processing", "Reports", "Patterns"],
  },
  {
    icon: SparkleIcon,
    category: "Content creation",
    items: ["Marketing", "Education", "Documentation", "Translation", "Editing"],
  },
  {
    icon: PencilIcon,
    category: "Design",
    items: ["Prototypes", "Components", "Flows", "Responsive", "Visuals"],
  },
  {
    icon: ShoppingBagIcon,
    category: "Business strategy",
    items: ["Growth", "Markets", "Campaigns", "Modeling", "Competition"],
  },
];

export function ProblemSolversSection() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: "#f0eee6", padding: "8rem 0" }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: 1440, padding: "0 2rem" }}>
        <h2
          className="mx-auto text-center"
          style={{
            ...serifStyle,
            fontSize: 52,
            fontWeight: 500,
            lineHeight: 1.2,
            color: "#141413",
            maxWidth: 1012,
            marginBottom: "4rem",
          }}
        >
          The AI for problem solvers
        </h2>

        <div
          className="mx-auto grid gap-8"
          style={{
            maxWidth: 1200,
            gridTemplateColumns: "repeat(3, 1fr)",
            marginBottom: "5rem",
          }}
        >
          {features.map((feature) => (
            <div key={feature.title}>
              <h3
                style={{
                  ...serifStyle,
                  fontSize: 19,
                  fontWeight: 500,
                  color: "#3d3d3a",
                  maxWidth: 367,
                  marginBottom: "0.75rem",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  ...sansStyle,
                  fontSize: 15,
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#5e5d59",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mx-auto grid gap-10"
          style={{
            maxWidth: 1200,
            gridTemplateColumns: "repeat(5, 1fr)",
            marginBottom: "5rem",
          }}
        >
          {useCases.map(({ icon: Icon, category, items }) => (
            <div key={category}>
              <div className="mb-4 flex items-center gap-2">
                <Icon width={18} height={18} style={{ color: "#141413" }} />
                <span
                  style={{
                    ...serifStyle,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#141413",
                  }}
                >
                  {category}
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer transition-colors duration-200"
                    style={{
                      ...sansStyle,
                      fontSize: 15,
                      color: "#4d4c48",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "#d97757";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "#4d4c48";
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mx-auto"
          style={{
            maxWidth: 1200,
            backgroundColor: "#ffffff",
            border: "0.8px solid #f0eee6",
            borderRadius: 32,
            padding: 64,
            display: "flex",
            alignItems: "center",
            gap: 48,
          }}
        >
          <p
            style={{
              ...sansStyle,
              fontSize: 17,
              lineHeight: "26px",
              color: "#5e5d59",
              flex: 1,
            }}
          >
            Switching to Claude from another AI provider? Import your memory and
            pick up where you left off.
          </p>
          <Link
            href="/import-memory"
            className="shrink-0 transition-colors duration-200"
            style={{
              ...serifStyle,
              fontSize: 17,
              fontWeight: 500,
              color: "#141413",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "#d97757";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "#141413";
            }}
          >
            Start importing →
          </Link>
        </div>
      </div>
    </section>
  );
}
