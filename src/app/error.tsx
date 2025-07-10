"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h2
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        문제가 발생했습니다
      </h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </p>
      {error.digest && (
        <p
          style={{ fontSize: "0.875rem", color: "#888", marginBottom: "2rem" }}
        >
          오류 ID: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        style={{
          backgroundColor: "#6B4EFF",
          color: "white",
          padding: "0.75rem 2rem",
          borderRadius: "0.5rem",
          border: "none",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
