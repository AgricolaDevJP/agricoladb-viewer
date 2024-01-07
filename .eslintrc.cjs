module.exports = {
  extends: ['plugin:react/recommended', 'plugin:astro/recommended', 'prettier'],
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ['src/**/*.astro'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      processor: 'astro/client-side-ts',
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
      },
      plugins: ['@typescript-eslint'],
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
