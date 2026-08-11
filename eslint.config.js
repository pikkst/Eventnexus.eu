import pluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist/**/*',
      'dist-disabled/**/*',
      'dist-enabled/**/*',
      'node_modules/**/*',
      '.astro/**/*',
      'build/**/*',
      '**/*.min.js',
      'coverage/**/*',
    ],
  },
  ...pluginAstro.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
