import type { User } from "@prisma/client"
import { createSignal, createResource } from "solid-js"
import type { CommentItemProps } from "./CommentItem"
import {
  userLikedComment,
  likeComment,
  unlikeComment,
} from "../../utils/client"

export default function CommentLike(props: {
  comment: CommentItemProps
  user: User
}) {
  const [like, { mutate: setLike }] = createResource(() =>
    userLikedComment(props.comment, props.user)
  )
  const [likes, setLikes] = createSignal(props.comment.likes || [])
  const [liked, setLiked] = createSignal(like()?.id ? true : false)

  const toggleLike = () => {
    if (liked()) {
      try {
        unlikeComment(like()?.id).then((res) => {
          setLike(res)
          setLikes(likes().filter((l) => l.id !== like()?.id))
          setLiked(false)
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        likeComment(props.comment.id).then((res) => {
          if (res.id) {
            setLike(res)
            setLikes([...likes(), res])
            setLiked(true)
          } else
            alert(
              "You must be logged in to like a post. You can log in with the nav bar on the top-left."
            )
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <button
      class="flex justify-start bg-slate-600 text-slate-200 p-2 rounded-md w-fit"
      onClick={toggleLike}
    >
      {likes()?.length === 0
        ? "💔 0"
        : likes()?.length > 0
        ? liked()
          ? "💖" + likes()?.length
          : "❤️" + likes()?.length
        : "💔"}
    </button>
  )
}
