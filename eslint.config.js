import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactPlugin from 'eslint-plugin-react'
import standardConfig from 'eslint-config-standard'

export default [
  { ignores: ['dist', 'node_modules', '.storybook', 'storybook-static'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      react: reactPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...standardConfig.rules,
      ...reactHooks.configs.recommended.rules,
      semi: ['error', 'never'],
      'no-semi': ['error', 'always'],
      'max-len': ['error', { code: 120 }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
]
