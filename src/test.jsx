import React, { useEffect, useState } from "react";

const Test = (props) => {
  const [state] = useState(
    window.localStorage.getItem("token") != "undefined" &&
      JSON.parse(window.localStorage.getItem("token"))
  );
  const [state2] = useState();
  useEffect(() => {
    if (window.localStorage.getItem("token") != "undefined") console.log("H");
    console.log(window.localStorage);
    console.log(state);
    console.log(state2);
  }, []);
  return (
    <div>
      <div>1</div>
    </div>
  );
};

export default Test;
