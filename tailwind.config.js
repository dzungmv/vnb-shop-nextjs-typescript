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
                mobile: { max: '600px' },
                tablet: { max: '1023px' },
                laptop: {
                    min: '1024px',
                    max: '1200px',
                },
            },
            padding: {
                px10: '10px',
            },
            gridTemplateRows: {
                featuresRows: '350px 100px 350px',
            },
            animation: {
                fadeUp: 'fadeUp 0.3s ease-in-out',
                fadeInLeft:
                    'fadeInLeft 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
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
                fadeInLeft: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateX(-100%)',
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateX(0)',
                    },
                },
            },
        },
    },
    plugins: [],
};
