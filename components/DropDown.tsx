import { Signal } from "@preact/signals";


type DropDownProps = {
    id: string;

    label: string;

    value: Signal<number>;

    choiches: string[];
}

export function DropDown(props: DropDownProps) {
    const updateValue = (ev: Event) => {
      if (ev.target && ev.target instanceof HTMLSelectElement) {
          props.value.value = parseInt(ev.target.value);
      }
    };

    return (
        <div class="flex gap-8 py-6">
            <label htmlFor={props.id}>{props.label}</label>
            <select name={props.id} id={props.id} value={props.value.value} onChange={updateValue}>
                {props.choiches.map((c) => <option value={c}>{c}</option>) }
            </select>
        </div>
      );
}