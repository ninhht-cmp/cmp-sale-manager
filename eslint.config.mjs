import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const baseConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.eslint.json',
      },
      node: true,
    },
    'import/cache': {
      lifetime: 5 * 60, // 5 minutes cache
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    react: {
      version: 'detect',
    },
    next: {
      rootDir: __dirname,
    },
  },
};

const testConfig = {
  files: ['__tests__/**/*.{ts,tsx}'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Disable no-explicit-any for test files
  },
};

const mainRulesConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    curly: ['error', 'all'],
    'import/no-cycle': ['error', { ignoreExternal: false, maxDepth: 3 }],
    'import/no-anonymous-default-export': 'off',
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/no-unused-prop-types': 0,
    'react/jsx-no-target-blank': 0,
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/no-danger': 0,
    '@typescript-eslint/return-await': 0,
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-restricted-globals': [
      'error',
      {
        name: 'isFinite',
        message:
          'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
      },
      {
        name: 'isNaN',
        message:
          'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
      },
      'addEventListener',
      'blur',
      'close',
      'closed',
      'confirm',
      'defaultStatus',
      'defaultstatus',
      'event',
      'external',
      'find',
      'focus',
      'frameElement',
      'frames',
      'history',
      'innerHeight',
      'innerWidth',
      'length',
      'location',
      'locationbar',
      'menubar',
      'moveBy',
      'moveTo',
      'name',
      'onblur',
      'onerror',
      'onfocus',
      'onload',
      'onresize',
      'onunload',
      'open',
      'opener',
      'opera',
      'origin',
      'outerHeight',
      'outerWidth',
      'pageXOffset',
      'pageYOffset',
      'parent',
      'print',
      'removeEventListener',
      'resizeBy',
      'resizeTo',
      'screen',
      'screenLeft',
      'screenTop',
      'screenX',
      'screenY',
      'scroll',
      'scrollbars',
      'scrollBy',
      'scrollTo',
      'scrollX',
      'scrollY',
      'self',
      'status',
      'statusbar',
      'stop',
      'toolbar',
      'top',
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'date-fns',
            importNames: ['isWeekend'],
            message: 'Please import from src/common instead.',
          },
          {
            name: 'next/link',
            message: 'Please import from src/common instead.',
          },
          {
            name: 'react-router-dom',
            importNames: ['Link'],
            message: 'Please import from src/common instead.',
          },
        ],
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};

const ignorePatterns = {
  ignores: [
    '.next/**',
    'out/**',
    'dist/**',
    'build/**',
    'coverage/**',
    'storybook-static/**',
    'node_modules/**',
    'public/**',
    '*.min.js',
    '*.min.css',
    '*.map',
    '.vscode/**',
    '.idea/**',
    '.DS_Store',
    '.DS_Store?',
    '._*',
    '.Spotlight-V100',
    '.Trashes',
    'ehthumbs.db',
    'Thumbs.db',
    '*.log',
    'logs/**',
    '.cache/**',
    '.temp/**',
    '.tmp/**',
    '.env*',
    'certificates/**',
    '*.pem',
    '*.key',
    '*.crt',
    'pnpm-lock.yaml',
    'yarn.lock',
    'package-lock.json',
    'test-results/**',
    'playwright-report/**',
    'cypress/downloads/**',
    'cypress/screenshots/**',
    'cypress/videos/**',
  ],
};

const config = [
  js.configs.recommended,

  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ),

  ...compat.plugins('prettier', 'unused-imports', 'react-hooks'),

  ignorePatterns,
  baseConfig,
  mainRulesConfig,
  testConfig,
];

export default config;
