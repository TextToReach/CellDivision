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
			}
		},
		screens: {
			"desktop": "744px",
			"mobile": "416px",
		},
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