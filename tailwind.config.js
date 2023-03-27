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
            padding: {
                px10: '10px',
            },
            gridTemplateRows: {
                featuresRows: '350px 100px 350px',
            },
            animation: {
                fadeUp: 'fadeUp 0.5s ease-in-out',
            },
            keyframes: {
                fadeUp: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(200%)',
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                    },
                },
            },
        },
    },
    plugins: [],
};
