import React from "react";

function Divider({ centerText }) {
  return <div className="divider">{centerText || ""}</div>;
}

export default Divider;
