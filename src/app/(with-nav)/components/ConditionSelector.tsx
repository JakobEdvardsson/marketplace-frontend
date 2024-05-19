import { ProductCondition } from "@/utils/api-call-types";
import React, { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";

export default function ConditionSelector(props: {
  readonly setCondition: (_: ProductCondition | null) => void;
  readonly condition: ProductCondition | null;
}) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10) as ProductCondition;
    props.setCondition(value);
  };

  const reset = () => {
    props.setCondition(null);
  };

  return (
    <form className="mb-2 flex flex-wrap items-center justify-around">
      {Object.values(ProductCondition)
        .filter((value) => typeof value === "number")
        .map((value) => (
          <div key={value} className="m-1 rounded bg-gray-200 p-1">
            <label>
              <input
                className="mr-1"
                type="radio"
                value={value}
                checked={props.condition === value}
                onChange={handleChange}
              />
              {ProductCondition[value as keyof typeof ProductCondition]
                .toString()
                .replace(/_/g, " ")
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </label>
          </div>
        ))}
      <Button type="button" className="mx-2 bg-red-500" onClick={reset}>
        Reset
      </Button>
    </form>
  );
}
