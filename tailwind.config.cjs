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
      serif: ["ui-serif", "Georgia"],
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
        "dance": "dance 2s ease-in-out infinite",
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
        "dance": {
          "0%, 100%": {
            transform:
              "translateY(0) rotate(0deg) scale(1) skew(0deg) translateX(0)",
          },
          "10%": {
            transform:
              "translateY(-10px) rotate(8deg) scale(1.1) skew(2deg) translateX(10px)",
          },
          "20%": {
            transform:
              "translateY(0) rotate(-6deg) scale(0.9) skew(-1deg) translateX(-5px)",
          },
          "30%": {
            transform:
              "translateY(-5px) rotate(7deg) scale(1.05) skew(1deg) translateX(5px)",
          },
          "40%": {
            transform:
              "translateY(0) rotate(-3deg) scale(0.95) skew(-1deg) translateX(-2.5px)",
          },
          "50%": {
            transform:
              "translateY(-2.5px) rotate(3deg) scale(1.025) skew(0.5deg) translateX(2.5px)",
          },
          "60%": {
            transform:
              "translateY(0) rotate(0deg) scale(1) skew(0deg) translateX(0)",
          },
          "70%": {
            transform:
              "translateY(-2.5px) rotate(-3deg) scale(0.975) skew(-0.5deg) translateX(-2.5px)",
          },
          "80%": {
            transform:
              "translateY(0) rotate(3deg) scale(1.05) skew(1deg) translateX(5px)",
          },
          "90%": {
            transform:
              "translateY(-5px) rotate(-7deg) scale(0.95) skew(-1deg) translateX(-5px)",
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
            color: theme("colors.yellow.900"),
            a: {
              color: theme("colors.blue.700"),
              "&:hover": {
                color: theme("colors.purple.800"),
              },
            },
            h1: {
              color: theme("colors.purple.600"),
            },
            h2: {
              color: theme("colors.purple.600"),
            },
            h3: {
              color: theme("colors.purple.600"),
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
              color: theme("colors.purple.600"),
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
            },
            h3: {
              color: theme("colors.purple.400"),
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
            code: {
              color: theme("colors.purple.400"),
              font: "Menlo, monospace",
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
