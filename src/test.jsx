import React, { useEffect, useState } from "react";

const Test = (props) => {
  useEffect(() => {
    const date = new Date();
    console.log(date);
    const date2 = new Date(date);
    console.log(date2);
  });
  return (
    <div>
      <div>d</div>
    </div>
  );
};

export default Test;
