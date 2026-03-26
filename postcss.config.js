export default {
    plugins: {
        'postcss-preset-env': {
            stage: 2,
            features: {
                'nesting-rules': true,
                'custom-media-queries': true,
                'media-query-ranges': true,
            },
            browsers: 'defaults and fully supports es6-module',
        },
        autoprefixer: {},
    },
};
