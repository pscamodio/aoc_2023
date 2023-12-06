import type { Signal } from "@preact/signals";

interface OutputProps {
  output: Signal<string>;
}

export default function Output(props: OutputProps) {
  return (
    <div class="flex gap-8 py-6">
        <label htmlFor="input">Output</label>
        <textarea name="input">{props.output.value}</textarea>
    </div>
  );
}
