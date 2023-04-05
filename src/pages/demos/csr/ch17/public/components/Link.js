import Router from "./Router.js"
export default function Link() {
  const links = document.querySelectorAll(".Link")

  function linkFinder(link) {
    if (link.alreadyAdded) return
    link.alreadyAdded = true
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const linkPath = link.getAttribute("href")
      if (!linkPath) return
      history.pushState(null, "", linkPath)
      Router(linkPath)
    })
  }
  links.forEach(linkFinder)
}
