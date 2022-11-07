import { defineConfig } from "astro/config"

// https://astro.build/config
import tailwind from "@astrojs/tailwind"
import compress from "astro-compress"
import image from "@astrojs/image"
import solidJs from "@astrojs/solid-js"
import prefetch from "@astrojs/prefetch"

// https://astro.build/config
import mdx from "@astrojs/mdx"

// https://astro.build/config
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
    prefetch(),
    mdx(),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
})
