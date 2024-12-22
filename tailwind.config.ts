import type { Config } from 'tailwindcss';
import DaisyUI from "daisyui"
import PrelineUI from "preline/plugin"

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'node_modules/preline/dist/*.js',
	],

	theme: {
		extend: {
			fontFamily: {
				"inter": ["Inter", "mono"],
				"lato": ["Lato", "mono"],
				"merri": ["Merriweather", "mono"]
			}
		},
		screens: {
			"desktop": "744px",
			"mobile": "416px",
		}
	},

	plugins: [
		DaisyUI,
		PrelineUI
	],
	safelist: [
		"border-red-500",
		"border-green-500",
	]
} satisfies Config;
