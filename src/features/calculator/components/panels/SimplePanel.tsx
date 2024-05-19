import {
  Description,
  Field,
  Label,
  Select,
  Switch,
  TabPanel,
} from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { IncomeQuintile, Province, QuintileData } from "../../types/formData";
import { getProvinces, getQuintiles } from "../../api/formData";
import { Box, Divider } from "@mui/material";
import { GraphResults } from "../Results";

export type SimplePanelProps = {
  province: string;
  quintile: string;
  useEconomicImpact: boolean;
  setProvince: (p: string) => void;
  setQuintile: (q: IncomeQuintile) => void;
  toggleUseEconomicImpact: () => void;
  data: number[];
};

function SimplePanel(props: SimplePanelProps) {
  const [provinces, setProvinces] = useState<Province[] | undefined>();
  const [quintiles, setQuintiles] = useState<QuintileData | undefined>();

  useEffect(() => {
    getProvinces().then(setProvinces);
  }, []);

  useEffect(() => {
    getQuintiles(props.province).then(setQuintiles);
  }, [props.province]);

  const handleProvinceChange = (event: any) => {
    props.setProvince(event.target.value);
  };

  return (
    <TabPanel className="rounded-xl bg-white/10 p-3 flex gap-4 md:flex-row flex-col">
      <Box className="md:w-8/12">
        <h2 className="text-lg font-semibold">
          Please fill out the following fields:
        </h2>
        <Field>
          <Label className="text-md font-medium text-gray-800">
            Of which province are you a resident?
          </Label>
          <Description className="text-sm text-gray-800/50">
            The payment you receive varies by province. <br /> Only backstop
            provinces are available at the moment
          </Description>
          <Select
            className="bg-gray-100 rounded-lg border-none w-full p-2"
            value={props.province}
            onChange={handleProvinceChange}
          >
            <option disabled selected value="">
              {" "}
              -- select an option --{" "}
            </option>
            {provinces &&
              provinces.map((prov) => (
                <option value={prov.code} key={prov.code}>
                  {prov.name}
                </option>
              ))}
          </Select>
        </Field>
        <Field>
          <Label className="text-md font-medium text-gray-800">
            In what range is your total household income?
          </Label>
          <Description className="text-sm text-gray-800/50">
            The PBO offers estimates of net impact over time based on income
            levels
          </Description>
          <Select
            className="bg-gray-100 rounded-lg border-none w-full p-2"
            value={props.quintile}
            onChange={(e) =>
              props.setQuintile(e.target.value as IncomeQuintile)
            }
          >
            {quintiles ? (
              Object.entries(quintiles).map(([q, [min, max]]) => (
                <option value={q} key={q}>
                  {max ? `${min} - ${max}` : `${min}+`}
                </option>
              ))
            ) : (
              <></>
            )}
          </Select>
        </Field>
        <Field>
          <Label className="text-md font-medium text-gray-800">
            Account for economic (indirect) impacts?
          </Label>
          <Description className="text-sm text-gray-800/50">
            These are indirect costs, including loss of employment and
            investment
          </Description>
          <Switch
            checked={props.useEconomicImpact}
            onChange={props.toggleUseEconomicImpact}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
        </Field>
      </Box>
      <Divider className="md:visible" orientation="vertical" flexItem />
      <Divider
        className="md:hidden visible"
        orientation="horizontal"
        flexItem
      />
      <GraphResults
        data={props.data}
        useEconomicImpact={props.useEconomicImpact}
      />
    </TabPanel>
  );
}

export default SimplePanel;
