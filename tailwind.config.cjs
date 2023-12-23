/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "!./src/demos/**/*",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: [
        "Heebo",
        "sans-serif",
        "ui-sans-serif",
        "system-ui",
        "monospace",
        "ui-monospace",
      ],
      serif: [
        "sans-serif",
        "ui-sans-serif",
        "system-ui",
        "monospace",
        "ui-monospace",
        "Menlo",
      ],
      mono: [
        'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
      ],
    },
    extend: {
      animation: {
        "fade-in-down": "fade-in-down 1s ease-out",
        "fade-in-up": "fade-in-up 1s ease-out",
        "fade-in-left": "fade-in-left 1s ease-out",
        "fade-in-right": "fade-in-right 1s ease-out",
        "fade-out-down": "fade-out-down 1s ease-out",
        "fade-out-up": "fade-out-up 1s ease-out",
        "fade-out-left": "fade-out-left 1s ease-out",
        "fade-out-right": "fade-out-right 1s ease-out",
        "nudge-x": "nudge-x 0.5s ease-out",
        "nudge-y": "nudge-y 0.5s ease-out",
        "float": "float 2s ease-in-out infinite",
        "float-fast": "float-fast 1s ease-in-out infinite",
        "float-slow": "float-slow 3s ease-in-out infinite",
        "rhythm": "rhythm 3s ease-in-out infinite",
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0.1",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(10)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0.2",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "nudge-x": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(-10px)",
          },
        },
        "nudge-y": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
        },
        "float-fast": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "float-slow": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-2.5px)",
          },
        },
        "fade-out-down": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
        "fade-out-up": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
        },
        "fade-out-left": {
          "0%": {
            opacity: "1",
            transform: "translateX(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateX(-10px)",
          },
        },
        "fade-out-right": {
          "0%": {
            opacity: "1",
            transform: "translateX(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
        },
        "rhythm": {
          "0%, 100%": {
            transform:
              "translateY(0) rotate(0deg) scale(1) skew(0deg) translateX(0)",
          },
          "33%": {
            transform:
              "translateY(-10px) rotate(8deg) scale(1.1) skew(2deg) translateX(10px)",
          },
          "66%": {
            transform:
              "translateY(0) rotate(-6deg) scale(0.9) skew(-1deg) translateX(-5px)",
          },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.green.700"),
            a: {
              color: theme("colors.green.700"),
              "&:hover": {
                color: theme("colors.green.900"),
              },
            },
            h1: {
              color: theme("colors.purple.600"),
            },
            h2: {
              color: theme("colors.purple.600"),
              indent: "0",
            },
            h3: {
              color: theme("colors.purple.600"),
              indent: "0",
            },
            h4: {
              color: theme("colors.purple.600"),
            },
            h5: {
              color: theme("colors.purple.600"),
            },
            h6: {
              color: theme("colors.purple.600"),
            },
            strong: {
              color: theme("colors.purple.600"),
            },
            code: {
              color: theme("colors.purple.200"),
              backgroundColor: theme("colors.purple.900"),
              // boxShadow: "2px 3px 4px #981162",
              "&:before": {
                content: "none !important",
              },
              "&:after": {
                content: "none !important",
              },
              padding: "0.25rem",
              margin: "0 0.2rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
              textShadow: "none",
              fontFamily:
                "Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
            },
            figcaption: {
              color: theme("colors.purple.500"),
            },
            blockquote: {
              color: theme("colors.purple.600"),
              borderLeftColor: theme("colors.red.400"),
            },
            ol: {
              li: {
                "&:before": {
                  color: theme("colors.purple.600"),
                },
              },
            },
            ul: {
              li: {
                "&:before": {
                  backgroundColor: theme("colors.purple.600"),
                },
              },
            },
            hr: {
              borderColor: theme("colors.purple.600"),
            },
            thead: {
              color: theme("colors.purple.600"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.purple.600"),
              },
            },
          },
        },
        DARK: {
          css: {
            color: theme("colors.yellow.400"),
            a: {
              color: theme("colors.green.400"),
              "&:hover": {
                color: theme("colors.blue.300"),
              },
            },
            h1: {
              color: theme("colors.purple.400"),
            },
            h2: {
              color: theme("colors.purple.400"),
              indent: "0",
            },
            h3: {
              color: theme("colors.purple.400"),
              indent: "0",
            },
            h4: {
              color: theme("colors.purple.400"),
            },
            h5: {
              color: theme("colors.purple.400"),
            },
            h6: {
              color: theme("colors.purple.400"),
            },
            strong: {
              color: theme("colors.purple.400"),
            },
            figcaption: {
              color: theme("colors.purple.500"),
            },
            blockquote: {
              color: theme("colors.purple.100"),
              borderLeftColor: theme("colors.purple.700"),
            },
            ol: {
              li: {
                "&:before": {
                  color: theme("colors.purple.400"),
                },
              },
            },
            ul: {
              li: {
                "&:before": {
                  backgroundColor: theme("colors.purple.400"),
                },
              },
            },
            hr: {
              borderColor: theme("colors.purple.400"),
            },
            thead: {
              color: theme("colors.purple.400"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.purple.400"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
