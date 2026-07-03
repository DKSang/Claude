interface TableBlockProps {
  headers: string[];
  rows: string[][];
}

export function TableBlock({ headers, rows }: TableBlockProps) {
  return (
    <div
      className="mb-[var(--space-1-5)] overflow-x-auto"
      style={{
        borderRadius: "var(--radius-small)",
        border: "1px solid var(--border-tertiary)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--bg-tertiary)" }}>
            {headers.map((header, i) => (
              <th
                key={i}
                style={{
                  textAlign: "left",
                  padding: "10px 14px",
                  fontSize: "var(--text-body-3)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid var(--border-tertiary)",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "10px 14px",
                    fontSize: "var(--text-body-3)",
                    color: "var(--fg-secondary)",
                    borderTop: i === 0 ? "none" : "1px solid var(--border-tertiary)",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
