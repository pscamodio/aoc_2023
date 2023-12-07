import type { Signal } from "@preact/signals";
import { Button } from "./Button.tsx";

interface RunButtonProps {
  day: Signal<number>;
  phase: Signal<number>;
  input: Signal<string>;
  output: Signal<string>;
}

export default function RunButton(props: RunButtonProps) {
  const run = async () => {
    console.log("run", props.input.value);
    const url = ["/api/aoc/", props.day.value, "/", props.phase.value].join("");
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(props.input.value),
    });
    const json = await res.json();
    console.log(json);
    props.output.value = JSON.stringify(json);
  };

  return <Button onClick={run}>Run</Button>;
}
