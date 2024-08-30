const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
		"./node_modules/flowbite/**/*.js",
		flowbite.content(),
	],
  theme: {
		screens: {
			'xs': '380px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px'
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
			olive: {
				DEFAULT: '#7EB571',
				50: '#ECF4EA',
				100: '#DFEDDC',
				200: '#C7DFC1',
				300: '#AFD1A7',
				400: '#96C38C',
				500: '#7EB571',
				600: '#609C52',
				700: '#49783E',
				800: '#33532B',
				900: '#1C2E18',
				950: '#111B0E'
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
			lemon: {
				DEFAULT: "#FFFED3",
				400: "#FFFFFC",
				500: "#FFFED3",
				600: "#FFFD9B",
				700: "#FFFB63",
				800: "#FFFA2B",
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
			dropShadow: {
				'logo': '3px 3px 3px rgba(0, 0, 0, 0.75)',
			},
			zIndex: {
				'60': '60',
				'70': '70',
				'80': '80',
				'90': '90',
				'100': '100',
				'200': '200',
				'300': '300',
				'400': '400',
				'500': '500',
				'600': '600',
				'700': '700',
				'800': '800',
				'900': '900',
				'1000': '1000',
				'2000': '2000',
				'3000': '3000',
				'4000': '4000',
				'5000': '5000'
			}
		}
	},
	plugins: [
		require("flowbite/plugin")
	],
};
