/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  experimentalTernaries: true,
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100,
};

export default config;
