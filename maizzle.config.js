module.exports = {
    build: {
        templates: {
            source: 'emails/src',
            destination: {
                path: 'build_local',
            },
        },
        tailwind: {
            config: './tailwind.config.js',
        },
        inlineCSS: true,
        removeUnusedCSS: true,
    },
    inlineCSS: {
        applyStyleTags: true,
        removeStyleTags: true,
    },
    css: {
        inline: true,
        minify: true,
    },
}
