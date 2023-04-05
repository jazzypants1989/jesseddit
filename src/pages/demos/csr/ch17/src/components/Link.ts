import Router from "./Router.js"

type LinkWithListener = HTMLAnchorElement & { alreadyAdded: boolean }

export default function Link() {
  const links: NodeListOf<LinkWithListener> = document.querySelectorAll(".Link")

  function linkFinder(link: LinkWithListener) {
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
