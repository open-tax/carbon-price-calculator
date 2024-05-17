import React, { useEffect, useState } from "react";
import { InputTabs } from "./InputTabs";
import { Graph } from "./Graph";
import { getTransferData } from "../api/formData";
import { IncomeQuintile } from "../types/formData";
import { GraphResults } from "./Results";
import { Box, Divider } from "@mui/material";

export function Calculator() {
  const [province, setProvince] = useState("");
  const [quintile, setQuintile] = useState<IncomeQuintile>("q1");
  const [data, setData] = useState<number[]>([0]);

  useEffect(() => {
    getTransferData(province, quintile).then((res) => {
      if (res) {
        setData(res);
      }
    });
  }, [quintile, province]);

  return (
    <div className="w-screen h-screen bg-gray-200 relative">
      <Box className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex gap-2 flex-row opacity-75 hover:opacity-100 bg-gray-200 shadow-xl w-max p-4 rounded-lg text-gray-900">
        <InputTabs
          province={province}
          setProvince={setProvince}
          quintile={quintile}
          setQuintile={setQuintile}
        />
        <Divider orientation="vertical" flexItem />
        <GraphResults data={data} />
      </Box>
      {data ? <Graph data={data} /> : <></>}
    </div>
  );
}
