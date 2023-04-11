import { createSignal, Show } from "solid-js"

let randomID = Math.random().toString(36).substring(2, 9)

export default function SolidPicker(props: {
  code: string
  demo: string
  id: string
  url: string
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
        url={props.url}
      />
      <div class="flex items-center justify-center w-full mx-auto">
        <Show when={active() === "code"}>
          <div class="max-w-full" innerHTML={props.code} />
        </Show>
        <Show when={active() === "demo"}>
          <div class="w-full text-center" innerHTML={props.demo} />
        </Show>
      </div>
      <Buttons
        id={props.id || randomID}
        code={props.code}
        url={props.url}
        setActive={setActive}
      />
    </div>
  )
}

const Buttons = (props: {
  id: string
  code: string
  url?: string
  setActive: (active: string) => void
}) => {
  console.log(props.url)
  return (
    <div class="w-full flex items-center justify-center">
      <button
        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-l"
        onClick={() => setCode(props.id)}
      >
        Code
      </button>
      <button
        class="
      bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r
      "
        onClick={() => copyCodeToClipboard(props.code)}
      >
        Copy
      </button>
      <button
        class="
      bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r
      "
        onClick={() => setDemo(props.id)}
      >
        Demo
      </button>
      <a
        class="cursor-pointer
      bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r"
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GitHub
      </a>
    </div>
  )

  function setCode(id: string) {
    props.setActive("code")
    scrollToID(id)
  }

  function setDemo(id: string) {
    props.setActive("demo")
    scrollToID(id)
  }
}

function scrollToID(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

function getTextContentFromHTML(html: string) {
  const div = document.createElement("div")
  div.innerHTML = html
  return div.textContent || div.innerText || ""
}

function copyCodeToClipboard(code: string) {
  const text = getTextContentFromHTML(code)
  navigator.clipboard.writeText(text.trim())
  alert("Copied to clipboard!")
}
