import React from "react";
import { useAtom } from "jotai";
import { infoListAtom } from "../state/index";
import InfoItem from "./InfoItem";
import uniqueId from "lodash/uniqueId";

export default function InfoPanel() {
  const [infoList] = useAtom(infoListAtom);
  return (
    <div className="bg-infoPanelBg h-full overflow-auto h-auto text-xl">
      {infoList.map((item) => (
        // should use static id refer to item
        <InfoItem text={item} key={uniqueId()} />
      ))}
    </div>
  );
}
