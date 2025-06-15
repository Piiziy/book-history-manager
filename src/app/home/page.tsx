/** @jsxImportSource @emotion/react */
"use client";

import ReadingBooks from "@/components/home/ReadingBooks";

export default function Home() {
  return (
    <>
      <ReadingBooks />
      <div
        css={{
          position: "fixed",
          right: 0,
          bottom: 0,
          width: "max(100vw, calc(100vh - 100px))",
          height: "max(100vw, calc(100vh - 100px))",
          background: "linear-gradient(to bottom, #E6E6FA 0%, #FFE4E1 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at bottom right, #000 max(70vw, calc(100vh - 100px)*0.7), transparent max(100vw, calc(100vh - 100px)))",
          WebkitMaskMode: "alpha",
          borderTopLeftRadius: "50%",
          zIndex: -1,
        }}
      />
    </>
  );
}
