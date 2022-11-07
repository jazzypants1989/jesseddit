/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        "fade-in-down": "fade-in-down 2s ease-out",
        "fade-in-up": "fade-in-up 2s ease-out",
        "fade-in-left": "fade-in-left 2s ease-out",
        "fade-in-right": "fade-in-right 2s ease-out",
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
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
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
            animationTimingFunction: cubic - bezier(0.455, 0.03, 0.515, 0.955),
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
    },
  },
  plugins: [],
}
