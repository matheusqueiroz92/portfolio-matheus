"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--background-gradient-start) 0%, var(--background-gradient-middle) 50%, var(--background-gradient-end) 100%)",
        }}
      ></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0" style={{ opacity: 0.15 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--background-grid-color) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>
    </div>
  );
}
