/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    env: {
        browser: false,
        node: true,
        es2021: true
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    extends: [
        'eslint:recommended'
    ],
    ignorePatterns: [
        'dist/**/*',
        'node_modules/**/*',
        'src/models/auto'
    ],
    settings: {
        'import/resolver': {
            'node': {
                'extensions': [
                    '.js',
                    '.ts'
                ]
            }
        },
        'import/parsers': {
            '@typescript-eslint/parser': [
                '.ts'
            ]
        }
    },
    overrides: [
        {
            files: [
                '**/*.ts',
            ],
            extends: [
                'plugin:@typescript-eslint/recommended'
            ],
            parser: '@typescript-eslint/parser',
            plugins: [
                '@typescript-eslint'
            ],
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/no-empty-function': 'off',
                'no-console': 'warn',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        selector: 'default',
                        format: [
                            'camelCase'
                        ]
                    },
                    {
                        selector: 'variableLike',
                        format: [
                            'camelCase'
                        ]
                    },
                    {
                        selector: 'variable',
                        format: [
                            'camelCase'
                        ]
                    },
                    {
                        selector: 'variable',
                        format: null,
                        modifiers: [
                            'destructured'
                        ]
                    },
                    {
                        selector: 'classProperty',
                        format: [
                            'camelCase',
                            'UPPER_CASE',
                            'snake_case'
                        ],
                        leadingUnderscore: 'allowSingleOrDouble'
                    },
                    {
                        selector: 'parameter',
                        format: [
                            'camelCase'
                        ],
                        leadingUnderscore: 'allow'
                    },
                    {
                        selector: 'memberLike',
                        format: [
                            'camelCase'
                        ],
                        leadingUnderscore: 'allowSingleOrDouble'
                    },
                    {
                        selector: 'typeLike',
                        format: [
                            'PascalCase'
                        ]
                    },
                    {
                        selector: 'typeParameter',
                        format: [
                            'PascalCase'
                        ]
                    },
                    {
                        selector: 'interface',
                        format: [
                            'PascalCase'
                        ]
                    },
                    {
                        selector: 'enumMember',
                        format: [
                            'UPPER_CASE'
                        ]
                    },
                    {
                        selector: 'import',
                        format: null
                    }
                ]
            }
        }
    ],
    rules: {
        'no-unused-vars': 'off',
        'no-empty-function': 'off',
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
                maxBOF: 0,
                maxEOF: 0
            }
        ],
        curly: 'error',
        'brace-style': [
            'error',
            'stroustrup'
        ],
        eqeqeq: 'error',
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        'no-var': 'error',
        'eol-last': 'error',
        'dot-notation': 'error',
        'prefer-const': 'error'
    }
};
