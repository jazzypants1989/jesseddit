import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import mdx from "@astrojs/mdx"
import netlify from "@astrojs/netlify/functions"

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    solidJs(),
    mdx({
      shikiConfig: { theme: "rose-pine-moon" },
    }),
  ],
  redirects: {
    "/blog/client-side-routing-1": "/blog/client-side-routing",
  },
  output: "server",
  site: "https://www.jessedit.tech",
})
