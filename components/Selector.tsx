import type { Signal } from "@preact/signals";
import { DropDown } from "./DropDown.tsx";

interface SelectorProps {
  day: Signal<number>;
  phase: Signal<number>;
}

export default function Selector(props: SelectorProps) {

  return (
    <div class="flex gap-8 py-6">
        <DropDown label="day" id="day-drop" choiches={["1", "2"]} value={props.day}  ></DropDown>
        <DropDown label="phase" id="phase-drop" choiches={["1", "2"]} value={props.phase}  ></DropDown>

          </div>
  );
}
