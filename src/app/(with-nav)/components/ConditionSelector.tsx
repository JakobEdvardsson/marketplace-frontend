import { ProductCondition } from "@/utils/api-call-types";

export default function ConditionSelector(props: {
  readonly setCondition: (_: ProductCondition | null) => void;
  readonly condition: ProductCondition | null;
}) {
  const handleChange = (event: any) => {
    const newCondition = parseInt(event.target.value, 10) as ProductCondition;
    if (props.condition?.valueOf() === newCondition.valueOf()) {
      props.setCondition(null);
      return;
    }

    props.setCondition(newCondition);
  };

  return (
    <form className="mb-2 flex flex-wrap items-center justify-around">
      {Object.values(ProductCondition)
        .filter((value) => typeof value === "number")
        .map((condition) => (
          <div key={condition} className="m-1 rounded bg-gray-200 p-1">
            <label>
              <input
                className="mr-1"
                type="radio"
                value={condition}
                checked={props.condition === condition}
                onClick={handleChange}
              />
              {ProductCondition[condition as keyof typeof ProductCondition]
                .toString()
                .replace(/_/g, " ")
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </label>
          </div>
        ))}
    </form>
  );
}
