import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main-green': '#42b983',
      }
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
  ],
  purge: {
  options: {
    safelist: [
      'bg-gray-300',
      'bg-yellow-300',
      'bg-green-300',
      'bg-blue-300',
      'bg-indigo-300',
      'bg-purple-300',
      'bg-pink-300',
      'bg-teal-300',
      'bg-orange-300',
    ],
    },
  }
}

