import { useSignal } from "@preact/signals";
import Input from "../components/Input.tsx";
import RunButton from "../components/RunButton.tsx";
import Selector from "../components/Selector.tsx";

export function AocRunner() {
  const day = useSignal(1);
  const phase = useSignal(1);
  const input = useSignal("");
  const output = useSignal("");

  return (
    <>
      <Selector day={day} phase={phase}></Selector>
      <Input input={input} />
      <RunButton day={day} phase={phase} input={input} output={output} />
      <div>{output.value}</div>
    </>
  );
}
