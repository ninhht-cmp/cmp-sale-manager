import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importX from 'eslint-plugin-import-x';
import security from 'eslint-plugin-security';
import regexp from 'eslint-plugin-regexp';
import reactESLint from '@eslint-react/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const baseConfig = {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      project: './tsconfig.eslint.json',
      tsconfigRootDir: __dirname,
      warnOnUnsupportedTypeScriptVersion: false,
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: 'error',
  },
  settings: {
    'import-x/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.eslint.json',
      },
      node: true,
    },
    'import-x/cache': {
      lifetime: 5 * 60, // 5 minutes cache
    },
    'import-x/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    react: {
      version: 'detect',
    },
    next: {
      rootDir: __dirname,
    },
  },
};

const pluginConfigs = [
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  regexp.configs['flat/recommended'],
  security.configs.recommended,
  reactESLint.configs['recommended-type-checked'],

  ...compat.extends(
    'plugin:@next/next/core-web-vitals',
    'plugin:@next/next/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:testing-library/react',
  ),
  ...compat.plugins('react-compiler'),
];

const eslintConfig = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {},
  },
  {
    files: [
      '**/app/**/page.{js,jsx,ts,tsx}',
      '**/app/**/layout.{js,jsx,ts,tsx}',
      '**/app/**/loading.{js,jsx,ts,tsx}',
      '**/app/**/error.{js,jsx,ts,tsx}',
      '**/app/**/not-found.{js,jsx,ts,tsx}',
      '**/app/**/global-error.{js,jsx,ts,tsx}',
      '**/app/**/route.{js,ts}',
      '**/app/**/default.{js,jsx,ts,tsx}',
      '**/app/**/template.{js,jsx,ts,tsx}',
      '**/pages/**/*.{js,jsx,ts,tsx}',
      '**/middleware.{js,ts}',
      'next.config.{js,ts}',
    ],
    rules: {
      'import-x/no-default-export': 'off',
      'import-x/prefer-default-export': 'error',
      '@eslint-react/no-missing-component-display-name': 'off',
    },
  },
];

const ignorePatterns = {
  ignores: [
    '.next/**',
    'out/**',
    'dist/**',
    'build/**',
    'coverage/**',
    'node_modules/**',
    'public/**',
    '*.min.js',
    '*.min.css',
    '*.map',
    '.vscode/**',
    '.idea/**',
    '.DS_Store',
    'Thumbs.db',
    '*.log',
    'logs/**',
    '.env*',
    'certificates/**',
    '*.pem',
    '*.key',
    '*.crt',
    '.cache/**',
    '.temp/**',
    '.tmp/**',
    '.DS_Store',
    '.DS_Store?',
    '._*',
    '.Spotlight-V100',
    '.Trashes',
    'ehthumbs.db',
    'Thumbs.db',
    'pnpm-lock.yaml',
    'yarn.lock',
    'package-lock.json',
    'storybook-static/**',
    'test-results/**',
    'playwright-report/**',
    'cypress/downloads/**',
    'cypress/screenshots/**',
    'cypress/videos/**',
  ],
};

export default [baseConfig, ...pluginConfigs, ...eslintConfig, ignorePatterns];
