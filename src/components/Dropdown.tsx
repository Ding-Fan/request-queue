import React from "react";
import Records from "./Records";
import Input from "./Input";
import Button from "./Button";
import { useAtom } from "jotai";
import {
  removeRecordAtom,
  textAtom,
  addRecordAtom,
  requestQueue,
} from "../state/index";

export default function Dropdown() {

  const [text] = useAtom(textAtom);
  const [, setAddRecord] = useAtom(addRecordAtom);
  const [, setRemoveRecord] = useAtom(removeRecordAtom);

  const handleClickAdd = () => {
    console.log("text", text);
    if (!text) {
      return;
    }
    setAddRecord({
      title: text,
      request: async () => {
        try {
          const response: any = await fetch("https://v1.hitokoto.cn");

          return response.json();
        } catch (error) {}
      },
    });
  };
  const handleClickNext = () => {
    requestQueue.processNext();
    setRemoveRecord("next");
  };
  return (
    <div className="overflow-auto h-full flex-shrink-0 mr-4">
      <div className="actions">
        <Input />
        <div className="flex my-4 align-middle ">
          <Button text="Add" handleClick={handleClickAdd} />
          <div className="pr-3"></div>
          <Button text="Next" handleClick={handleClickNext} />
        </div>
      </div>
      <Records />
    </div>
  );
}
