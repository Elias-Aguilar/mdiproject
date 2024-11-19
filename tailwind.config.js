/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.js", "./src/**/*.{html,js}",
    "./node_modules/tw-elements/js/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require("tw-elements/plugin.cjs"),   
  ],
   darkMode: "class"
}

