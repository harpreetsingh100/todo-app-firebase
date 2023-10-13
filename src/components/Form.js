import React from "react";
import AddIcon from "@mui/icons-material/Add";

const Form = () => {
  return (
    <div>
      <form>
        <input type="text" placeholder="Add TODO" />
        <button className="">
          <AddIcon />
        </button>
      </form>
    </div>
  );
};

export default Form;
