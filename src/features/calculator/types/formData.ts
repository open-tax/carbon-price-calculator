export type IncomeQuintile = `q${1 | 2 | 3 | 4 | 5}`;
export type Province = { name: string; code: string };
export type QuintileData = Record<IncomeQuintile, [number, number]>;

export type JsonData = {
  province: Province;
  quintiles: QuintileData;
  netTransfer: Record<IncomeQuintile, number[]>;
}[];

export type SimpleFormData = {
  provinces: { name: string; code: string }[];
  incomeRanges: {
    min: number;
    max: number;
    quintile: IncomeQuintile;
  }[];
};

export type SimpleFormResult = {
  province: string;
  quintile: IncomeQuintile;
};

export type GraphData = {
  years: string[];
  costs: number[];
};
