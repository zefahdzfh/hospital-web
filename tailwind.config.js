// tailwind.config.js
module.exports = {
    content: [
      "./node_modules/flowbite/**/*.js", // Tambahkan ini
      "./views/**/*.ejs",  // Sesuaikan dengan folder views lu
      "./public/**/*.html",
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('flowbite/plugin')
    ],
  }
  