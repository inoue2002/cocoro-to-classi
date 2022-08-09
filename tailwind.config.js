/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  // 参考:https://zenn.dev/ilove/articles/8a93705d396e05
  // eslint-disable-next-line
  plugins: [
    require("@tailwindcss/line-clamp"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          "@screen lg": {
            maxWidth: "960px",
          },
          "@screen xl": {
            maxWidth: "1200px",
          },
        },
      });
    },
  ],
};
