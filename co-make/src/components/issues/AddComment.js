import React, { useState } from "react";

const AddComment = () => {
  const [input, setInput] = useState({ text: "" });
  return (
    <form>
      <input value={input.text} />
      <button>submit</button>
    </form>
  );
};

export default AddComment;
