const Buttons = (props: {
  id: string
  code: string
  slug?: string
  setActive: (active: string) => void
  direction: string
}) => {
  const directionClass =
    props.direction === "up"
      ? "hover:-translate-y-1 hover:drop-shadow-2xl"
      : "hover:translate-y-1 hover:scale-95 hover:shadow-2xl"
  return (
    <div class="w-full flex items-center justify-center">
      <button
        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-l-2xl hover:-translate-x-1 transform transition duration-500 ease-in-out"
        onClick={() => setCode(props.id)}
      >
        Code
      </button>
      <button
        class={`
        bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 transform transition duration-500 ease-in-out ${directionClass}
        `}
        onClick={() => copyCodeToClipboard(props.code, props.id)}
      >
        Copy
      </button>
      <button
        class={`
        bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 transform transition duration-500 ease-in-out ${directionClass}
        `}
        onClick={() => setDemo(props.id)}
      >
        Demo
      </button>
      <button
        class="
        bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r-2xl hover:translate-x-1 transform transition duration-500 ease-in-out
        "
        onClick={() => setPlay(props.id)}
      >
        Play
      </button>
      <div class="hidden translate-y-1"></div>
      <div class="hidden -translate-y-1"></div>
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

  function setPlay(id: string) {
    props.setActive("play")
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

function copyCodeToClipboard(code: string, id: string) {
  const text = getTextContentFromHTML(code)
  navigator.clipboard.writeText(text.trim())
  copyToast(id)
}

function copyToast(id: string) {
  const toast = document.createElement("div")
  toast.classList.add("toast")
  toast.innerHTML = `Copied the code for ${id} to your clipboard. Go experiment and have fun!`
  const body = document.querySelector("body")
  body?.appendChild(toast)
  animateIn(toast)
}

function animateIn(element: HTMLElement) {
  element.classList.add("animate-fade-in-up")
  setTimeout(() => {
    animateOut(element)
  }, 3000)
}

function animateOut(element: HTMLElement) {
  element.classList.remove("animate-fade-in-up")
  element.classList.add("animate-fade-out-down")
  setTimeout(() => {
    element.remove()
  }, 1000)
}

export default Buttons
