import { SetStateAction } from "react";

interface IPropsCounter {
  value: number;
  min?: number;
  max?: number;
  onChangeCount: (value: SetStateAction<number>) => void;
  className?: string;
}
export const Counter: React.FC<IPropsCounter> = ({
  value,
  min = 1,
  max = 5,
  onChangeCount,
  className = "",
}) => {
  function handleCount(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    const inputValueParsed = parseInt(inputValue);
    if (
      inputValue &&
      !inputValue.includes("e") &&
      inputValueParsed > min - 1 &&
      inputValueParsed < max + 1
    )
      onChangeCount(inputValueParsed);
  }

  function incrementCount() {
    onChangeCount((prev) => (prev + 1 < max + 1 ? prev + 1 : prev));
  }

  function decrementCount() {
    onChangeCount((prev) => (prev - 1 > min - 1 ? prev - 1 : prev));
  }

  return (
    <div className={"flex border rounded-xl " + className}>
      <button
        type="button"
        onClick={decrementCount}
        className="text-xl btn aspect-square"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={handleCount}
        className="w-full text-center input remove-arrow"
      />
      <button
        type="button"
        onClick={incrementCount}
        className="text-xl btn aspect-square"
      >
        +
      </button>
    </div>
  );
};
