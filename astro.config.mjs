import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import compress from "astro-compress"
import solidJs from "@astrojs/solid-js"
import mdx from "@astrojs/mdx"
import vercel from "@astrojs/vercel/serverless"

export default defineConfig({
  integrations: [tailwind(), compress(), solidJs(), mdx()],
  output: "server",
  adapter: vercel(),
})
