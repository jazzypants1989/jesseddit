import prisma from "../../utils/db"

export async function get({ request, redirect, cookies }) {
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

  const {
    login,
    name,
    id,
    avatar_url,
    email,
    location,
    twitter_username,
    html_url,
  } = user
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
      },
    })
  }

  return redirect("/")
}
