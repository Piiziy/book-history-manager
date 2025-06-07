/** @jsxImportSource @emotion/react */
"use client";

import styled from "@emotion/styled";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface MenuItem {
  icon: string;
  label: string;
  href: string;
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login") {
    return null;
  }
  const menuItems: MenuItem[] = [
    {
      icon: "🏠",
      label: "홈",
      href: "/home",
    },
    {
      icon: "🔍",
      label: "서재",
      href: "/study",
    },
    {
      icon: "📋",
      label: "책 추가하기",
      href: "/addBook",
    },
    {
      icon: "⚙️",
      label: "설정",
      href: "/settings",
    },
  ];

  const MenuItem = styled(Link)`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.875rem;
    color: #854eba;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: #571c87;
    }
  `;

  return (
    <div
      css={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        padding: "0.5rem 0",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {menuItems.map((item) => (
        <MenuItem key={item.href} href={item.href}>
          <span
            css={{
              fontSize: "1.5rem",
            }}
          >
            {item.icon}
          </span>
          <span
            css={{
              marginTop: "0.25rem",
            }}
          >
            {item.label}
          </span>
        </MenuItem>
      ))}
    </div>
  );
}
