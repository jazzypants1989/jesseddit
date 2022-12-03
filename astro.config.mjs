import { defineConfig } from "astro/config"

// https://astro.build/config
import tailwind from "@astrojs/tailwind"
import compress from "astro-compress"
import image from "@astrojs/image"
import solidJs from "@astrojs/solid-js"
import mdx from "@astrojs/mdx"
import node from "@astrojs/node"

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    compress(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    solidJs(),
    mdx(),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
})
