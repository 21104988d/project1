import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import security from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';

export default tseslint.config([
  { ignores: ['dist', 'node_modules', 'build', 'cache', 'artifacts', 'typechain-types'] },

  // Base configuration for all TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.strict],
    plugins: {
      security,
      sonarjs,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',

      // General code quality rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',

      // Simplified import rules (remove sort-imports to reduce complexity)
      // 'sort-imports': ['error', {
      //   'ignoreCase': false,
      //   'ignoreDeclarationSort': true,
      //   'ignoreMemberSort': false,
      //   'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
      // }],

      // Basic security rules (only essential ones)
      'security/detect-object-injection': 'warn',
      'security/detect-unsafe-regex': 'error',

      // Basic sonarjs rules (only essential ones)
      'sonarjs/cognitive-complexity': ['warn', 20], // Increased threshold
      'sonarjs/no-duplicate-string': 'off', // Disable to reduce complexity
    },
  },

  // React-specific configuration
  {
    files: ['packages/frontend/**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // Smart contract specific configuration
  {
    files: ['packages/contracts/**/*.ts'],
    rules: {
      'no-console': 'off', // Allow console in deployment scripts
      '@typescript-eslint/no-non-null-assertion': 'off', // Common in contract interactions
      'security/detect-object-injection': 'off', // Common pattern in hardhat scripts
      '@typescript-eslint/no-unused-expressions': 'off', // Allow test expressions
    },
  },

  // Backend/API specific configuration
  {
    files: ['packages/{api,routing-engine}/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-console': 'off', // Allow console in server code
      'security/detect-object-injection': 'off', // Reduce severity for backend
    },
  },

  // Scripts and deployment configuration
  {
    files: ['scripts/**/*.ts'],
    rules: {
      'no-console': 'off', // Allow console in scripts
      '@typescript-eslint/no-unused-vars': 'off', // Allow unused vars in scripts
    },
  },

  // Test files configuration
  {
    files: ['**/*.{test,spec}.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Allow any in tests
      'no-console': 'off', // Allow console in tests
      'sonarjs/cognitive-complexity': 'off', // Allow complex tests
      '@typescript-eslint/no-unused-vars': 'off', // Allow unused vars in tests
    },
  },
]);
