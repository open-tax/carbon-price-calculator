import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export type GraphProps = {
  data: number[];
};

export function Graph(props: GraphProps) {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-10">
      <BarChart
        series={[{ data: props.data }]}
        xAxis={[
          {
            data: [
              "2023/24",
              "2024/25",
              "2025/26",
              "2026/27",
              "2027/28",
              "2028/29",
              "2029/30",
              "2030/31",
            ],
            scaleType: "band",
          },
        ]}
        sx={{
          "& .MuiLineElement-root": {
            strokeDasharray: "10 5",
            strokeWidth: 4,
          },
        }}
        margin={{ left: 0, right: 0, bottom: 0, top: 0 }}
      />
    </div>
  );
}
