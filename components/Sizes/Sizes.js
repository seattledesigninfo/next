import { SIZES } from "../../lib/helpers";
import { useState, useDispatch } from "../../contexts/SizeContext";

import Checkbox from "../Checkbox";

const Sizes = () => {
  const sizes = useState();
  const dispatch = useDispatch();

  return (
    <form>
      <h6>Size</h6>
      {SIZES.map((size, index) => {
        const dispatchType = sizes.includes(size) ? "DESELECT" : "SELECT";

        return (
          <Checkbox
            onChange={(event) => {
              dispatch({ type: dispatchType, payload: size });
            }}
            key={`${size}-${index}`}
            index={index}
            value={size}
            name="sizes"
            checked={sizes.includes(size)}
          />
        );
      })}
    </form>
  );
};

export default Sizes;
