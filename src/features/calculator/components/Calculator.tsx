import React, { useEffect, useState } from "react";
import { Graph } from "./Graph";
import { getTransferData } from "../api/formData";
import { IncomeQuintile } from "../types/formData";
import { Box } from "@mui/material";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import SimplePanel from "./panels/SimplePanel";

export function Calculator() {
  const [province, setProvince] = useState("");
  const [quintile, setQuintile] = useState<IncomeQuintile>("q1");
  const [useEconomicImpact, setUseEconomicImpact] = useState(false);
  const [data, setData] = useState<number[]>([0]);

  useEffect(() => {
    getTransferData(province, quintile, useEconomicImpact).then((res) => {
      if (res) {
        setData(res);
      }
    });
  }, [quintile, province, useEconomicImpact]);

  return (
    <div className="w-screen h-screen bg-gray-200 md:relative">
      {data ? <Graph data={data} /> : <></>}
      <Box className="border-none md:absolute md:top-1/2 md:left-1/2 z-20 md:-translate-x-1/2 md:-translate-y-1/2 flex gap-2 flex-col md:flex-row md:opacity-75 hover:opacity-100 bg-gray-200 md:shadow-xl md:w-7/12 w-full p-4 rounded-lg text-gray-900">
        <TabGroup>
          <TabList className="flex gap-4">
            <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold outline-none data-[selected]:underline data-[selected]:data-[hover]:underline">
              Simple
            </Tab>
            <Tab
              disabled
              className="rounded-full py-1 px-3 text-sm/6 font-semibold outline-none data-[selected]:underline data-[selected]:data-[hover]:underline"
            >
              Detailed (coming soon)
            </Tab>
          </TabList>
          <TabPanels className="mt-3">
            <SimplePanel
              province={province}
              setProvince={setProvince}
              quintile={quintile}
              setQuintile={setQuintile}
              useEconomicImpact={useEconomicImpact}
              toggleUseEconomicImpact={() =>
                setUseEconomicImpact((prev) => !prev)
              }
              data={data}
            />
          </TabPanels>
        </TabGroup>
      </Box>
    </div>
  );
}
