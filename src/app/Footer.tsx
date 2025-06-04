/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";

interface MenuItem {
  icon: string;
  label: string;
  href: string;
}

export default function Footer() {
  const menuItems: MenuItem[] = [
    {
      icon: "🏠",
      label: "홈",
      href: "/home",
    },
    {
      icon: "🔍",
      label: "히스토리",
      href: "/history",
    },
    {
      icon: "📋",
      label: "책 추가하기",
      href: "/add-book",
    },
    {
      icon: "⚙️",
      label: "설정",
      href: "/settings",
    },
  ];

  const MenuItem = styled(Link)`
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
      css={css({
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        padding: "0.5rem 0",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        zIndex: 1000,
      })}
    >
      <nav
        css={css({
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1rem",
        })}
      >
        <ul
          css={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 0,
            padding: 0,
            listStyle: "none",
          })}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.href} href={item.href}>
              <span
                css={css({
                  fontSize: "1.5rem",
                })}
              >
                {item.icon}
              </span>
              <span
                css={css({
                  marginTop: "0.25rem",
                })}
              >
                {item.label}
              </span>
            </MenuItem>
          ))}
        </ul>
      </nav>
    </div>
  );
}
