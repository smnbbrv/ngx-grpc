import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsparser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      'arrow-parens': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'dot-notation': 'error',
      'import/order': 'off',
      indent: 'off',
      'max-len': [
        'error',
        {
          ignorePattern: '^import |^export | implements | extends ',
          code: 200,
        },
      ],
      'no-empty-function': 'off',
      'no-unused-expressions': 'error',
      'no-use-before-define': 'off',
      quotes: ['error', 'single'],
      semi: 'error',
      'id-blacklist': 'off',
      'id-denylist': 'off',
    },
  },
  {
    ignores: ['test/out/**', 'test/out-grpc-web/**', 'coverage/**'],
  },
];
