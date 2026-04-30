type QuantitySelectorProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QuantitySelector({ quantity, onDecrease, onIncrease }: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center border border-gray-300">
      <button
        type="button"
        onClick={onDecrease}
        className="h-10 w-10 text-lg text-gray-700 hover:bg-gray-100"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="flex h-10 min-w-12 items-center justify-center border-x border-gray-300 text-sm text-gray-900">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="h-10 w-10 text-lg text-gray-700 hover:bg-gray-100"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
