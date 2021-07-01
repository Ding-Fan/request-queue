import React, { ReactElement } from "react";

export default function Container(props: {
  left: ReactElement;
  right: ReactElement;
}) {
  return (
    <div className="container mx-auto">
      <div className="flex h-screen p-10 ">
        {props.left}
        {props.right}
      </div>
    </div>
  );
}
