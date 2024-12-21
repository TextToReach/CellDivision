import type { Config } from 'tailwindcss';
import DaisyUI from "daisyui"

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			
		},
		screens: {
			"desktop": "744px",
			"mobile": "390px"
		}
	},

	plugins: [
		DaisyUI
	]
} satisfies Config;
