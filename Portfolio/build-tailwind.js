// build-tailwind.js
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss'); // <- new package
const autoprefixer = require('autoprefixer');

const input = path.resolve(__dirname, 'styles/globals.css');
const output = path.resolve(__dirname, 'public/output.css');

fs.readFile(input, (err, css) => {
  if (err) throw err;
  postcss([tailwindcss, autoprefixer])
    .process(css, { from: input, to: output })
    .then(result => {
      fs.writeFile(output, result.css, () => true);
      console.log('✅ Tailwind compiled to', output);
    })
    .catch(err => console.error(err));
});
