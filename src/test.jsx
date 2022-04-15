import React, { useEffect, useState } from "react";

const Test = (props) => {
  const user = {
    email: "xo0643",
    name: "YTY",
    image: "png",
    img: "jpg",
  };
  const test = [];
  console.log(test.length);
  useEffect(() => {
    console.log(...Object.entries(user));
  });
  return (
    <div>
      <div>d</div>
    </div>
  );
};

export default Test;
