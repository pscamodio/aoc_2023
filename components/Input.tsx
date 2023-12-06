import type { Signal } from "@preact/signals";

interface InputProps {
  input: Signal<string>;
}

export default function Input(props: InputProps) {
  const updateInput = (ev: Event) => {
    if (ev.target && ev.target instanceof HTMLTextAreaElement) {
        props.input.value = ev.target.value;
    }
  };

  return (
    <div class="flex gap-8 py-6">
        <label htmlFor="input">Input</label>
        <textarea name="input" id="input" onChange={updateInput}>{props.input.value}</textarea>
    </div>
  );
}
