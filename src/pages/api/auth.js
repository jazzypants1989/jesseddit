export async function get({ params, redirect }) {
  return redirect(
    `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.GITHUB_ID
    }`
  )
}
