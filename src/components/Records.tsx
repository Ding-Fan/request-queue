import { useAtom } from "jotai";
import React from "react";
import { addInfoAtom, requestQueue } from "../state/index";
import { filteredRecordListAtom } from "../state/index";
export default function Records() {
  const [filteredRecordList] = useAtom(filteredRecordListAtom);

  const [, addInfo] = useAtom(addInfoAtom);
  const handleCancel = (record: MyLib.RecordItem) => {
    requestQueue.cancel(record.id);

    addInfo(`request ${record.title}, id ${record.id} was canceled`);
  };
  return (
    <div className="text-lg text-textPrimary">
      {filteredRecordList.map((record) => {
        console.log("record", record);

        return (
          <li className="flex ml-4 justify-between" key={record.id}>
            {record.title}
            <span className="mr-4" onClick={() => handleCancel(record)}>
              CANCEL
            </span>
          </li>
        );
      })}
    </div>
  );
}
