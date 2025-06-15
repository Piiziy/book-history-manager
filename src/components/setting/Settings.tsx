/** @jsxImportSource @emotion/react */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";
import { logout } from "@/lib/auth";

// 스타일 정의
const containerStyle = css({
  padding: "2rem",
  maxWidth: "600px",
  margin: "0 auto",
});

const loadingContainerStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  fontSize: "1.2rem",
  color: "#666",
});

const headerContainerStyle = css({
  marginBottom: "3rem",
});

const titleStyle = css({
  marginTop: "5rem",
  fontSize: "2rem",
  fontWeight: 700,
  marginBottom: "0.5rem",
  color: "#333",
});

const subtitleStyle = css({
  fontSize: "1rem",
  color: "#666",
});

const cardStyle = css({
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "2rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  marginBottom: "2rem",
});

const profileContainerStyle = css({
  display: "flex",
  alignItems: "center",
  marginBottom: "1.5rem",
});

const profileImageStyle = css({
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  marginRight: "1rem",
  border: "2px solid #f0f0f0",
});

const userNameStyle = css({
  fontSize: "1.5rem",
  fontWeight: 600,
  marginBottom: "0.25rem",
  color: "#333",
});

const userEmailStyle = css({
  fontSize: "0.9rem",
  color: "#666",
});

const logoutSectionStyle = css({
  borderTop: "1px solid #f0f0f0",
  paddingTop: "1.5rem",
});

const getLogoutButtonStyle = (isLoggingOut: boolean) =>
  css({
    width: "100%",
    padding: "0.75rem 1.5rem",
    backgroundColor: isLoggingOut ? "#ccc" : "#ff4757",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: isLoggingOut ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: isLoggingOut ? "#ccc" : "#ff3742",
      transform: isLoggingOut ? "none" : "translateY(-1px)",
      boxShadow: isLoggingOut ? "none" : "0 4px 12px rgba(255, 71, 87, 0.3)",
    },

    "&:active": {
      transform: isLoggingOut ? "none" : "translateY(0)",
    },
  });

export default function Settings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div css={loadingContainerStyle}>로딩 중...</div>;
  }

  if (!session?.user) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div css={containerStyle}>
      <div css={headerContainerStyle}>
        <p css={titleStyle}>설정</p>
        <p css={subtitleStyle}>계정 설정을 관리하세요</p>
      </div>

      <div css={cardStyle}>
        <div css={profileContainerStyle}>
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="프로필 이미지"
              width={60}
              height={60}
              css={profileImageStyle}
            />
          )}
          <div>
            <h2 css={userNameStyle}>{session.user.name}님</h2>
            <p css={userEmailStyle}>{session.user.email}</p>
          </div>
        </div>

        <div css={logoutSectionStyle}>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            css={getLogoutButtonStyle(isLoggingOut)}
          >
            {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
          </button>
        </div>
      </div>
    </div>
  );
}
