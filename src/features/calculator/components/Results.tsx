import React, { useCallback } from "react";

export type GraphResultProps = {
  data: number[];
};

export function GraphResults(props: GraphResultProps) {
  const getSum = useCallback(
    () => props.data.reduce((total, curr) => total + curr, 0),
    [props.data],
  );

  const getFirstNegativeYearText = useCallback(() => {
    const index = props.data.findIndex((element) => element < 0);
    if (index < 0) {
      return (
        <p>Carbon pricing will always be a net economic benefit for you</p>
      );
    } else if (index < 1) {
      return <p>Carbon pricing will never be a net economic benefit for you</p>;
    } else {
      return (
        <p>
          Carbon pricing is a net economic benefit for you until <br />
          <span className="ml-2 text-lg font-semibold">May {2023 + index}</span>
        </p>
      );
    }
  }, [props.data]);

  return (
    <div>
      <h2>What the tax means for you:</h2>
      <p>
        Carbon pricing will {getSum() >= 0 ? "earn" : "cost"} you <br />
        <span className="ml-2 text-lg font-semibold">${getSum()}</span>
      </p>
      {getFirstNegativeYearText()}
      <p className="text-xs font-thin">
        This estimate accounts for both direct and indirect gains/losses
      </p>
    </div>
  );
}
