import type { Comment, User } from "@prisma/client"
import type {
  CommentItemProps,
  PostProps,
} from "../components/comments/CommentItem"
import { newMessage } from "../components/comments/EditForm"

// CREATE COMMENT

export async function addComment(body: string, permalink: string) {
  if (!body) throw new Error("Body is required")
  if (!permalink) throw new Error("Permalink is required")
  const comment = await fetch("/api/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body,
      permalink,
    }),
  }).then((res) => res.json())

  return comment as CommentItemProps
}

export async function addReply(body: string, permalink: string, id: string) {
  if (!body) throw new Error("Body is required")
  if (!permalink) throw new Error("Permalink is required")
  if (!id) throw new Error("ID is required")
  const comment = await fetch("/api/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body,
      permalink,
      id,
    }),
  }).then((res) => res.json())

  return comment as CommentItemProps
}

// CHILDREN

export function lookForChildren(
  comment: CommentItemProps,
  comments: CommentItemProps[]
) {
  const children = comments?.filter(
    (c: CommentItemProps) => c.parentId === comment.id
  )
  return children
}

// COMMENT LIKES

export function userLikedComment(comment: CommentItemProps, user: User) {
  const like = comment.likes?.find((like) => like.userId === user.id)
  if (like) {
    return like
  }
  return null
}

export async function likeComment(id: string | undefined) {
  if (!id) return null
  const newLike = await fetch("/api/likeComment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  }).then((res) => res.json())

  return newLike
}

export async function unlikeComment(id: string | undefined) {
  if (!id) return null
  const unLike = await fetch("/api/likeComment", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  }).then((res) => res.json())

  console.log("unLike", unLike)

  return unLike
}

// POST LIKES

export function userLikedPost(post: PostProps, user: User) {
  const like = post.likes?.find((like) => like.userId === user?.id)
  if (like) {
    return like
  }
  return null
}

export async function likePost(id: string | undefined) {
  if (!id) return null
  const newLike = await fetch("/api/likePost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  }).then((res) => res.json())

  return newLike
}

export async function unlikePost(id: string | undefined) {
  if (!id) return null
  const unLike = await fetch("/api/likePost", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  }).then((res) => res.json())

  return unLike
}

// EDIT COMMENT

export async function updateComment(comment: Comment, body: string) {
  return fetch("/api/comment", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: comment.id,
      userId: comment.userId,
      body,
    }),
  })
}

export function commentHasBeenEdited(comment: CommentItemProps) {
  if (!comment.updatedAt) return false
  const createdAt = new Date(comment.createdAt)
  const updatedAt = new Date(comment.updatedAt)
  const allowableDifference = 1000 * 60 * 1 // 1 minute
  const difference = updatedAt.getTime() - createdAt.getTime()
  return difference > allowableDifference || newMessage().body !== comment.body
}

// DELETE COMMENT

export function deleteComment(comment: CommentItemProps) {
  return fetch("/api/comment", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: comment.id,
      userId: comment.userId,
      children: comment.children,
    }),
  })
}
