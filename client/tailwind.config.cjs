const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{css,scss,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),

    plugin(({ addComponents, theme }) => {
      addComponents({
        ".button": {
          DEFAULT: {},
          "&-submit": {},
          "&-warning": {},
          "&-danger": {},
        },
      });
    }),
  ],
};
