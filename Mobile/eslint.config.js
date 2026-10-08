const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  { ignores: ['node_modules/', '.expo/', 'dist/'] },
  js.configs.recommended,
  { files: ['**/*.{js,jsx}'], languageOptions: { globals: { ...globals.browser, ...globals.node }, parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } } }, rules: { 'no-console': 'off', 'no-unused-vars': 'off', eqeqeq: 'error', 'prefer-const': 'error' } },
  { files: ['src/utils/**/*.js', 'src/**/actions/**/*.js', 'src/**/hooks/**/*.js'], rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], curly: 'error', 'no-console': 'error' } },
];
