module.exports = {
 
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    'prettier', // Assicurati che "prettier" sia l'ultimo elemento nell'array extends
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
  ],
  rules: {
    // Aggiungi le tue regole ESLint personalizzate qui
    'prettier/prettier': process.env.CI === 'true' ? 'warn' : 'error',
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      rules: process.env.CI === 'true' ? {
        'no-console': 'warn',
        'no-debugger': 'warn',
        // Aggiungi altre regole che vuoi trattare come avvisi
      } : {}
    }
  ]
};
