import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import mdx from "@astrojs/mdx"
import netlify from "@astrojs/netlify/functions"

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    solidJs(),
    mdx(),
  ],
  output: "server",
  adapter: netlify(),
  site: 'https://www.jessedit.tech'
})
