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
      <Box className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex gap-2 flex-col md:flex-row opacity-75 hover:opacity-100 bg-gray-200 shadow-xl md:w-7/12 w-11/12 p-4 rounded-lg text-gray-900">
        <TabGroup>
          <TabList className="flex gap-4">
            <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none data-[selected]:bg-white/20 data-[hover]:bg-white/10 data-[selected]:data-[hover]:bg-white/20 data-[focus]:outline-1 data-[focus]:outline-white">
              Simple
            </Tab>
            <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none data-[selected]:bg-white/20 data-[hover]:bg-white/10 data-[selected]:data-[hover]:bg-white/20 data-[focus]:outline-1 data-[focus]:outline-white">
              Detailed (coming soon)
            </Tab>
          </TabList>
          <TabPanels className="mt-3">
            <SimplePanel
              province={province}
              setProvince={setProvince}
              quintile={quintile}
              setQuintile={setQuintile}
              data={data}
            />
          </TabPanels>
        </TabGroup>
      </Box>
      {data ? <Graph data={data} /> : <></>}
    </div>
  );
}
