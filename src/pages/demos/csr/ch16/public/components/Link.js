import Router from "./Router.js"

export default function Link() {
  const links = document.querySelectorAll(".Link")
  links.forEach((link) => {
    if (link.alreadyAdded) return
    link.alreadyAdded = true
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const linkPath = link.getAttribute("href")
      history.pushState(null, null, linkPath)
      Router(linkPath)
    })
  })
}
