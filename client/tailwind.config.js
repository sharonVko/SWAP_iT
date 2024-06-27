/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
		container: {
			center: true,
			screens: {
				sm: '640px',
				lg: '960px',
				xl: '1200px'
			}
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: '#000000',
			white: '#FFFFFF',
			gray: {
				DEFAULT: '#585E6A',
				50: '#CDD0D5',
				100: '#C2C5CC',
				200: '#ACB0B9',
				300: '#959BA7',
				400: '#7F8694',
				500: '#6B7280',
				600: '#585E6A',
				700: '#3F434B',
				800: '#25282C',
				900: '#0C0C0E',
				950: '#000000'
			},
			navy: {
				DEFAULT: "#1D5B79",
				50: "#71BADD",
				100: "#60B2D9",
				200: "#3FA2D1",
				300: "#2D8DBB",
				400: "#25749A",
				500: "#1D5B79",
				600: "#12394C",
				700: "#07171E",
				800: "#000000",
				900: "#000000",
				950: "#000000",
			},
			teal: {
				DEFAULT: "#468B97",
				50: "#B7D8DE",
				100: "#A9D0D7",
				200: "#8DC1CA",
				300: "#71B2BD",
				400: "#55A3B0",
				500: "#468B97",
				600: "#346871",
				700: "#22444A",
				800: "#112124",
				900: "#000000",
				950: "#000000",
			},
			green: {
				DEFAULT: "#219C90",
				50: "#8EE7DE",
				100: "#7DE3D9",
				200: "#5BDCD0",
				300: "#39D5C6",
				400: "#28BEAF",
				500: "#219C90",
				600: "#176E65",
				700: "#0D3F3B",
				800: "#041110",
				900: "#000000",
				950: "#000000",
			},
			red: {
				DEFAULT: "#EF6262",
				50: "#FFFFFF",
				100: "#FEF6F6",
				200: "#FAD1D1",
				300: "#F7ACAC",
				400: "#F38787",
				500: "#EF6262",
				600: "#EA2F2F",
				700: "#CC1515",
				800: "#991010",
				900: "#660A0A",
				950: "#4D0808",
			},
			orange: {
				DEFAULT: "#F3AA60",
				50: "#FFFFFF",
				100: "#FEFBF8",
				200: "#FCE7D2",
				300: "#F9D3AC",
				400: "#F6BE86",
				500: "#F3AA60",
				600: "#EF8E2C",
				700: "#D37210",
				800: "#9F560C",
				900: "#6B3A08",
				950: "#502C06",
			},
			peach: {
				DEFAULT: "#FFBE98",
				300: "#FFF1EA",
				400: "#FFD8C1",
				500: "#FFBE98",
				600: "#FF9B60",
				700: "#FF7728",
				800: "#EF5800",
			},
		},
		extend: {
			fontFamily: {
				'display': ['Merriweather'],
			},
		},
	},
  plugins: [],
};
