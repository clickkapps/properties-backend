/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './emails/src/**/*.html',
    ],
    theme: {
        extend: {},
    },
    corePlugins: {
        preflight: false, // Disable Tailwind's CSS reset (for email compatibility)
    },
}