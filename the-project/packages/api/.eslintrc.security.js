module.exports = {
  extends: ['./.eslintrc.js', 'plugin:security/recommended', 'plugin:node/recommended'],
  plugins: ['security', 'node'],
  rules: {
    // Security-focused rules
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-fs-filename': 'warn',
    'security/detect-non-literal-regexp': 'warn',
    'security/detect-non-literal-require': 'error',
    'security/detect-possible-timing-attacks': 'warn',
    'security/detect-pseudoRandomBytes': 'error',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'warn',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-new-buffer': 'error',
    'security/detect-no-csrf-before-method-override': 'error',

    // Node.js security rules
    'node/no-deprecated-api': 'error',
    'node/no-exports-assign': 'error',
    'node/no-path-concat': 'error',
    'node/process-exit-as-throw': 'error',

    // Additional security-related rules
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-unescaped-entities': 'off', // Not applicable for backend

    // Environment variable security
    'no-process-env': 'off', // We use env validation instead

    // Database security
    'security/detect-sql-injection': 'error',

    // Authentication security
    'security/detect-bidi-characters': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      rules: {
        // Relax some security rules in tests
        'security/detect-non-literal-fs-filename': 'off',
        'security/detect-child-process': 'off',
      },
    },
    {
      files: ['scripts/**/*.ts', 'scripts/**/*.js'],
      rules: {
        // Scripts may need more flexibility
        'security/detect-child-process': 'warn',
        'security/detect-non-literal-fs-filename': 'warn',
      },
    },
  ],
  env: {
    node: true,
    es2022: true,
  },
  settings: {
    node: {
      allowModules: ['express', 'cors', 'helmet'],
      resolvePaths: ['./src'],
      tryExtensions: ['.js', '.ts', '.json'],
    },
  },
};
