import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import mdx from "@astrojs/mdx"
import vercel from "@astrojs/vercel/serverless"

export default defineConfig({
  integrations: [tailwind(), solidJs(), mdx()],
  output: "server",
  adapter: vercel(),
})
