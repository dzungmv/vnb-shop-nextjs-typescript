/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                colorPrimary: '#ff0050',
                colorPrimaryHover: '#ca0040',
                bgGray: 'rgba(22, 24, 35, 0.07)',
            },
            screens: {
                tablet: '600px',
                laptop: '1024px',
            },
        },
    },
    plugins: [],
};
