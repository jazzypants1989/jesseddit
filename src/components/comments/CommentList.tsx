import { createStore } from "solid-js/store"
import { createSignal, createResource, Show, For, createEffect } from "solid-js"
import CommentItem from "./CommentItem"

import { addComment } from "../../utils/client"

import type { CommentItemProps, PostProps } from "./CommentItem"
import type { User } from "@prisma/client"

const CommentList = (props: {
  comments: CommentItemProps[]
  post: PostProps
  user: User
}) => {
  const [commentsInState, setCommentsInState] = createStore(props.comments)
  const [text, setText] = createSignal("")
  const [error, setError] = createSignal("")
  const [sleep, setSleep] = createSignal(false)

  createEffect(() => {
    if (text()) setError("")
  })

  const onSubmit = (e: Event) => {
    e.preventDefault()
    if (!text()) {
      setError("Please enter a comment")
      return
    }

    if (sleep()) {
      setError("You are commenting too fast. Please wait a bit")
      return
    }

    try {
      if (!props.user) throw new Error("You must be logged in to comment")
      if (!props.post) throw new Error("Post not found")
      if (!props.post.permalink) throw new Error("Permalink not found")
      addComment(text(), props?.post?.permalink).then((comment) => {
        setCommentsInState((comments) => [...comments, comment])
      })
    } catch (err) {
      setError((err as Error).message)
    }

    setText("")

    setSleep(true)
    setTimeout(() => setSleep(false), 5000)

    return false
  }

  return (
    <>
      <div class="flex w-full max-w-3xl items-center justify-start flex-col gap-2 py-1">
        <form
          onSubmit={onSubmit}
          class="flex w-full items-center justify-center flex-col gap-2"
        >
          <textarea
            value={text()}
            onInput={(e: Event) =>
              setText((e.target as HTMLInputElement).value)
            }
            class="border w-full border-purple-300 rounded-md bg-blue-300 text-purple-900 p-1 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:focus:ring-purple-300"
          />
          {error() && (
            <div class="text-red-300 animate-pulse bold self-center text-center text-4xl p-2 w-fit bg-red-700 rounded-xl">
              {error()}
            </div>
          )}
          {props.user.id ? (
            <button
              class="p-2 self-end font-bold bg-purple-600 text-purple-200 rounded-md text-xl hover:bg-purple-800 hover:text-purple-300"
              type="submit"
            >
              Add Comment
            </button>
          ) : (
            <a
              href="/login"
              class="p-2 self-end font-bold bg-purple-600 text-purple-200 rounded-md text-xl hover:bg-purple-800 hover:text-purple-300"
            >
              Login to Comment
            </a>
          )}
        </form>
        <Show
          when={commentsInState?.length > 0}
          fallback={
            <h3 class="text-gray-400">
              There are no comments yet. Be the first!
            </h3>
          }
        >
          <h2 class="text-2xl text-center">Comments</h2>
          <ul class="p-2 w-full max-w-4xl">
            <For each={commentsInState}>
              {(item) => {
                return (
                  !item.parentId && (
                    <li class="m-2 p-2 mb-0 pb-0 border-t border-gray-300">
                      <CommentItem
                        comment={item}
                        post={props.post}
                        user={props.user}
                      />
                    </li>
                  )
                )
              }}
            </For>
          </ul>
        </Show>
      </div>
    </>
  )
}

export default CommentList
