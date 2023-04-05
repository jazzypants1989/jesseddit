import render from "../components/render.js"

export default function Nope(id, badFetch) {
  if (badFetch) {
    render(
      `<h1>404</h1><h2>Dang, eithre the server is down or someone misspelled a URL. Whatever it is, it's probably Jesse's fault.</h2>`
    )
  } else if (id) {
    render(
      `<h1>404</h1><h2>Sorry buddy, but I don't think we have a product with id #${id}!</h2>`
    )
  } else {
    render(`<div>
              <h1>404</h1>
              <h2>Huh, you're at ${location.pathname}, but you really shouldn't be... 🤔 </h2>
            </div>`)
  }
}
