/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
    "./index.html"
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        7: "repeat(7, minmax(0,1fr))"
      },
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: { transform: "translateX(calc(100% + 10px))" },
          to: { transform: "translateX(0))" },
        },
        swipeOut: {
          from: { transform: "translateX(10px)" },
          to: { transform: "translateX(calc(100% + 10px))" },
        },
        down: {
          from: {opacity: 0, top: "2.5em"},
          to: {opacity: 1, top: "50%"}
        },
        up: {
          from: {opacity: 1, top: "50%"},
          to: {opacity: 0, top: "2.5em"}
        }
      },
      animation: {
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
        down: "down 300ms ease-in-out",
        up: "up 300ms ease-in",
      },
    },
  },
  plugins: [],
}
