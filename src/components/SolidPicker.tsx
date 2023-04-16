import { createSignal, Show } from "solid-js"
import Buttons from "./Buttons"

let randomID = Math.random().toString(36).substring(2, 9)

export default function SolidPicker(props: {
  code: string
  demo: string
  id: string
  children: any
}) {
  const [active, setActive] = createSignal("code")

  return (
    <div
      class="w-full flex flex-col items-center justify-center"
      id={props.id || randomID}
    >
      <Buttons
        id={props.id || randomID}
        code={props.code}
        setActive={setActive}
        direction="up"
      />
      <div class="flex items-center justify-center w-full mx-auto">
        <Show when={active() === "code"}>
          <div class="max-w-full" innerHTML={props.code} />
        </Show>
        <Show when={active() === "demo"}>
          <div class="w-full text-center" innerHTML={props.demo} />
        </Show>
        <Show when={active() === "play"}>
          <div class="w-full text-center">{props.children}</div>
        </Show>
      </div>
      <Buttons
        id={props.id || randomID}
        code={props.code}
        setActive={setActive}
        direction="down"
      />

      <span class="hidden">{props.children}</span>
    </div>
  )
}
