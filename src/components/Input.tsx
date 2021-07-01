import { useAtom } from "jotai";
import { textAtom, handleChangeAtom } from "../state/index";

export default function Input() {
  const [text] = useAtom(textAtom);
  const [, handleChange] = useAtom(handleChangeAtom);

  return (
    <input
      className="h-8 w-full"
      type="text"
      value={text}
      onChange={handleChange}
    />
  );
}
