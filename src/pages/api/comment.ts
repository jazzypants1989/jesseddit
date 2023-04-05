import type { CommentItemProps } from "../../components/comments/CommentItem"
import db from "../../utils/db"
import type { APIContext, APIRoute } from "astro"

export const post: APIRoute = async ({
  request,
  redirect,
  cookies,
}: APIContext) => {
  const { body, permalink } = await request.json()
  console.log("Body: ", body)
  console.log("Permalink: ", permalink)
  console.log(cookies.get("user").value)

  const cookie = cookies.get("user").value

  const user = cookie ? JSON.parse(cookie) : null

  if (!user.id) {
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

export const put: APIRoute = async ({
  request,
  redirect,
  cookies,
}: APIContext) => {
  const { body, id, userId } = await request.json()
  console.log("Body: ", body)
  console.log("ID: ", id)

  const cookie = cookies.get("user").value

  const user = cookie ? JSON.parse(cookie) : null

  if (!user.id) {
    return redirect("/login")
  }

  if (user.id !== "jazzypants1989" && user.id !== userId) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "content-type": "application/json",
      },
    })
  }

  const comment = await db.comment.update({
    where: {
      id,
    },
    data: {
      body,
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

export const del: APIRoute = async ({
  request,
  redirect,
  cookies,
}: APIContext) => {
  const { id, userId, children } = await request.json()
  console.log("Children: ", children)

  const cookie = cookies.get("user").value

  const user = cookie ? JSON.parse(cookie) : null

  if (!user.id) {
    return redirect("/login")
  }

  if (user.id !== "jazzypants1989" && user.id !== userId) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "content-type": "application/json",
      },
    })
  }

  const softOrHard = (children: CommentItemProps[]) => {
    if (children?.length && children.length > 0) {
      return db.comment.update({
        where: {
          id,
        },
        data: {
          body: "This comment has been deleted. ☠",
          softDelete: true,
        },
      })
    } else {
      return db.comment.delete({
        where: {
          id,
        },
      })
    }
  }

  const comment = await softOrHard(children)

  console.log("Comment: ", comment)

  return new Response(JSON.stringify(comment), {
    headers: {
      "content-type": "application/json",
    },
  })
}
