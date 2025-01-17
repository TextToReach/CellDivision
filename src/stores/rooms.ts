import { writable } from "svelte/store";

export const rooms = writable<number[]>([], () => {
	console.log('got a subscriber');
	return () => console.log('no more subscribers');
});
