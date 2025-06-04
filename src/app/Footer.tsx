/** @jsxImportSource @emotion/react */
"use client";

export default function Footer() {
  return (
    <div
      css={{
        backgroundColor: "#00000a",
        color: "#fff",
        padding: "1rem",
      }}
    >
      <div className="container mx-auto px-4">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
}
