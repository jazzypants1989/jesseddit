import db from "../../utils/db"
import type { APIContext, APIRoute } from "astro"

export const post: APIRoute = async ({
  request,
  redirect,
  cookies,
}: APIContext) => {
  const { body, permalink, id } = await request.json()
  console.log("Body: ", body)
  console.log("Permalink: ", permalink)
  console.log(cookies.get("user").value)

  const cookie = cookies.get("user").value

  const user = cookie ? JSON.parse(cookie) : null

  if (!user) {
    return redirect("/login")
  }

  const login = user.login

  const comment = await db.comment.create({
    data: {
      body,
      user: {
        connect: {
          login: login,
        },
      },
      post: {
        connect: {
          permalink: permalink,
        },
      },
      parent: {
        connect: {
          id: id,
        },
      },
    },
    include: {
      user: true,
    },
  })

  console.log("Comment: ", comment)

  return new Response(JSON.stringify(comment), {
    headers: {
      "content-type": "application/json",
    },
  })
}
