module.exports = {
    singleQuote: true,
    trailingComma: 'all',
    useTabs: false,
    semi: true,
    bracketSpacing: true,
    printWidth: 120,
    endOfLine: 'auto',
    overrides: [
        {
            files: ['**/*.css', '**/*.scss'],
            options: {
                singleQuote: false,
            },
        },
    ],
};
