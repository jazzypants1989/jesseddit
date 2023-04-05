import render from "../components/render.js"

export default function Home() {
  document.title = "Home" // Set the page title
  render(`
            <p>This is a totally real shop! See! That's a picture! Of a shop! Totally
          open.</p>
          <img src="/diana.avif" alt="Check us out" />
            `)
}
