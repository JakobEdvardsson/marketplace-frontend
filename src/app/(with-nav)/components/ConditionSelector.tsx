import { ProductCondition } from "@/utils/api-call-types";

export default function ConditionSelector(props: {
  readonly setCondition: (_: ProductCondition | null) => void;
  readonly condition: ProductCondition | null;
}) {
  const handleChange = (event: any) => {
    if (event.target.value === "-1") {
      props.setCondition(null);
      return;
    }

    const newCondition = parseInt(event.target.value, 10) as ProductCondition;
    if (props.condition?.valueOf() === newCondition.valueOf()) {
      props.setCondition(null);
      return;
    }

    props.setCondition(newCondition);
  };

  return (
    <select
      className="w-full rounded-md p-2.5"
      value={props.condition === null ? -1 : props.condition.valueOf()}
      onChange={handleChange}
    >
      <option key="default" value={-1}>
        Select condition
      </option>
      {Object.values(ProductCondition)
        .filter((value) => typeof value === "number")
        .map((condition) => (
          <option key={condition} value={condition}>
            {ProductCondition[condition as keyof typeof ProductCondition]
              .toString()
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </option>
        ))}
    </select>
  );
}
