/** @jsxImportSource @emotion/react */

import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 0);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  to {
    opacity: 0;
    transform: translate(-50%, 0);
  }
`;

export default function Toast({ message }: { message: string }) {
  return (
    <div
      css={{
        position: "fixed",
        bottom: "100px",
        left: "50%",
        transform: "translateX(0%)",
        background: "rgb(255, 255, 255)",
        color: "black",
        padding: "0.75rem 1.5rem",
        borderRadius: "20px",
        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.25)",
        zIndex: 1000,
        fontSize: "0.9rem",
        animation: `${fadeIn} 0.6s ease-out, ${fadeOut} 0.6s ease-in 1.8s`,
        animationFillMode: "forwards",
      }}
    >
      {message}
    </div>
  );
}
