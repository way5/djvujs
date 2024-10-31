/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import forms from '@tailwindcss/forms';

export default {
    darkMode: "selector",
    mode: "jit",
    important: true,
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
        safelist: {
            pattern: /max-w-(sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)/,
            variants: ["sm", "md", "lg", "xl", "2xl"],
        },
    },
    theme: {
        boxShadow: {
            sm: "0  2px   3px    -1px   rgba(0, 0, 0, 0.1)",
            default: "0  3px   4px    -1px   rgba(0, 0, 0, 0.1),   0 1px  2px   -1px   rgba(0, 0, 0, 0.1)",
            md: "0  4px   6px    -1px   rgba(0, 0, 0, 0.1),   0 2px  4px   -2px   rgba(0, 0, 0, 0.1)",
            lg: "0  10px  15px   5px    rgba(0, 0, 0, 0.1),   0 8px  10px  10px   rgba(0, 0, 0, 0.1)",
            xl: "0  20px  25px   -5px   rgba(0, 0, 0, 0.1),   0 8px  10px  -6     rgba(0, 0, 0, 0.1)",
            "2xl": "0  25px  50px   -12px  rgba(0, 0, 0, 0.1)",
        },
        extend: {
            colors: {

            },
            fontFamily: {
                'serif': "'Times New Roman', Garamond, Times, serif"
            },
            fontSize: {
                h1: "4.21em",
                h2: "3.16em",
                h3: "2.37em",
                h4: "1.78em",
                h5: "1.33em",
                sm: "0.75em",
                xs: "0.56em",
            },
        },
    },
    plugins: [
        colors,
        forms,
        require('postcss-import'),
        require('postcss-nesting'),
        require('@tailwindcss/nesting'),
        require("tailwindcss-animated"),
        require("@tailwindcss/typography")
    ],
};
