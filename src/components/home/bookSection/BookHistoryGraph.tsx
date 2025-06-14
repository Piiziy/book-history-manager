/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
  Scale,
  CoreScaleOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { UserBook } from "@/types/userBook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BookHistoryGraphProps {
  userBook: UserBook;
}

export default function BookHistoryGraph({ userBook }: BookHistoryGraphProps) {
  // Sort records by date
  const sortedRecords = [...userBook.records].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  if (sortedRecords.length === 0) {
    return (
      <div
        css={css`
          height: 200px;
          padding: 16px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 1.1rem;
          border-radius: 8px;
        `}
      >
        읽은 기록이 없습니다
      </div>
    );
  }

  const data = {
    labels: sortedRecords.map((record) => {
      const date = new Date(record.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: "읽은 페이지",
        data: sortedRecords.map((record) => record.cumulativePages),
        borderColor: "rgb(143, 59, 246)",
        backgroundColor: "rgba(143, 59, 246, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          title: (context: TooltipItem<"line">[]) => {
            const date = new Date(sortedRecords[context[0].dataIndex].date);
            return date.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          },
          label: (context: TooltipItem<"line">) => {
            return `읽은 페이지: ${context.raw}페이지`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category" as const,
        ticks: {
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: "linear" as const,
        beginAtZero: true,
        max: userBook.book.totalPages,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: function (
            this: Scale<CoreScaleOptions>,
            tickValue: number | string
          ) {
            return `${tickValue}`;
          },
        },
      },
    },
  };

  return (
    <div
      css={css`
        height: 200px;
        padding: 16px;
        background: white;
        border-radius: 8px;
      `}
    >
      <Line data={data} options={options} />
    </div>
  );
}
