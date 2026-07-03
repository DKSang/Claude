const LIFECYCLE_STAGES = [
  { vi: "Sinh dữ liệu", en: "Generation", moduleId: "module-00-source-systems" },
  { vi: "Lưu trữ", en: "Storage", moduleId: "module-00-storage-systems" },
  { vi: "Nạp dữ liệu", en: "Ingestion", moduleId: "module-01-ingestion" },
  { vi: "Biến đổi", en: "Transformation", moduleId: "module-02-modeling" },
  { vi: "Phục vụ", en: "Serving", moduleId: "module-05-enterprise" },
] as const;

interface LifecycleDiagramProps {
  activeModuleId?: string;
}

export function LifecycleDiagram({ activeModuleId }: LifecycleDiagramProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-1">
      {LIFECYCLE_STAGES.map((stage, i) => {
        const isActive = activeModuleId === stage.moduleId;
        return (
          <div key={stage.moduleId} className="flex flex-col md:flex-row items-center gap-2 md:gap-1">
            <div
              style={{
                background: isActive ? "rgba(217,119,87,0.08)" : "var(--card)",
                border: `1px solid ${isActive ? "var(--text-accent)" : "var(--border-tertiary)"}`,
                borderRadius: "var(--radius-large)",
                padding: "12px 20px",
                textAlign: "center",
                minWidth: 120,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "17px",
                  color: "var(--fg-primary)",
                  fontWeight: 500,
                }}
              >
                {stage.vi}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontFamily: "var(--font-sans)",
                  color: "var(--fg-tertiary)",
                  marginTop: 2,
                }}
              >
                {stage.en}
              </div>
            </div>
            {i < LIFECYCLE_STAGES.length - 1 && (
              <svg width="24" height="24" viewBox="0 0 24 24" className="hidden md:block">
                <path
                  d="M4 12 L20 12"
                  stroke="var(--border-secondary)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M16 8 L20 12 L16 16"
                  stroke="var(--border-secondary)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            )}
            {i < LIFECYCLE_STAGES.length - 1 && (
              <svg width="24" height="24" viewBox="0 0 24 24" className="md:hidden">
                <path
                  d="M12 4 L12 20"
                  stroke="var(--border-secondary)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M8 16 L12 20 L16 16"
                  stroke="var(--border-secondary)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
