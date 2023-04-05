import type { Comment } from "@prisma/client"
import { Show, createEffect, createSignal } from "solid-js"
import { updateComment } from "../../utils/client"

export const [newMessage, setNewMessage] = createSignal("")

export default function EditForm(props: { comment: Comment }) {
  const [text, setText] = createSignal(props.comment.body)
  const [error, setError] = createSignal("")

  createEffect(() => {
    if (text()) {
      setError("")
    }
  })

  const onSubmit = (e: Event) => {
    e.preventDefault()
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
        value={text() || props.comment.body}
        onInput={(e: Event) => setText((e.target as HTMLInputElement).value)}
        class="border w-full border-gray-300 rounded-md bg-slate-600 text-slate-200 p-1"
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
