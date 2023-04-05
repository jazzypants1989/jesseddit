import { createStore } from "solid-js/store"
import { createSignal, createEffect, Show, For } from "solid-js"
import EditForm, { newMessage } from "./EditForm"
import {
  lookForChildren,
  commentHasBeenEdited,
  addReply,
  deleteComment,
} from "../../utils/client"

import type { Comment, User, Like, Post } from "@prisma/client"
import CommentLike from "./CommentLike"

export interface CommentItemProps extends Comment {
  user: User
  likes: Like[]
  children?: CommentItemProps[]
}

export interface PostProps extends Post {
  comments: CommentItemProps[]
  likes: Like[]
}

const CommentItem = (props: {
  comment: CommentItemProps
  post: PostProps
  user: User
}) => {
  const [comment, setComment] = createStore(props.comment)
  const [text, setText] = createSignal("")
  const [error, setError] = createSignal("")
  const [showReply, setShowReply] = createSignal(false)
  const [showEdit, setShowEdit] = createSignal(false)
  const [showChildren, setShowChildren] = createSignal(true)

  createEffect(() => {
    const children = lookForChildren(comment, props.post.comments)
    if (children) {
      setComment((comment: CommentItemProps) => {
        return {
          ...comment,
          children,
        }
      })
    }
  })

  createEffect(() => {
    if (showEdit()) {
      setShowReply(false)
    }
  })

  createEffect(() => {
    if (showReply()) {
      setShowEdit(false)
    }
  })

  createEffect(() => {
    if (text()) {
      setError("")
    }
  })

  createEffect(() => {
    if (newMessage()) {
      setComment((comment: CommentItemProps) => {
        return {
          ...comment,
          body: newMessage(),
        }
      })
    }
  })

  const onSubmit = (e: Event) => {
    e.preventDefault()
    if (!text()) {
      setError("Please enter a comment")
      return
    }

    try {
      if (!props.user) throw new Error("You must be logged in to comment")
      if (!props.post) throw new Error("Post not found")
      if (!props.post.permalink) throw new Error("Permalink not found")
      addReply(text(), props?.post?.permalink, comment?.id).then((reply) => {
        setComment((comment: CommentItemProps) => {
          return {
            ...comment,
            children: [...(comment.children || []), reply],
          }
        })
      })
    } catch (err) {
      setError((err as Error).message)
    }

    setText("")

    return false
  }

  const onDelete = (comment: CommentItemProps) => {
    if (!confirm("Are you sure you want to delete this comment?")) {
      console.log(
        "IT HAS BEEN CANCELLED. I GOTCHA BRO. DON'T WORRY. IT'S ALL GOOD."
      )
      return
    }
    try {
      deleteComment(comment).then((res) => {
        if (res) {
          setShowEdit(false)
          setShowReply(false)
          setComment((comment: CommentItemProps) => {
            return {
              ...comment,
              softDelete: true,
              body: "This comment has been deleted ☠",
            }
          })
        }
      })
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div
      id={comment.id}
      class="flex flex-col gap-2 pl-2 border-b border-gray-300 m-2 p-2 border-dashed w-full"
    >
      {comment?.user?.html_url && !comment.softDelete ? (
        <a
          href={comment.user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-2 md:flex-row flex-col"
        >
          <img
            src={comment.user?.avatar_url || "https://picsum.photos/200"}
            class="w-12 h-12 rounded-full object-cover md:w-24 md:h-24"
          />
          <p class="font-bold">{comment?.user?.name}</p>
        </a>
      ) : (
        !comment.softDelete && (
          <div class="flex items-center gap-2 px-2 md:flex-row flex-col">
            <img
              src={comment.user?.avatar_url || "https://picsum.photos/200"}
              class="w-12 h-12 rounded-full object-cover md:w-24 md:h-24"
            />
            <div class="font-bold">{comment?.user?.name}</div>
          </div>
        )
      )}
      {comment?.user?.twitter_username && !comment.softDelete && (
        <a href={`https://twitter.com/${comment.user?.twitter_username}`}>
          {/* twitter logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
            class="w-6 h-6"
          >
            <path
              fill="#1d9bf0"
              d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
            />
          </svg>
        </a>
      )}
      <div class="bg-slate-600 text-slate-200 p-2 rounded-md whitespace-pre-wrap">
        {comment.body}
      </div>
      <Show when={commentHasBeenEdited(comment) && !comment.softDelete}>
        <div class="text-gray-200 text-sm italic">
          This comment was edited on{" "}
          {new Date(comment.updatedAt).toLocaleString()}.
        </div>
      </Show>
      <div class="text-gray-400">
        {new Date(comment.createdAt).toLocaleString()}
      </div>
      {!comment.softDelete && (
        <div class="flex flex-wrap items-center justify-center bg-slate-600 text-slate-200 p-2 rounded-md text-lg md:text-2xl">
          <CommentLike comment={comment} user={props.user} />
          <a
            href={`#${comment.id}`}
            class="flex justify-start bg-slate-600 text-slate-200 p-2 rounded-md w-fit"
          >
            🔗
          </a>
          <Show when={comment.user?.id === props.user.id}>
            <button
              onClick={() => setShowEdit((showEdit) => !showEdit)}
              class="flex justify-start bg-slate-600 text-slate-200 p-2 rounded-md w-fit"
            >
              📝
            </button>
          </Show>
          <Show when={comment.user?.id === props.user.id}>
            <button
              onclick={() => onDelete(comment)}
              class="flex justify-start bg-slate-600 text-slate-200 p-2 rounded-md w-fit"
            >
              🗑️
            </button>
          </Show>
          <Show
            when={props.user.id}
            fallback={
              <a
                href="/login"
                class="flex justify-start bg-slate-600 text-slate-200 p-2 rounded-md w-fit"
              >
                Login to Reply
              </a>
            }
          >
            <button
              onClick={() => setShowReply((showReply) => !showReply)}
              class="flex justify-start bg-slate-600 text-purple-400 p-2 rounded-md w-fit"
            >
              {showReply() ? "Close 🔺" : "Reply 🔻"}
            </button>
          </Show>
        </div>
      )}
      <Show when={showEdit()}>
        <EditForm comment={comment} />
      </Show>
      <Show when={showReply()}>
        <form
          class="flex items-start justify-center flex-col gap-2"
          onSubmit={onSubmit}
        >
          <textarea
            value={text()}
            onInput={(e: Event) =>
              setText((e.target as HTMLInputElement).value)
            }
            class="border w-full border-gray-300 rounded-md bg-slate-600 text-slate-200 p-1"
          />
          <button
            class="p-2 self-end font-bold bg-purple-600 text-purple-200 rounded-md text-xl hover:bg-purple-800 hover:text-purple-300"
            type="submit"
          >
            Reply
          </button>
        </form>
      </Show>
      <Show when={error()}>
        <div class="text-red-300 animate-bounce bold self-center text-center text-4xl p-2 w-fit bg-red-700 rounded-md">
          {error()}
        </div>
      </Show>
      {comment.children && comment.children.length > 0 && (
        <>
          <button
            onClick={() => setShowChildren((showChildren) => !showChildren)}
            class="flex justify-start bg-slate-600 text-slate-200 p-2 rounded-md w-fit"
          >
            <Show when={!showChildren()} fallback="Hide Replies">
              Show{" "}
              {comment.children.length > 1
                ? `${comment.children.length} Replies`
                : `Reply`}
            </Show>
          </button>
          <Show when={showChildren()}>
            <ul class="border-l border-gray-300 pl-2 md:pl-4 border-dashed">
              <For each={comment.children}>
                {(item) => (
                  <CommentItem
                    comment={item}
                    post={props.post}
                    user={props.user}
                  />
                )}
              </For>
            </ul>
          </Show>
        </>
      )}
      <Show
        when={props.user?.login === "jazzypants1989" && !comment.softDelete}
      >
        <div class="flex justify-end items-end">
          <button
            class="bg-red-600 text-slate-200 p-2 rounded-md w-fit"
            onClick={() => {
              try {
                if (
                  !window.confirm(
                    "Are you sure you want to delete this comment?"
                  )
                ) {
                  console.log(
                    "You're an admin on the internet, and you're scared of deleting a comment? 🤔"
                  )
                  return
                }
                deleteComment(comment)
                setShowEdit(false)
                setShowReply(false)
                setComment((comment) => ({
                  ...comment,
                  body: "This comment has been deleted ☠️",
                  softDelete: true,
                }))
              } catch (e) {
                console.log(e)
              }
            }}
          >
            Delete
          </button>
        </div>
      </Show>
    </div>
  )
}
export default CommentItem
