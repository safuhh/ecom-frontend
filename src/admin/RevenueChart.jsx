import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { getMonthlyRevenue } from "../api/adminApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const RevenueChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMonthlyRevenue().then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data.length) return null;

  const labels = data.map((item) => item.month);
  const values = data.map((item) => item.total);

  const totalRevenue = values.reduce((a, b) => a + b, 0);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: "#020617", // premium near-black
        borderWidth: 2,
        tension: 0.45,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 6,
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          if (!chart.chartArea) return;
          const gradient = chart.ctx.createLinearGradient(
            0,
            chart.chartArea.top,
            0,
            chart.chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(2,6,23,0.15)");
          gradient.addColorStop(1, "rgba(2,6,23,0)");
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#020617",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (ctx) => `₹${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 10 },
          color: "#64748b",
        },
      },
      y: {
        grid: { color: "#f1f5f9" },
        ticks: {
          font: { size: 10 },
          color: "#64748b",
          callback: (v) => `₹${v / 1000}k`,
        },
      },
    },
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
          Monthly Revenue
        </p>
        <h3 className="text-2xl font-semibold text-slate-900">
          ₹{totalRevenue.toLocaleString()}
        </h3>
      </div>

      {/* SMALL CHART */}
      <div className="h-[160px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
