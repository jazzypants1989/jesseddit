import prisma from "../../utils/db"
import type { APIContext, APIRoute } from "astro"

export const get: APIRoute = async ({
  request,
  redirect,
  cookies,
}: APIContext) => {
  let code = request.url.split("=")[1]
  const { GITHUB_ID, GITHUB_SECRET } = import.meta.env
  const data = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${GITHUB_ID}&client_secret=${GITHUB_SECRET}&code=${code}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  ).then((res) => res.json())

  const { access_token } = data

  const user = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${access_token}`,
    },
  }).then((res) => res.json())

  const { login, name, id, avatar_url, location, twitter_username, html_url } =
    user
  user

  const userExists = await prisma.user.findFirst({
    where: {
      login,
    },
  })

  if (!userExists) {
    await prisma.user.create({
      data: {
        id,
        name,
        login,
        avatar_url,
        location,
        twitter_username,
        html_url,
      },
    })
  }

  cookies.set("user", JSON.stringify(user), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  })

  return redirect("/blog")

  //   return new Response("", {
  //     status: 302,
  //     headers: {
  //       "Set-Cookie": `user=${JSON.stringify(user)}; Path=/; HttpOnly`,
  //     },
  //   })
  // }
}
