/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                text: "#333333",
                background: "#e3e3e3",
                accent: "#8B8A8B",
            },
        },
    },
    plugins: [],
};
