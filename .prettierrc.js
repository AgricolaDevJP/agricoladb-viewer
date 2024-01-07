module.exports = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  arrowParens: 'avoid',
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-astro',
    'prettier-plugin-astro-organize-imports',
  ],
  importOrder: ['^@/(components|layouts|libs|pages)/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [
    {
      files: '**/*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
