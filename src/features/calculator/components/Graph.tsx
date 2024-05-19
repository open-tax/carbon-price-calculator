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
      }).format(v)
    : "";

export function Graph(props: GraphProps) {
  useEffect(() => console.log("Whats", props.data), [props.data]);

  return (
    <div className="h-1/2 md:absolute md:top-0 md:left-0 w-screen md:h-screen z-10">
      <LineChart
        colors={cheerfulFiestaPalette}
        series={[{ data: props.data, valueFormatter: currencyFormatter }]}
        xAxis={[
          {
            data: [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
            valueFormatter: (v) =>
              `${v.toString()}/${((v + 1) % 100).toString()}`,
          },
        ]}
      />
    </div>
  );
}
