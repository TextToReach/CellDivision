import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import DaisyUI from "daisyui";
import Unimportant from "tailwindcss-unimportant";
import typography from '@tailwindcss/typography'
import colors from "tailwindcss/colors"

export const screens = {
	"narrow": "390px",
	"desktop": "744px",
	"mobile": "416px",
	"wide": "1032px"
}

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				magnum: {
					'50': '#fff9ed',
					'100': '#fef2d6',
					'200': '#fce0ac',
					'300': '#f9c978',
					'400': '#f7b155',
					'500': '#f38d1c',
					'600': '#e47312',
					'700': '#bd5711',
					'800': '#964516',
					'900': '#793a15',
					'950': '#411c09'
				},
			},
			fontFamily: {
				"inter": ["Inter", "mono"],
				"lato": ["Lato", "mono"],
				"merri": ["Merriweather", "mono"],
				sans: [
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Oxygen',
					'Ubuntu',
					'Cantarell',
					'Fira Sans',
					'Droid Sans',
					'Helvetica Neue',
					'Arial',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol'
				],
				mono: [
					'ui-monospace',
					'SFMono-Regular',
					'SF Mono',
					'Menlo',
					'Consolas',
					'Liberation Mono',
					'monospace'
				]
			},
			spacing: {
				".1": "10%",
				".2": "20%",
				".3": "30%",
				".4": "40%",
				".5": "50%",
				".6": "60%",
				".7": "70%",
				".8": "80%",
				".9": "90%",
				"68": "17rem",
				"76": "19rem",
				"84": "21rem",
				"88": "22rem",
				"92": "23rem",
				"100": "25rem",
			}
		},
		screens,
	},

	daisyui: {
		themes: ["dark"]
	},

	typography: (theme: any) => ({
		DEFAULT: {
			css: {
				code: {
					position: 'relative',
					borderRadius: theme('borderRadius.md')
				}
			}
		}
	}),

	plugins: [
		typography,
		DaisyUI,
		Unimportant,
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.scrollbar-hidden': {
					/* IE and Edge */
					'-ms-overflow-style': 'none',

					/* Firefox */
					'scrollbar-width': 'none',

					/* Safari and Chrome */
					'&::-webkit-scrollbar': {
						display: 'none'
					}
				},
				".center": {
					"justify-content": "center",
					"align-items": "center"
				}
			}
			)
		}),
		plugin(function ({ addVariant, matchUtilities, theme }) {
			addVariant('hocus', ['&:hover', '&:focus'])
			// Square utility
			matchUtilities(
				{
					square: (value) => ({
						width: value,
						height: value
					})
				},
				{ values: theme('spacing') }
			)
		})
	],
	safelist: [
		"border-red-500",
		"border-green-500",
	],
	darkMode: "class"
} satisfies Config;