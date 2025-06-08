/** @jsxImportSource @emotion/react */
"use client";

import { keyframes } from "@emotion/react";

const dotPulse = keyframes`
  0%, 80%, 100% {
    background-color: #e6e6fa;
  }
  40% {
    background-color: rgb(166, 166, 252);
  }
`;

const dotStyle = {
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  margin: "0 8px",
  animation: `${dotPulse} 1.4s infinite ease-in-out both`,
};

export default function LoadingDotsSkeleton() {
  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span css={dotStyle} />
      <span
        css={{
          ...dotStyle,
          animationDelay: "0.2s",
        }}
      />
      <span
        css={{
          ...dotStyle,
          animationDelay: "0.4s",
        }}
      />
    </div>
  );
}
