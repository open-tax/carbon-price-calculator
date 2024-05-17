import { GraphData, IncomeQuintile, SimpleFormResult } from "../types/formData";

const hardcodedData: Record<string, Record<IncomeQuintile, GraphData>> = {
  mb: {
    q1: {
      costs: [274, 454, 507, 552, 590, 622, 658, 689],
      years: ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"],
    },
    q2: {
      years: ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"],
      costs: [-274, -454, -507, -552, -590, -622, -658, -689],
    },
    q3: {
      years: ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"],
      costs: [-274, -454, -507, -552, -590, -622, -658, -689],
    },
    q4: {
      years: ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"],
      costs: [-274, -454, -507, -552, -590, -622, -658, -689],
    },
    q5: {
      years: ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"],
      costs: [-274, -454, -507, -552, -590, -622, -658, -689],
    },
  },
};

export const graphDataFromSimpleForm = async (
  input: SimpleFormResult,
): Promise<GraphData> => {
  return hardcodedData[input.province][input.quintile];
};
