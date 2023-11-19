import prisma from "../../utils/db"
import type { APIContext, APIRoute } from "astro"

export const GET: APIRoute = async ({
  request,
  redirect,
  cookies,
}: APIContext) => {
  let code = request.url.split("=")[1]
  if (!code) {
    return redirect("/blog")
  }
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

  if (!access_token) {
    return redirect("/blog")
  }

  const user = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${access_token}`,
    },
  }).then((res) => res.json())

  const { login, name, id, avatar_url, location, twitter_username, html_url } =
    user

  if (!login) {
    return redirect("/blog")
  }

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
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
  })

  return redirect("/blog")
}
