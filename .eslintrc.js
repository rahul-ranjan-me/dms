module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'import'],
  rules: {
    'require-jsdoc': 0,
    'no-invalid-this': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'error',
    'import/named': 2,
    'import/default': 2,
    'import/export': 2,
    'import/order': [
      2,
      {
        groups: [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    "import/no-unresolved": {
      node: {
        paths: ["../node_modules"]
      }
    },
    "import/resolver": {
      "node": {
        "paths": ["/src/"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
};