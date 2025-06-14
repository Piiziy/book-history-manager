/** @jsxImportSource @emotion/react */

import useBookProgress from "@/hook/useBookProgress";
import { UserBook } from "@/types/userBook";
import Image from "next/image";

interface ReadingBookInfoProps {
  userBook: UserBook;
}

export default function ReadingBookInfo({ userBook }: ReadingBookInfoProps) {
  const progress = useBookProgress(userBook);

  return (
    <div
      css={{
        background: "rgba(255, 255, 255, 0.8)",
        borderRadius: "16px",
        padding: "1.5rem",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        height: "100%",
      }}
    >
      <div
        css={{
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
          color: "#333",
        }}
      >
        {userBook.book.title.length > 20
          ? userBook.book.title.slice(0, 20) + "..."
          : userBook.book.title}
      </div>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          css={{
            position: "relative",
            width: "45%",
            "&::after": {
              content: '""',
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
            },
          }}
        >
          <Image
            src={userBook.book.cover}
            alt={userBook.book.title}
            height={150}
            width={150}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              objectFit: "cover",
            }}
            priority
          />
        </div>
        <div
          css={{
            height: "100%",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(0.5rem, 2vw, 1rem)",
            justifyContent: "flex-start",
            paddingTop: "0.5rem",
          }}
        >
          <div>
            <div
              css={{
                display: "flex",
                alignItems: "baseline",
                marginBottom: "clamp(0.5rem, 1.5vw, 1rem)",
              }}
            >
              <div
                css={{
                  fontSize: "clamp(1rem, 5vw, 10rem)",
                  fontWeight: 600,
                  color: "#6B4EFF",
                }}
              >
                {progress.currentPage}
              </div>
              <div
                css={{
                  fontSize: "clamp(1rem, 5vw, 10rem)",
                  fontWeight: 600,
                  color: "#555",
                  marginLeft: "4px",
                }}
              >
                / {progress.totalPages} 페이지
              </div>
            </div>
            <div
              css={{
                height: "8px",
                backgroundColor: "#E6E6FA",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "clamp(0.75rem, 2vw, 1.25rem)",
              }}
            >
              <div
                css={{
                  width: `${progress.percentage}%`,
                  height: "100%",
                  backgroundColor: "#6B4EFF",
                  borderRadius: "4px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(0.3rem, 1vw, 0.5rem)",
            }}
          >
            <div
              css={{
                fontSize: "clamp(0.8rem, 4vw, 10rem)",
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span css={{ color: "#6B4EFF" }}>
                {Math.round(progress.percentage)}%
              </span>
              <span>완독</span>
            </div>
            <div
              css={{
                fontSize: "clamp(0.8rem, 4vw, 10rem)",
                color: "#666",
                marginBottom: "clamp(0.2rem, 0.5vw, 0.4rem)",
              }}
            >
              {progress.remainingPages > 0 && (
                <span>남은 페이지: {progress.remainingPages}p</span>
              )}
            </div>
            {progress.estimatedDaysToComplete && (
              <div
                css={{
                  fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                  color: "#6B4EFF",
                  fontWeight: 600,
                }}
              >
                약 {progress.estimatedDaysToComplete}일 후 완독 예정
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
