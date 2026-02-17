const prettier = require('eslint-plugin-prettier');
const unusedImports = require('eslint-plugin-unused-imports');
const eslintPlugin = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');

module.exports = [
    {
        ignores: ['**/*.js', 'node_modules/', 'dist/'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: parser,
            parserOptions: {
                ecmaVersion: 2024,
                sourceType: 'module',
            },
            globals: {
                Atomics: 'readonly',
                SharedArrayBuffer: 'readonly',
            },
        },
        plugins: {
            prettier,
            'unused-imports': unusedImports,
            '@typescript-eslint': eslintPlugin,
        },
        rules: {
            complexity: ['error', { max: 100 }],
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'no-duplicate-case': 'error',
            'no-duplicate-imports': 'error',
            'prettier/prettier': 'error',
            '@typescript-eslint/ban-types': [
                'off',
                {
                    types: {
                        String: false,
                        Boolean: false,
                        Number: false,
                        Symbol: false,
                        '{}': false,
                        Object: false,
                        object: false,
                        Function: false,
                    },
                    extendDefaults: true,
                },
            ],
        },
    },
];
