"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function FinancePage() {
  const revenueRef = useRef<HTMLCanvasElement | null>(null);
  const profitRef = useRef<HTMLCanvasElement | null>(null);
  const combinedRef = useRef<HTMLCanvasElement | null>(null);
  const chartsRef = useRef<any[]>([]);
  const [chartReady, setChartReady] = useState(false);
  const [pluginReady, setPluginReady] = useState(false);

  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: "easeOut" },
  } as const;

  function AnimatedCounter({
    value,
    decimals = 0,
    prefix = "",
    suffix = "",
    className,
  }: { value: number; decimals?: number; prefix?: string; suffix?: string; className?: string }) {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
      let raf: number | null = null;
      const start = performance.now();
      const dur = 900;
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const ease = 1 - Math.pow(1 - p, 3);
        setDisplay(value * ease);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => raf && cancelAnimationFrame(raf);
    }, [value]);
    return <span className={className}>{`${prefix}${display.toFixed(decimals)}${suffix}`}</span>;
  }

  const initCharts = () => {
    // @ts-ignore
    const Chart = (window as any).Chart;
    // @ts-ignore
    const ChartDataLabels = (window as any).ChartDataLabels;
    if (!Chart) return;
    if (ChartDataLabels) {
      try {
        // Register once safely
        // @ts-ignore
        if (!Chart.registry.plugins.get('datalabels')) {
          Chart.register(ChartDataLabels);
        }
      } catch (e) {
        // no-op
      }
    }
    chartsRef.current.forEach((c) => c && c.destroy && c.destroy());
    chartsRef.current = [];

    const revenueCtx = revenueRef.current?.getContext("2d");
    const profitCtx = profitRef.current?.getContext("2d");
    const combinedCtx = combinedRef.current?.getContext("2d");

    if (revenueCtx) {
      const c = new Chart(revenueCtx, {
        type: "bar",
        data: {
          labels: ["FY19", "FY20", "FY21", "FY22", "FY23", "FY24"],
          datasets: [
            {
              label: "Revenue (₹ Cr)",
              data: [15.1, 8.57, 12.55, 19.27, 27.67, 48.72],
              backgroundColor: "#f97316",
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          animation: { duration: 900, easing: "easeOutQuart" },
          layout: { padding: { top: 16 } },
          plugins: {
            legend: { display: false },
            // @ts-ignore
            datalabels: {
              color: "#0b1e3f",
              anchor: "end",
              align: "top",
              offset: 2,
              font: { weight: "bold" },
              // @ts-ignore
              formatter: (v: number) => `₹${v} Cr`,
            },
          },
          scales: {
            y: {
              ticks: {
                // @ts-ignore
                callback: (value: number) => `₹${value} Cr`,
              },
              grid: { color: "#E8EEF6" },
            },
            x: { grid: { display: false } },
          },
        },
      });
      chartsRef.current.push(c);
    }

    if (profitCtx) {
      const c = new Chart(profitCtx, {
        type: "bar",
        data: {
          labels: ["FY19", "FY20", "FY21", "FY22", "FY23", "FY24"],
          datasets: [
            {
              label: "Net Profit (₹ Cr)",
              data: [1.23, 0.85, 0.89, 1.22, 1.82, 5.07],
              backgroundColor: "#9ca3af",
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          animation: { duration: 900, easing: "easeOutQuart" },
          layout: { padding: { top: 16 } },
          plugins: {
            legend: { display: false },
            // @ts-ignore
            datalabels: {
              color: "#0b1e3f",
              anchor: "end",
              align: "top",
              offset: 2,
              font: { weight: "bold" },
              // @ts-ignore
              formatter: (v: number) => `₹${v} Cr`,
            },
          },
          scales: { x: { grid: { display: false } }, y: { grid: { color: "#E8EEF6" } } },
        },
      });
      chartsRef.current.push(c);
    }

    if (combinedCtx) {
      const c = new Chart(combinedCtx, {
        type: "line",
        data: {
          labels: ["FY19", "FY20", "FY21", "FY22", "FY23", "FY24"],
          datasets: [
            {
              label: "Revenue (₹ Cr)",
              data: [15.1, 8.57, 12.55, 19.27, 27.67, 48.72],
              borderColor: "#f97316",
              backgroundColor: "#f97316",
              tension: 0.35,
              fill: false,
            },
            {
              label: "Net Profit (₹ Cr)",
              data: [1.23, 0.85, 0.89, 1.22, 1.82, 5.07],
              borderColor: "#2563eb",
              backgroundColor: "#2563eb",
              tension: 0.35,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          animation: { duration: 900, easing: "easeOutQuart" },
          plugins: {
            legend: { position: "bottom" },
            // explicitly disable data labels on the combined chart
            // @ts-ignore
            datalabels: { display: false },
          },
        },
      });
      chartsRef.current.push(c);
    }
  };

  useEffect(() => {
    if (chartReady && pluginReady) initCharts();
    return () => {
      chartsRef.current.forEach((c) => c && c.destroy && c.destroy());
      chartsRef.current = [];
    };
  }, [chartReady, pluginReady]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 pb-24 pt-12 sm:px-10">
      {/* Heading */}
      <motion.header {...fadeUp}>
        <div className="flex items-center gap-3 text-[#0b1e3f]">
          <span className="h-[3px] w-14 rounded-full bg-[var(--bbd-accent)]" aria-hidden></span>
          <span className="text-base font-semibold uppercase tracking-[0.21em] sm:text-lg">Financial Performance</span>
        </div>
        <h1 className="mt-1 text-3xl font-bold text-[#0b1e3f] sm:text-4xl">Accelerated Growth and Robust Financial Health</h1>
        <p className="mt-5 max-w-4xl text-[#405170]">
          Our disciplined execution and strategic focus on high margin infrastructure sectors have delivered consistent financial growth,
          positioning BBD Infra as a stable and scalable enterprise.
        </p>
      </motion.header>

      {/* Highlights */}
      <motion.section {...fadeUp} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div whileHover={{ y: -4 }} className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#405170]">Work in Hand</h3>
          <p className="mt-2 text-2xl font-bold text-[#0b3d91]"><AnimatedCounter value={800} prefix="₹" suffix="+ Cr" /></p>
          <p className="text-sm text-[#405170]">62 ongoing projects</p>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#405170]">FY24 Revenue</h3>
          <p className="mt-2 text-2xl font-bold text-[#f97316]"><AnimatedCounter value={48.72} decimals={2} prefix="₹" suffix=" Cr" /></p>
          <p className="text-sm text-[#405170]">Highest annual revenue</p>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#405170]">Avg EBITDA Margin</h3>
          <p className="mt-2 text-2xl font-bold text-green-600">~<AnimatedCounter value={18} suffix="%" /></p>
          <p className="text-sm text-[#405170]">Optimized execution</p>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#405170]">FY24 Net Profit</h3>
          <p className="mt-2 text-2xl font-bold text-[#0b1e3f]"><AnimatedCounter value={5.07} decimals={2} prefix="₹" suffix=" Cr" /></p>
          <p className="text-sm text-[#405170]">Strong margin expansion</p>
        </motion.div>
      </motion.section>

      {/* Charts */}
      <motion.section {...fadeUp} className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-2 text-lg font-semibold text-[#0b1e3f]">Revenue Growth (FY19–FY24)</h2>
        <canvas ref={revenueRef} className="mt-2" />
      </motion.section>

      <motion.section {...fadeUp} className="grid gap-6 sm:grid-cols-2">
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 18 }} transition={{ duration: 0.6 }} className="rounded-2xl bg-white p-6 shadow">
          <h3 className="mb-2 text-lg font-semibold text-[#0b1e3f]">Net Profit (FY19–FY24)</h3>
          <canvas ref={profitRef} className="mt-2" />
        </motion.div>
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 18 }} transition={{ duration: 0.6, delay: 0.08 }} className="rounded-2xl bg-white p-6 shadow">
          <h3 className="mb-2 text-lg font-semibold text-[#0b1e3f]">Revenue vs Net Profit</h3>
          <canvas ref={combinedRef} className="mt-2" />
        </motion.div>
      </motion.section>

      {/* Key Contributors — removed per request */}

      {/* Investor-Grade Summary */}
      <motion.section {...fadeUp} className="rounded-2xl bg-[#0B3D91] p-8 text-white">
        <h2 className="text-xl font-semibold">Financial Strength and Capital Discipline</h2>
        <p className="mt-2 text-white/90">
          BBD Infra demonstrates strong financial resilience supported by a ₹800+ Crore order book, consistent EBITDA margins 18%, and disciplined
          capital deployment. Our robust cash flow position enables us to bid for mega infrastructure projects while meeting performance guarantees
          without dependence on external capital markets.
        </p>
      </motion.section>

      <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="afterInteractive" onLoad={() => setChartReady(true)} />
      <Script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels" strategy="afterInteractive" onLoad={() => setPluginReady(true)} />
    </div>
  );
}
