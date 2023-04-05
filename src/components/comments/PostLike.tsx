import type { User } from "@prisma/client"
import { createSignal } from "solid-js"
import type { PostProps } from "./CommentItem"
import { userLikedPost, likePost, unlikePost } from "../../utils/client"

export default function PostLike(props: { post: PostProps; user: User }) {
  const [like, setLike] = createSignal(userLikedPost(props.post, props.user))
  const [likes, setLikes] = createSignal(props.post.likes)
  const [liked, setLiked] = createSignal(like()?.id ? true : false)
  const [sleep, setSleep] = createSignal(false)

  const toggleLike = () => {
    if (sleep()) {
      console.log("sleeping")
      return
    }
    if (liked()) {
      try {
        unlikePost(like()?.id).then((res) => {
          setLike(res)
          setLikes(likes().filter((l) => l.id !== like()?.id))
          setLiked(false)
          setSleep(true)
          setTimeout(() => setSleep(false), 1000)
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        likePost(props.post.id).then((res) => {
          if (res.id) {
            setLike(res)
            setLikes([...likes(), res])
            setLiked(true)
            setSleep(true)
            setTimeout(() => setSleep(false), 1000)
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
    <div class="flex items-center justify-center gap-2">
      <button
        onClick={toggleLike}
        class={`flex items-center justify-center gap-1 px-2 py-1 rounded-md text-slate-200 ${
          liked()
            ? "bg-purple-700 hover:bg-red-700"
            : "bg-slate-700 hover:bg-green-700"
        }`}
      >
        {likes().length === 0
          ? "💔 0"
          : likes().length > 0
          ? liked()
            ? "💖" + likes().length
            : "❤️" + likes().length
          : ""}
      </button>
    </div>
  )
}
