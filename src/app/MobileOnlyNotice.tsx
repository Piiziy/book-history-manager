"use client";

import { useEffect, useState } from "react";

export default function MobileOnlyNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const checkViewportWidth = () => {
      if (window.innerWidth >= 650) {
        setShowNotice(true);
      } else {
        setShowNotice(false);
      }
    };

    // 초기 체크
    checkViewportWidth();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", checkViewportWidth);

    // 클린업
    return () => {
      window.removeEventListener("resize", checkViewportWidth);
    };
  }, []);

  if (!showNotice) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            marginBottom: "30px",
          }}
        >
          📱
        </div>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "24px",
            color: "#2c3e50",
            lineHeight: "1.2",
          }}
        >
          모바일 전용 서비스
        </h1>
        <p
          style={{
            fontSize: "24px",
            lineHeight: "1.6",
            color: "#7f8c8d",
            marginBottom: "40px",
          }}
        >
          이 서비스는 모바일 환경에 최적화되어 있습니다.
          <br />
          모바일 기기에서 접속해주세요.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#95a5a6",
              padding: "16px 32px",
              backgroundColor: "#ecf0f1",
              borderRadius: "8px",
            }}
          >
            권장 화면 크기: 650px 미만
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#bdc3c7",
            }}
          >
            현재 화면 크기가 너무 큽니다
          </div>
        </div>
      </div>
    </div>
  );
}
