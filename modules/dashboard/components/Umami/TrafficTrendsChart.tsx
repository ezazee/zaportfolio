"use client";

import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { format, parseISO } from "date-fns";
import { useTranslations } from "next-intl";
import { PiChartBarBold as BarIcon, PiChartLineUpBold as LineIcon } from "react-icons/pi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface DataPoint {
  x: string;
  y: number;
}

interface DataProps {
  data: {
    pageviews: DataPoint[];
    sessions: DataPoint[];
  };
}

type ChartType = "bar" | "line";

const TrafficTrendsChart = ({ data }: DataProps) => {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const t = useTranslations("DashboardPage.umami");

  const rawLabels = data?.pageviews?.map((point) => point.x) || [];
  const labels = rawLabels.map((isoDate) => format(parseISO(isoDate), "MMM"));

  const sessionsData = data?.sessions?.map((point) => point.y) || [];
  const pageviewsData = data?.pageviews?.map((point) => point.y) || [];

  const commonDatasets = [
    {
      label: "Sesi",
      data: sessionsData,
      backgroundColor: chartType === "bar" ? "rgba(255, 255, 184, 0.7)" : "rgba(255, 255, 184, 0.3)",
      borderColor: "rgba(255, 255, 184, 1)",
      borderWidth: chartType === "line" ? 2 : 0,
      stack: "traffic",
      borderRadius: chartType === "bar" ? 4 : 0,
      fill: chartType === "line",
      tension: 0.4,
      pointRadius: chartType === "line" ? 3 : 0,
    },
    {
      label: "Tampilan Halaman",
      data: pageviewsData,
      backgroundColor: chartType === "bar" ? "rgba(251, 228, 0, 0.85)" : "rgba(251, 228, 0, 0.3)",
      borderColor: "rgba(251, 228, 0, 1)",
      borderWidth: chartType === "line" ? 2 : 0,
      stack: "traffic",
      borderRadius: chartType === "bar" ? 4 : 0,
      fill: chartType === "line",
      tension: 0.4,
      pointRadius: chartType === "line" ? 3 : 0,
    },
  ];

  const chartData = { labels, datasets: commonDatasets };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          color: "#a3a3a3",
          font: { size: 12 },
        },
      },
      title: { display: false },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => {
            const index = tooltipItems[0].dataIndex;
            const isoDate = rawLabels[index];
            return isoDate ? format(parseISO(isoDate), "MMM yyyy") : "";
          },
        },
      },
    },
    scales: {
      x: {
        stacked: chartType === "bar",
        grid: { display: false },
        ticks: { color: "#a3a3a3" },
      },
      y: {
        stacked: chartType === "bar",
        beginAtZero: true,
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#a3a3a3" },
      },
    },
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {t("traffic_trends")}
        </span>
        <div className="flex items-center gap-1 rounded-lg border border-neutral-200 p-1 dark:border-neutral-800">
          <button
            onClick={() => setChartType("bar")}
            className={`rounded-md p-1.5 transition ${
              chartType === "bar"
                ? "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-white"
                : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            }`}
            title="Bar Chart"
          >
            <BarIcon size={14} />
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`rounded-md p-1.5 transition ${
              chartType === "line"
                ? "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-white"
                : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            }`}
            title="Line Chart"
          >
            <LineIcon size={14} />
          </button>
        </div>
      </div>

      <div className="h-[250px] w-full md:h-[400px]">
        {chartType === "bar" ? (
          <Bar data={chartData} options={commonOptions as ChartOptions<"bar">} />
        ) : (
          <Line data={chartData} options={commonOptions as ChartOptions<"line">} />
        )}
      </div>
    </div>
  );
};

export default TrafficTrendsChart;
