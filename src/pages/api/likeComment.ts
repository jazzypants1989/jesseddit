import db from "../../utils/db"
import type { APIContext, APIRoute } from "astro"

export const post: APIRoute = async ({
  request,
  redirect,
  cookies,
}: APIContext) => {
  const { id } = await request.json()
  console.log("id", id) // id 1

  const cookie = cookies.get("user").value

  const user = cookie ? JSON.parse(cookie) : null

  if (!user?.id) {
    return new Response(JSON.stringify({ error: "Not logged in" }), {
      status: 401,
    })
  }

  const newLike = await db.like.create({
    data: {
      userId: user.id,
      commentId: id.toString(),
    },
  })

  console.log("newLike", newLike)
  return new Response(JSON.stringify(newLike), {
    headers: {
      "content-type": "application/json",
    },
  })
}

export const del: APIRoute = async ({
  request,
  redirect,
  cookies,
}: APIContext) => {
  const { id } = await request.json()
  console.log("id", id) // id 1
  const cookie = cookies.get("user").value

  const user = cookie ? JSON.parse(cookie) : null

  if (!user.id) {
    return new Response(JSON.stringify({ error: "Not logged in" }), {
      status: 401,
    })
  }

  const deletedLike = await db.like.delete({
    where: {
      id: id,
    },
  })

  console.log("deletedLike", deletedLike)

  return new Response(JSON.stringify(deletedLike), {
    headers: {
      "content-type": "application/json",
    },
  })
}
