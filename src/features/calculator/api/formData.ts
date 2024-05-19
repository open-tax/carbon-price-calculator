import { forceType } from "../../../utils/typeGuard";
import { IncomeQuintile, JsonData, Province } from "../types/formData";

const forceJsonData = (input: unknown): input is JsonData => {
  if (!Array.isArray(input)) {
    return false;
  }
  const expectedProperties = [
    "province",
    "quintiles",
    "netEconomicImpact",
    "netFiscalImpact",
  ];
  return input.every((element) => {
    for (const prop of expectedProperties) {
      if (!input.every((element) => Object.hasOwn(element, prop))) {
        console.log("bad", input, prop);
        return false;
      }
    }
    return true;
  });
};

export const getProvinces = async () =>
  fetch("provinces.json")
    .then((res) => res.json())
    .then(forceType(forceJsonData))
    .then((data) => data?.map(({ province }) => province))
    .catch((err) => {
      console.log("An unexpected error occurred: ", err);
      return undefined;
    });

export const getQuintiles = async (provCode: Province["code"]) =>
  fetch("provinces.json")
    .then((res) => res.json())
    .then(forceType(forceJsonData))
    .then((data) => data?.find((element) => element.province.code === provCode))
    .then((result) => result?.quintiles)
    .catch((err) => {
      console.log("An unexpected error occurred:", err);
      return undefined;
    });

export const getTransferData = async (
  provCode: Province["code"],
  quintile: IncomeQuintile,
  useEconomicImpact = false,
) =>
  fetch("provinces.json")
    .then((res) => res.json())
    .then(forceType(forceJsonData))
    .then((data) => data?.find((element) => element.province.code === provCode))
    .then((result) =>
      useEconomicImpact
        ? result?.netEconomicImpact[quintile]
        : result?.netFiscalImpact[quintile],
    )
    .catch((err) => {
      console.log("An unexpected error occurred:", err);
      return undefined;
    });
