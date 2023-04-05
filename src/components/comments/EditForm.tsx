import type { Comment } from "@prisma/client"
import { Show, createEffect, createSignal } from "solid-js"
import { updateComment } from "../../utils/client"

export const [newMessage, setNewMessage] = createSignal("")

export default function EditForm(props: { comment: Comment }) {
  const [text, setText] = createSignal(props.comment.body)
  const [error, setError] = createSignal("")
  const [sleep, setSleep] = createSignal(false)

  createEffect(() => {
    if (text()) {
      setError("")
      console.log(sleep())
    }
  })

  const onSubmit = (e: Event) => {
    e.preventDefault()
    if (sleep()) {
      setError("You are commenting too fast. Please wait a bit")
      return
    }
    if (text() === props.comment.body) {
      setError("You didn't change anything!")
      return
    } else if (!text()) {
      setError("Oh, now you have nothing to say?")
      return
    }
    try {
      const updatedComment = updateComment(props.comment, text())

      setNewMessage(text())

      setSleep(true)

      setTimeout(() => setSleep(false), 5000)

      setText("")

      return updatedComment
    } catch (e) {
      setError((e as Error).message)
    }
  }
  return (
    <form
      class="flex items-start w-full justify-center flex-col gap-2"
      onSubmit={onSubmit}
    >
      <textarea
        value={text()}
        onInput={(e: Event) => setText((e.target as HTMLInputElement).value)}
        class="border w-full border-purple-300 rounded-md bg-blue-300 text-purple-900 p-1 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:focus:ring-purple-300"
      />
      <button
        class="p-2 self-end font-bold bg-green-500 text-slate-200 rounded-md text-xl hover:bg-green-800 hover:text-green-300"
        type="submit"
      >
        Edit
      </button>
      <Show when={error()}>
        <div class="text-red-300 animate-bounce bold self-center text-center text-4xl p-2 w-fit bg-red-700 rounded-md">
          {error()}
        </div>
      </Show>
    </form>
  )
}
