import { useSizeState, useSizeDispatch } from "../../contexts/SizeContext";

import Checkbox from "../Checkbox";

const Sizes = () => {
  const { sizes, active } = useSizeState();
  const dispatch = useSizeDispatch();

  return (
    <form>
      <h6>Size</h6>
      {sizes.map((size, index) => {
        const dispatchType = active.includes(size) ? "DESELECT" : "SELECT";

        return (
          <Checkbox
            onChange={() => {
              dispatch({ type: dispatchType, payload: size });
            }}
            key={`${size}-${index}`}
            index={index}
            value={size}
            name="sizes"
            checked={active.includes(size)}
          />
        );
      })}
    </form>
  );
};

export default Sizes;
