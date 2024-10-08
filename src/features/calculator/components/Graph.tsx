import React, { useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { cheerfulFiestaPalette } from "@mui/x-charts/colorPalettes";

export type GraphProps = {
  data: number[];
};

const currencyFormatter = (v: number | null) =>
  v !== null
    ? Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "CAD",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      })
        .format(v)
        .replaceAll(",", "")
    : "";

export function Graph(props: GraphProps) {
  return (
    <div className="h-1/2 md:absolute md:top-0 md:left-0 w-screen md:h-screen z-10">
      <LineChart
        colors={cheerfulFiestaPalette}
        series={[
          {
            data: props.data,
            valueFormatter: currencyFormatter,
            area: true,
          },
        ]}
        xAxis={[
          {
            data: [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
            valueFormatter: (v) => (v % 1 === 0 ? `${v.toString()}` : ""),
          },
        ]}
        yAxis={[{ valueFormatter: currencyFormatter }]}
        sx={{
          // "& .MuiMarkElement-root": {
          //   fill: "#00a200",
          // },
          "& .MuiLineElement-root": {
            stroke: "#00a200",
          },
          "& .MuiAreaElement-root": {
            fill: "url(#areaGradient)",
          },
        }}
      >
        <defs>
          <linearGradient id="areaGradient" gradientTransform="rotate(90)">
            <stop stopColor="#004000" offset="100" />
            <stop stopColor="#00a200" opacity="0.8" offset="0" />
          </linearGradient>
        </defs>
      </LineChart>
    </div>
  );
}
