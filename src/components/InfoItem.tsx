import React from "react";

interface IProps {
  text: string;
}

export default function InfoItem({ text }: IProps) {
  return <div className="text-xl mb-4">{text}</div>;
}
