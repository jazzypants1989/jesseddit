export async function get({
  params,
  redirect,
}: {
  params: { code: string }
  redirect: (url: string) => void
}) {
  return redirect(
    `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.GITHUB_ID
    }`
  )
}
